import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useState } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
// react-hook-form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import Iconify from '../../../../../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../../../../components/hook-form';
import DateTimpePickerMUI from '../../../../../../../../components/utils/DateTimePickerMUI';
import {  addLabors, editLabors } from '../../../../../../../../redux/slices/actions/laborsActions';
import GenericToolbar from '../../../../../../../../components/utils/GenericToolbar';
import { handleCurrentLots } from '../../../../../../../../redux/slices/records';
import { useTranslation } from 'react-i18next';
import AddEditLots from '../../../../farmInformation/pages/lots/components/AddEditLot';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditLabors({ onClose, open, edit, editInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation('records');

  const { farms, currentFarm, error, isLoading } = useSelector(s => s.recordsSlice);
  const { user } = useSelector(s => s.authSlice);

  const [openLotDialog, setOpenLotDialog] = useState(false);
  const [farmId, setFarmId] = useState(currentFarm.id !== undefined ? currentFarm.id : '');
  const [lots, setLots] = useState(currentFarm.lots);

  const today = new Date();
  const FormSchema = Yup.object().shape({
    dateOfLabor: Yup.date()
      .required()
      .typeError(t('forms.errorRequired'))
      .max(today, t('forms.maxToday')),
    crop: Yup.string().required(t('forms.errorRequired')),
    labor: Yup.string().required(t('forms.errorRequired')),
    lot: Yup.string().required(t('forms.errorRequired')),
    responsibleName: Yup.string().required(t('forms.errorRequired')),
  });
  const defaultValues = edit
    ? { ...editInfo, lot: editInfo.lot[0]?.id }
    : { dateOfLabor: '', crop: '', lot: '', responsibleName: '', labor: '', notes: '' };
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = methods;

  const onSubmitAdd = async data => {
    const dataToPost = {
      ...data,
      lot: lots.filter(l => l.id === data.lot),
      userId: user.id,
      farmId: currentFarm.id,
      createdAt: today
    };

    dispatch(addLabors(dataToPost));
    reset();
    onClose();
  };
  const onSubmitEdit = async data => {
    const dataToPost = {
      ...data,
      userId: user.id,
      lot: lots.filter(l => l.id === data.lot),
      farmId: currentFarm.id,
    };
    dispatch(editLabors({ data: dataToPost, laborsId: editInfo.id }));
    reset();
    onClose();
  };
  const onSubmit = edit ? onSubmitEdit : onSubmitAdd;

  const handleChange = event => {
    const value = event.target.value;
    setFarmId(value);
    if (value) {
      dispatch(handleCurrentLots(value));
    }
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={Boolean(open)}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {edit ? t('titles.editLabor') : t('titles.addLabor')}
          <IconButtonAnimate onClick={onClose}>
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="dateOfLabor"
                  render={({ field, formState }) => (
                    <DateTimpePickerMUI
                      label={t('forms.dateTime')}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.dateOfLabor}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <RHFSelect name="lot" label={t('forms.lot')} variant="filled">
                  <option></option>
                  {lots.map(el => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="crop" label={t('forms.crop')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="labor" label={t('forms.labor')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="responsibleName" label={t('forms.person')} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="notes" label={t('forms.notes')} multiline rows={3} />
              </Grid>
              <Grid item xs={12}>
                {lots.length ? (
                  <Alert sx={{ mb: 2 }} severity="info">
                    {t('forms.warningLot')}
                  </Alert>
                ) : (
                  <Alert sx={{ mb: 2 }} severity="error">
                    {t('forms.errorNoLot')}
                  </Alert>
                )}
                <GenericToolbar
                  breadcrumbs={false}
                  menuElements={farms}
                  handleClickOpen={() => setOpenLotDialog(true)}
                  handleChange={handleChange}
                  idValue={farmId}
                  error={!!error}
                  isLoading={isLoading}
                  labels={{ inputLabel: t('recordsCommon.farm'), buttonLabel: t('buttons.addLot'), bcTitle: t('recordsCommon.lots') }}
                  t={t}
                />
                <AddEditLots
                  open={openLotDialog}
                  onClose={() => setOpenLotDialog(false)}
                  edit={false}
                  title={t('farmsRegisterInputs.addLot')}
                  t={t}
                />
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
            <SaveIcon /> {edit ? t('buttons.saveChanges') : t('buttons.save')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddEditLabors.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  editInfo: PropTypes.object,
};
