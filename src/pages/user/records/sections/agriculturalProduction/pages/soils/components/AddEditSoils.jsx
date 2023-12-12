import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useState } from 'react';
// i18
import { useTranslation } from 'react-i18next';
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
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../../../../components/hook-form';
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import Iconify from '../../../../../../../../components/utils/Iconify';
import DatePickerMUI from '../../../../../../evapotranspiration/components/DatePickerMUI';
import GenericToolbar from '../../../../../../../../components/utils/GenericToolbar';
import AddEditLots from '../../../../farmInformation/pages/lots/components/AddEditLot';
// actions
import { handleCurrentLots } from '../../../../../../../../redux/slices/records';
import { addSoils, editSoils } from '../../../../../../../../redux/slices/actions/soilsActions';
import RecordsFileLayout from '../../../../../components/RecordsFileLayout';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditSoil({ onClose, open, edit, editInfo }) {
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
    year: Yup.date()
      .required(t('forms.errorRequired'))
      .typeError(t('forms.errorRequired'))
      .max(today, t('forms.errorNumber')),
    usage: Yup.string().required(t('forms.errorRequired')),
    lot: Yup.string().required(t('forms.errorRequired')),
    urls: Yup.array(),
    files: Yup.array()
  });
  const defaultValues = edit
    ? { ...editInfo, lot: editInfo.lot[0]?.id ,files: [], urls: editInfo.urls && editInfo.urls[0] !== "" ? editInfo.urls : []}
    : { year: '', usage: '', notes: '', lot: '',  urls:[], files: [] };
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
    setValue
  } = methods;
console.log(editInfo);
  const onSubmitAdd = async data => {
    if(!data.files.length) delete data['files'];
    const dataToPost = {
      ...data,
      userId: user.id,
      lot: lots.filter(l => l.id === data.lot),
      farmId: currentFarm.id,
      createdAt: today
    };
    dispatch(addSoils(dataToPost));
    reset();
    onClose();
  };
  const onSubmitEdit = async data => {
    if(!data.files.length) delete data['files'];
    if(!data.urls.length) data.urls = JSON.stringify([]);
    const dataToPost = {
      ...data,
      userId: user.id,
      lot: lots.filter(l => l.id === data.lot),
      farmId: currentFarm.id,
    };
    dispatch(editSoils({ data: dataToPost, soilsId: editInfo.id }));
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
          {edit ? t('titles.editSoilData') : t('titles.addSoilData')}
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
                  name="year"
                  render={({ field, formState }) => (
                    <DatePickerMUI
                      label={t('recordsCommon.year')}
                      format="YYYY"
                      views={['year']}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.year}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
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
                <RHFTextField variant="filled" name="usage" label={t('forms.usage')} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="notes" label={t('forms.notes')} multiline rows={3} />
              </Grid>

              <RecordsFileLayout edit={edit} editInfo={editInfo} t={t} setValue={setValue} />
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
          <LoadingButton variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)} >
            <SaveIcon /> {edit ? t('buttons.saveChanges') : t('buttons.save')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddEditSoil.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  editInfo: PropTypes.object,
};
