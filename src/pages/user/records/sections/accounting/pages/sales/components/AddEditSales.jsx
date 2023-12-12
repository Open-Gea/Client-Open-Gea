import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography } from '@mui/material';
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
import DatePickerMUI from '../../../../../../evapotranspiration/components/DatePickerMUI';
import { IconButtonAnimate } from '../../../../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../../../../components/hook-form';
import { addSales, editSales } from '../../../../../../../../redux/slices/actions/salesActions';

import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const coinOptions = [
  { id: 'USD', label: 'u$d' },
  { id: 'ARS', label: '$Ar' },
];

const unitsOptions = [
  { id: 'LTS', label: 'Lts' },
  { id: 'TON', label: 'Ton' },
  { id: 'M3', label: 'Mts3' },
  { id: 'D3', label: 'Dmts3' },
  { id: 'CM3', label: 'Cmts3' },
];

export default function AddEditSales({ onClose, open, edit, editInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user } = useSelector(s => s.authSlice);
  const { currentFarm } = useSelector(s => s.recordsSlice);

  const { t } = useTranslation('records')

  const today = new Date();
  const FormSchema = Yup.object().shape({
    saleDate: Yup.date()
    .required(t('forms.errorRequired'))
    .max(today,t('forms.maxToday')),
    revenue: Yup.number().required(t('forms.errorNumber')).typeError(t('forms.errorNumber')),
    coin: Yup.string().required(t('forms.errorRequired')),
    productSold: Yup.string().required(t('forms.errorRequired')),
    weightSold: Yup.number().required(t('forms.errorNumber')).typeError(t('forms.errorNumber')),
    unitSold: Yup.string().required(t('forms.errorRequired')),
    buyerName: Yup.string().required(t('forms.errorRequired')),
    buyerCountry: Yup.string().required(t('forms.errorRequired')),
  });
  const defaultValues = edit ? { ...editInfo } : { saleDate: '', revenue: '', coin: '', productSold: '', weightSold: '', buyerName: '', buyerCountry: ''  };
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
    dispatch(addSales(dataToPost));
    reset();
    onClose();
  };
  const onSubmitEdit = async data => {
    const dataToPost = {
      ...data,
      userId: user.id,
      farmId: currentFarm.id
    };

    dispatch(editSales({ data: dataToPost, saleId: editInfo.id }));
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
          {edit ? t('titles.editSale') : t('titles.addSale')}
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
                  name="saleDate"
                  render={({ field, formState }) => (
                      <DatePickerMUI
                      label={t('forms.saleDate')}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.purchaseDate}
                      />
                  )}
                  />
              </Grid>
              <Grid item xs={12} sm={5}>
                <RHFTextField variant="filled" name="buyerName" label={t('forms.buyer')} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFTextField variant="filled" name="buyerCountry" label={t('forms.buyerCountry')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="productSold" label={t('forms.productSold')} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="weightSold" label={t('forms.weightSold')} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFSelect variant="filled" name="unitSold" label={t('forms.unit')}>
                    <option></option>
                    {unitsOptions.map(el => (
                        <option key={el.id} value={el.id}>
                        {el.label}
                        </option>
                    ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={2}>
                <RHFSelect variant="filled" name="coin" label={t('forms.coin')}>
                    <option></option>
                    {coinOptions.map(el => (
                        <option key={el.id} value={el.id}>
                        {el.label}
                        </option>
                    ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFTextField variant="filled" name="revenue" label={t('forms.revenue')} />
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
AddEditSales.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  editInfo: PropTypes.object,
};
