import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
  Grid,
  Table,
  TableHead,
  Slide,
  TextField,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { IconButtonAnimate } from '../../../../components/animate/IconButtonAnimate';
import Iconify from '../../../../components/utils/Iconify';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateCalc } from '../../../../redux/slices/huellaCarbono';
import { LoadingButton } from '@mui/lab';
import { getFactorsCarbon } from '../utils/getFarmsCarbon';

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
  const { t } = useTranslation('carbon-footprint');
  const { t: tCommon } = useTranslation('common');
  // Agregado para saber el lenguaje actual en la aplicación
  const { i18n } = useTranslation();

  const dispatch = useDispatch();
  const { farms } = useSelector(s => s.huellaCarbonoSlice);
  const [emissions, setEmissions] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openRates, setOpenRates] = useState(false);
  const [openFertilizante, setOpenFertilizante] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [modalData, setModalData] = useState(null); // Datos para el modal
  const [filteredFactors, setFilteredFactors] = useState([]);
  const [porcentajeRequired, setPorcentajeRequired] = useState(true);
  const [unitConsume, setUnitConsume] = useState('');

  const [porcentaje, setPorcentaje] = useState(''); // Inicializa porcentaje con un valor predeterminado
  const [tasaAplicacion, setTasaAplicacion] = useState('');

  const FormSchema = Yup.object().shape({
    factoriaId: Yup.string().required(t('validations.requiredFactor')),
    year: Yup.string().required(t('validations.requiredYear')),
    consumo: Yup.number()
      .required(t('validations.consumptionRequired'))
      .typeError(t('validations.invalidNumber'))
      .min(0, t('validations.greaterThanZero')),
  });
  useEffect(() => {
    const fetchData = async () => {
      if (farmId && farms && selectedYear) {
        const getCategorias = await getFactorsCarbon(farmId, farms, selectedYear);
        setCategorias(getCategorias.categorias.sort());
        setEmissions(getCategorias.factores);
      }
    };

    fetchData();
  }, [farmId, farms, selectedYear]);

  const defaultValues = {
    consumo: '',
    categoryId: '',
    factoriaId: '',
    year: '',
  };

  const handleCategoryChange = event => {
    const category = event.target.value;
    setOpenRates(false);
    setOpenFertilizante(false);
    setPorcentajeRequired(true);
    setPorcentaje('');
    setUnitConsume('');
    setTasaAplicacion('');
    setSelectedCategory(category);
    if (category == 'Residuo sólido') {
      setOpenRates(true);
    }

    if (category == 'Fertilizante Sintetico') {
      setOpenFertilizante(true);
    }
    if (category == 'Fertilizante Orgánico') {
      setOpenFertilizante(true);
      setPorcentajeRequired(false);
    }

    // Filtrar los productos según la categoría seleccionada
    const filtered = emissions.filter(emission => emission.category === category);
    setFilteredFactors(filtered);
  };

  const handleSelectedFactor = event => {
    setPorcentaje('');
    setUnitConsume('');
    setTasaAplicacion('');
    const factorSelected = event.target.value;
    const selectedFactorObj = filteredFactors.find(factor => factor.id === factorSelected);
    setUnitConsume(selectedFactorObj.unit);

    // Manejar las unidades traidas en español que deben ser traducidas: Litros, Personas/Año y Cabezas/Año
    if (i18n.language === 'en') {
      if (selectedFactorObj.unit === 'Litros' || selectedFactorObj.unit === 'Personas/Año' || selectedFactorObj.unit === 'Cabezas/Año') {
        setUnitConsume(t('inputs.consumptionUnits.' + selectedFactorObj.unit));
      } else {
        setUnitConsume(selectedFactorObj.unit);
      }
    } else {
      setUnitConsume(selectedFactorObj.unit);
    }
  };
  const handleYearChange = event => {
    const year = event.target.value;
    setSelectedYear(year);
  };

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const yearOptions = [
    '2020',
    '2021',
    '2022',
    // Agregar más años según sea necesario
  ];

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
    watch,
  } = methods;

  const onSubmit = async data => {
    const selectedFactorObj = filteredFactors.find(factor => factor.id === data.factoriaId);

    const result = await dispatch(
      updateCalc({
        farmId: farmId,
        calc: {
          consumo: data.consumo,
          año: data.year,
          factor: selectedFactorObj,
          porcentaje: porcentaje,
          aplication_rate: tasaAplicacion,
          optionalData: data,
        },
      })
    );

    const resultData = result.payload.result.toFixed(2) + ' Kg CO2eq';
    setSelectedCategory('');
    setOpenRates(false);
    setOpenFertilizante(false);
    setPorcentajeRequired(true);
    reset();
    setModalData(resultData);
    setIsModalOpen(true);
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
          {t('inputs.footprintCalc')}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid item xs={12} sm={4} sx={{ width: '100%' }}>
                <Controller
                  control={control}
                  name="year"
                  render={({ field }) => (
                    <RHFSelect
                      control={control}
                      variant="filled"
                      label={t('inputs.yearLabel')}
                      name={field.name}
                      onChange={event => {
                        field.onChange(event);
                        handleYearChange(event);
                      }}
                    >
                      <option value=""></option>
                      {yearOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </RHFSelect>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ width: '100%' }}>
                {watch('year') && (
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                      <RHFSelect
                        control={control}
                        variant="filled"
                        name={field.name}
                        label={t('inputs.categoryLabel')}
                        value={field.value}
                        onChange={event => {
                          field.onChange(event);
                          handleCategoryChange(event);
                        }}
                      >
                        <option></option>
                        {categorias.map(categoria => (
                          <option key={categoria} value={categoria}>
                            {/* <p>Las categorias son importadas del API en Español, entonces solo se traducen si el lenguaje actual no es Español/p> */}
                            {i18n.language === 'es' ? categoria : t('inputs.categoryOptions.' + categoria)}
                          </option>
                        ))}
                      </RHFSelect>
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={10} sm={4}>
                {selectedCategory && (
                  <Controller
                    control={control}
                    name="factoriaId"
                    render={({ field }) => (
                      <RHFSelect
                        variant="filled"
                        name={field.name}
                        label={t('inputs.factorLabel')}
                        value={field.value}
                        onChange={event => {
                          field.onChange(event);
                          handleSelectedFactor(event);
                        }}
                      >
                        <option></option>
                        {filteredFactors.map(factor => (
                          <option key={factor.id} value={factor.id}>
                            {/* <p>Los factores son importados del API en Español, entonces solo se traducen si el lenguaje actual no es Español/p> */}
                            {i18n.language === 'es' ? factor.name : t('inputs.emissionFactors.' + factor.name)}
                          </option>
                        ))}
                      </RHFSelect>
                    )}
                  />
                )}
              </Grid>
              <Grid container spacing={2} sx={{ display: 'contents', justifyContent: 'center' }}>
                <Grid item xs={12} sm={6} md={4}>
                  {watch('factoriaId') && (
                    // An escape function is passed for displaying '/' values, if this function isn't passed, the value will be escaped to '&#x2F;' (default behavior to prevent XSS attacks)
                    // This is safer than just setting the 'escapeValue' to false.
                    // '&#x2F;' = /
                    <RHFTextField
                      control={control}
                      type="number"
                      variant="filled"
                      name="consumo"
                      label={t('inputs.consumptionLabel', {
                        unit: unitConsume,
                        interpolation: { escape: label => label.replaceAll('&#x2F;', '/') },
                      })}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {watch('factoriaId') && openRates && (
                    <RHFTextField
                      control={control}
                      required={false}
                      type="number"
                      variant="filled"
                      name="nitrogen_rate"
                      label={t('inputs.nitrogenRateLabel')}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {watch('factoriaId') && openRates && (
                    <RHFTextField
                      control={control}
                      required={false}
                      type="number"
                      variant="filled"
                      name="wet_rate"
                      label={t('inputs.waterRateLabel')}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {watch('factoriaId') && openFertilizante && (
                    <RHFTextField
                      control={control}
                      value={porcentaje}
                      onChange={e => setPorcentaje(e.target.value)}
                      required={!!porcentajeRequired}
                      type="number"
                      variant="filled"
                      name="porcentaje"
                      label={t('inputs.percentageLabel')}
                    />
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  {watch('factoriaId') && openFertilizante && (
                    <RHFTextField
                      control={control}
                      value={tasaAplicacion}
                      onChange={e => setTasaAplicacion(e.target.value)}
                      required={false}
                      type="number"
                      variant="filled"
                      name="aplication_rate"
                      label={t('inputs.applyingRateLabel')}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <LoadingButton loading={isSubmitting} variant="contained" type="submit">
                      {t('inputs.submitCalc')}
                    </LoadingButton>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        reset();
                        setSelectedCategory('');
                        setOpenRates(false);
                        setOpenFertilizante(false);
                        setPorcentajeRequired(true);
                        onClose();
                      }}
                    >
                      {tCommon('cancel')}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>{t('dialogs.calcResultTitle')}</DialogTitle>
        <DialogContent>{modalData && <p align="center"> {modalData}</p>}</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>{tCommon('close')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
EVTCalculateDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  farmId: PropTypes.any,
};
