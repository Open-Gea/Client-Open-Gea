import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useState } from 'react';
import { useTheme } from '@emotion/react';
// MUI
import { Alert, Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
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
import DatePickerMUI from '../../../../../../evapotranspiration/components/DatePickerMUI';
// actions
import { addSowing, editSowing } from '../../../../../../../../redux/slices/actions/sowingActions';
import { useTranslation } from 'react-i18next';
import { handleCurrentLots } from '../../../../../../../../redux/slices/records';
import GenericToolbar from '../../../../../../../../components/utils/GenericToolbar';
import AddEditLots from '../../../../farmInformation/pages/lots/components/AddEditLot';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditSowing({ onClose, open, edit, editInfo }) {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { farms, currentFarm, error, isLoading } = useSelector(s => s.recordsSlice);
  const { user } = useSelector(s => s.authSlice);

  const [openLotDialog, setOpenLotDialog] = useState(false);
  const [farmId, setFarmId] = useState(currentFarm.id !== undefined ? currentFarm.id : '');
  const [lots, setLots] = useState(currentFarm.lots); 

  const { t } = useTranslation('records');

  const today = new Date();
  const FormSchema = Yup.object().shape({
    species: Yup.string().required(t('forms.errorRequired')),
    varietySown: Yup.string().required(t('forms.errorRequired')),
    dateOfSowing: Yup.date()
      .required(t('forms.errorRequired'))
      .typeError(t('forms.errorRequired'))
      .max(today, t('forms.maxToday')),
    sowingDensity: Yup.number(t('forms.errorNumber'))
    .required(t('forms.errorRequired'))
    .typeError(t('forms.errorNumber')),

    seedsInKg: Yup.number(t('forms.errorNumber'))
    .required(t('forms.errorRequired'))
    .typeError(t('forms.errorNumber')),
    sowingOrigin: Yup.string().required(t('forms.errorRequired')),
    predecessorCrop: Yup.string().required(t('forms.errorRequired')),
    lot: Yup.string().required(t('forms.errorRequired')),
  });

  const defaultValues = edit
    ? { ...editInfo , lot: editInfo.lot[0]?.id}
    : { species: '', varietySown: '', dateOfSowing: '', sowingDensity: '', seedsInKg: '', sowingOrigin: '', predecessorCrop: '' };

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
      userId: user.id,
      lot: lots.filter(l => l.id === data.lot),
      farmId: currentFarm.id,
      createdAt: today
    };
    dispatch(addSowing(dataToPost));
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
    dispatch(editSowing({ data: dataToPost, sowingId: editInfo.id }));
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
          {edit ? t('titles.editSowing') : t('titles.addSowing')}
          <IconButtonAnimate onClick={onClose}>
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={3}>
                <RHFSelect name="lot" label={t('recordsCommon.lot')} variant="filled">
                  <option></option>
                  {lots.map(el => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="species" label={t('forms.seedSpecie')} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="varietySown" label={t('forms.seedVariety')} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  control={control}
                  name="dateOfSowing"
                  render={({ field, formState }) => (
                    <DatePickerMUI
                      label={t('forms.date')}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.dateOfSowing}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="sowingDensity" type="number" label={t('forms.sowingDensity')}/>
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="seedsInKg" type="number" label={t('forms.seedsInKg')} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="sowingOrigin" label={t('forms.sowingOrigin')} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="predecessorCrop" label={t('forms.predecessorCrop')} />
              </Grid>
              <Grid item xs={12}>
                {lots.length ? (
                  <Alert sx={{ mb: 2 }} severity="info">
                    {t('forms.warningLot')}
                  </Alert>
                ) : (
                  <Alert sx={{ mb: 2 }} severity="error">
                    {t('helpers.chooseLot')}
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
AddEditSowing.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  editInfo: PropTypes.object,
};
