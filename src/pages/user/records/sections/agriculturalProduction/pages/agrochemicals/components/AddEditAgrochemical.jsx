import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useState, useEffect } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
// react-hook-form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import DatePickerMUI from '../../../../../../evapotranspiration/components/DatePickerMUI';
import Iconify from '../../../../../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../../../../components/hook-form';
import { addAgrochemical, editAgrochemical } from '../../../../../../../../redux/slices/actions/agrochemicalActions';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const unitsOptions = [
    { id: 'LTS', label: 'Lts' },
    { id: 'TON', label: 'Ton' },
    { id: 'M3', label: 'Mts3' },
    { id: 'D3', label: 'Dmts3' },
    { id: 'CM3', label: 'Cmts3' },
  ];

export default function AddEditAgrochemical({ onClose, open, edit, editInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { t } = useTranslation('records');

  const { user } = useSelector(s => s.authSlice);
  const { currentFarm } = useSelector(s => s.recordsSlice);

  const today = new Date();

  const FormSchema = Yup.object().shape({
    purchaseDate: Yup.date()
    .required(t('forms.errorRequired'))
    .typeError(t('forms.errorRequired'))
    .max(today, t('forms.maxToday')),
    brand: Yup.string().required(t('forms.errorRequired')),
    volume: Yup.number().required(t('forms.errorNumber')),
    unit: Yup.string().required(t('forms.errorRequired')),
    activeIngredient: Yup.string().required(t('forms.errorRequired')),
    expirationDate: Yup.date()
    .required(t('forms.errorRequired'))
    .typeError(t('forms.errorRequired'))
    .min(today, t('forms.minToday')),
  });

  const defaultValues = edit ? { ...editInfo } : { purchaseDate: today, brand: '', volume: '', unit: '', activeIngredient: '', expirationDate: '' };
  const methods = useForm({
      resolver: yupResolver(FormSchema),
      defaultValues,
    });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = methods;

  const onSubmitAdd = async data => {
    const dataToPost = {
      ...data,
      userId: user.id,
      farmId: currentFarm.id,
      createdAt: today
    };
    dispatch(addAgrochemical(dataToPost));
    reset();
    onClose();
  };

  const onSubmitEdit = async data => {
    const dataToPost = {
      ...data,
      userId: user.id,
      farmId: currentFarm.id
    };
    dispatch(editAgrochemical({ data: dataToPost, agrochemicalId: editInfo.id }));
    reset();
    onClose();
  };


  const onSubmit = edit ? onSubmitEdit : onSubmitAdd;

  
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
          {edit ? t('titles.editAgrochemical') : t('titles.addAgrochemical')}
          <IconButtonAnimate
            onClick={() => {
              onClose();
              reset();
            }}
          >
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            <Grid container spacing={1.5}>
                <Grid item xs={12} sm={3}>
                    <Controller
                    control={control}
                    name="purchaseDate"
                    render={({ field, formState }) => (
                        <DatePickerMUI
                        label={t('forms.purchaseDate')}
                        value={field.value}
                        onChange={field.onChange}
                        error={formState.errors.purchaseDate}
                        />
                    )}
                    />
                </Grid>
              <Grid item xs={12} sm={4}>
                <RHFTextField variant="filled" name="brand" label={t('recordsCommon.brand')} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFTextField variant="filled" name="activeIngredient" label={t('forms.activeIngr')} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="volume" label={t('forms.volume')} />
              </Grid>
              <Grid item xs={12} sm={2}>
                <RHFSelect variant="filled" name="unit" label={t('forms.unit')}>
                    <option></option>
                    {unitsOptions.map(el => (
                        <option key={el.id} value={el.id}>
                        {el.label}
                        </option>
                    ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={3}>
                    <Controller
                    control={control}
                    name="expirationDate"
                    render={({ field, formState }) => (
                        <DatePickerMUI
                        label={t('forms.expiration')}
                        value={field.value}
                        onChange={field.onChange}
                        error={formState.errors.expirationDate}
                        />
                    )}
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
AddEditAgrochemical.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lotId: PropTypes.string,
  editInfo: PropTypes.object,
};

