import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, Slide, TextField, Stack } from '@mui/material';
import { useTheme } from '@emotion/react';
import { IconButtonAnimate } from '../../../../components/animate/IconButtonAnimate';
import Iconify from '../../../../components/utils/Iconify';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateCalc } from '../../../../redux/slices/evotranspiracion';
import DatePickerMUI from './DatePickerMUI';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DateStyleInput = forwardRef(({ value, onClick, label }, ref) => (
  <TextField ref={ref} variant="filled" label={label} autoComplete="off" value={value} onClick={onClick} />
));
DateStyleInput.propTypes = {
  value: PropTypes.any,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default function EVTCalculateDialog({ onClose, open, farmId }) {
  const { t } = useTranslation('water-footprint');
  const { t: tCommon } = useTranslation('common');
  // Agregado para saber el lenguaje actual en la aplicación
  const { i18n } = useTranslation();

  const theme = useTheme();
  const dispatch = useDispatch();
  const { products, farms } = useSelector(s => s.evotranspiracionSlice);
  const today = new Date();
  const FormSchema = Yup.object().shape({
    prodId: Yup.string().required(t('validations.noProductSelected')),
    fechaSiembra: Yup.date()
      .typeError(t('validations.noDateSelected'))
      .required(tCommon('defaultSelectValue')) // sowDate
      .max(today, t('validations.maxSowDate')),

    fechaCocecha: Yup.date() // harvestDate
      .typeError(t('validations.noDateSelected'))
      .required(tCommon('defaultSelectValue'))
      .when('fechaSiembra', (fechaSiembra, schema) => {
        if (dayjs(fechaSiembra).isValid()) return schema.min(fechaSiembra, t('validations.maxHarvestDate'));
      })
      .max(today, t('validations.maxSowDate')),
    toneladas: Yup.number()
      .required(t('validations.requiredTonsAmount'))
      .typeError(t('validations.invalidNumber'))
      .min(0, t('validations.greaterThanZero')),
    hectareas: Yup.number()
      .required(t('validations.requiredHectaresAmount'))
      .typeError(t('validations.invalidNumber'))
      .min(0, t('validations.greaterThanZero')),
  });

  const defaultValues = {
    prodId: '',
    fechaSiembra: '',
    fechaCocecha: '',
    toneladas: '',
    hectareas: '',
  };
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

  const sortedProducts = Object.entries(products)
    .sort(([keyA, valueA], [keyB, valueB]) => collator.compare(valueA.name, valueB.name))
    .map(([key, value]) => ({ id: value.id, name: value.name }));

  const onSubmit = async data => {
    const farm = farms.find(el => el.id === farmId);
    await dispatch(
      updateCalc({
        id: farmId,
        calc: {
          detail: { ...data, fechaSiembra: new Date(data.fechaSiembra).getTime(), fechaCocecha: new Date(data.fechaCocecha).getTime() },
          fecha: Date.now(),
          prodId: data.prodId,
        },
        georef: { lat: farm.lat, lon: farm.lng },
        product: products.find(prod => prod.id === data.prodId),
      })
    );
    reset();
    onClose();
  };

  return (
    <div>
      <Dialog
        maxWidth="md"
        open={Boolean(open)}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {t('footprintCalcModal.title')}
          <IconButtonAnimate onClick={onClose}>
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid item xs={12} sm={4} sx={{ width: '100%' }}>
                <RHFSelect variant="filled" name="prodId" label={t('footprintCalcModal.productLabel')}>
                  <option></option>
                  {sortedProducts.map(product => (
                    <option key={product.id} value={product.id}>
                      {/* <p>Los productos son importados del API en Español, entonces solo se traducen si el lenguaje actual no es Español/p> */}
                      {i18n.language === 'es' ? product.name : t('footprintProducts.' + product.name)}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  name="fechaSiembra"
                  render={({ field, formState }) => (
                    <DatePickerMUI
                      label={t('footprintCalcModal.sowDateLabel')}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.fechaSiembra}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  name="fechaCocecha"
                  render={({ field, formState }) => (
                    <DatePickerMUI
                      label={t('footprintCalcModal.harvestLabel')}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.fechaCocecha}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField type="number" variant="filled" name="toneladas" label={t('footprintCalcModal.tonsLabel')} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField type="number" variant="filled" name="hectareas" label={t('footprintCalcModal.hectaresLabel')} />
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <LoadingButton loading={isSubmitting} variant="contained" type="submit">
                    {t('footprintCalcModal.submitButton')}
                  </LoadingButton>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      reset();
                      onClose();
                    }}
                  >
                    {tCommon('cancel')}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
EVTCalculateDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  farmId: PropTypes.any,
};
