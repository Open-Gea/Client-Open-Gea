import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useState } from 'react';
// MUI
import { Alert, Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
// react-hook-form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import Iconify from '../../../../../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import DatePickerMUI from '../../../../../../evapotranspiration/components/DatePickerMUI';
import { addPerformance, editPerformance } from '../../../../../../../../redux/slices/actions/performanceActions';

import { useTranslation } from 'react-i18next';
import AddEditLots from '../../../../farmInformation/pages/lots/components/AddEditLot';
import GenericToolbar from '../../../../../../../../components/utils/GenericToolbar';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditPerfomance({ onClose, open, edit, editInfo }) {
  const theme = useTheme();

  const { t } = useTranslation('records');

  const dispatch = useDispatch();
  const { farms, currentFarm, error, isLoading } = useSelector(s => s.recordsSlice);
  const { user } = useSelector(s => s.authSlice);

  const [openLotDialog, setOpenLotDialog] = useState(false);
  const [farmId, setFarmId] = useState(currentFarm.id !== undefined ? currentFarm.id : '');
  const [lots, setLots] = useState(currentFarm.lots); 

  const today = new Date();
  
  const FormSchema = Yup.object().shape({
    lot: Yup.string().required(t('forms.errorRequired')),
    estimatedYield:  Yup.number(t('forms.errorNumber'))
    .required(t('forms.errorRequired'))
    .typeError(t('forms.errorNumber')),
    year: Yup.date()
      .required(t('forms.errorRequired'))
      .typeError(t('forms.errorRequired'))
      .max(today, t('forms.maxToday')),
    harvestDate: Yup.date()
      .required(t('forms.errorRequired'))
      .typeError(t('forms.errorRequired'))
      .max(today, t('forms.maxToday')),
    cultivatedSpecies: Yup.string().required(t('forms.errorRequired')),
    finalYield: Yup.number(t('forms.errorNumber'))
    .required(t('forms.errorRequired'))
    .typeError(t('forms.errorNumber')),
    productDestiny: Yup.string().required(t('forms.errorRequired')),
  });

  const defaultValues = edit
    ? { ...editInfo, lot: editInfo.lot[0]?.id }
    : { estimatedYield: '', year: '', harvestDate: '', cultivatedSpecies: '', finalYield: '', productDestiny: '', lot: '' };
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
      year: new Date(data.year).getFullYear(),
      userId: user.id,
      lot: lots.filter(l => l.id === data.lot),
      farmId: currentFarm.id,
      createdAt: today
    };
    dispatch(addPerformance(dataToPost));
    reset();
    onClose();
  };
  const onSubmitEdit = async data => {
    const dataToPost = {
      ...data,
      year: new Date(data.year).getFullYear(),
      userId: user.id,
      lot: lots.filter(l => l.id === data.lot),
      farmId: currentFarm.id,
    };
    dispatch(editPerformance({ data: dataToPost, performanceId: editInfo.id }));
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
          {edit ? t('titles.editPerfo') : t('titles.addPerfo')}
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
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled"  name="estimatedYield" type="number" label={t('forms.estimateYield')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="year"
                  render={({ field, formState }) => (
                    <DatePickerMUI
                      label={t('recordsCommon.year')}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.year}
                      views={['year']}
                      format="YYYY"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="harvestDate"
                  render={({ field, formState }) => (
                    <DatePickerMUI
                      label={t('forms.harvestDate')}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.harvestDate}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="cultivatedSpecies" label={t('forms.cultivatedSpecies')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" type="number" name="finalYield" label={t('forms.finalYield')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="productDestiny" label={t('forms.productDestiny')} />
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
AddEditPerfomance.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lotId: PropTypes.string,
  farmInfo: PropTypes.object,
};
