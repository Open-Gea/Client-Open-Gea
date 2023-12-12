import PropTypes from 'prop-types';
import * as Yup from 'yup';
import axios from 'axios';
import { forwardRef, useState, useEffect } from 'react';
// MUI
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Typography,
  Checkbox
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import DatePickerMUI from './../../evapotranspiration/components/DatePickerMUI';
// react-hook-form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import Iconify from '../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField, RHFMultiCheckbox} from '../../../../components/hook-form';
import AddFarmMap from './AddFarmMap';
import { LoadingButton } from '@mui/lab';
import { addFarm, editFarm } from '../../../../redux/slices/farms';
import { useTranslation } from 'react-i18next';

// Countries
import { getCountriesList } from '../../../../utils/getCountries';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 

export default function AddEditFarmDialog({ onClose, open, title, edit, farmInfo }) {
  const { t, i18n } = useTranslation('farms');
  const theme = useTheme();

  const dispatch = useDispatch();
  // Required for loading countries list
  const [countries, setCountries] = useState(null);

  const { user } = useSelector(s => s.authSlice);

  const [certificateFile, setCertificateFile] = useState(farmInfo ? farmInfo.urls : '');
  const [certificateFileName, setCertificateFileName] = useState('');
  const [position, setPosition] = useState({ lat: farmInfo ? farmInfo.lat : '', lng: farmInfo ? farmInfo.lng : '' });
  const [currentPosition, setCurrentPosition] = useState({});


  const today = new Date();

 

  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('validations.requiredName'))
      .test('len', t('validations.length', { val: 4 }), val => val.length >= 4),
    phone: Yup.string()
      .required(t('validations.requiredPhone'))
      .min(7, t('validations.length', { val: 7 })),
    country: Yup.string().required(t('validations.requiredCountry')),
    totalSurface: Yup.number().typeError('Este campo debe ser de tipo numérico'),
    owner: Yup.string().required('Escriba el nombre del propietario por favor'),
    start: Yup.date()
      .max(today, 'La fecha debe ser anterior a la fecha actual'),
    perimetralFence: Yup.string(),
    hidricRes: Yup.array().transform(function (o, obj) {
      return o.filter(o => o);
    }),
  });

  function handleFileUpload(event) {
    // Acceder al archivo seleccionado en el evento
    const file = event.target.files[0];
    // Guardar el archivo en el estado
    setCertificateFile(file);
    // Guardar el nombre del archivo en el estado
    setCertificateFileName(file.name);
  }

  const waterSourcesLabels = [
    { value: 'LAGO', label: 'Lago' },
    { value: 'LAGUNA', label: 'Laguna' },
    { value: 'RIO', label: 'Río' },
    { value: 'POZO', label: 'Pozo' },
    {value: 'OTRO', label: 'Otro'}
  ]; 

  const defaultValues = edit ? {...farmInfo, start: new Date(parseInt(farmInfo.start)).toLocaleDateString(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    }), hidricRes: farmInfo.hidricRes || []} : { 
    name: '', owner: user.displayName, phone: '', country: user.country, lat: position.lat, lng: position.lng, urls: '',
    totalSurface : 0, start: '', perimetralFence:'',  hidricRes: []
    };
  
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = methods;


  const onSubmitAdd = async data => {
    const ubication = {};
    if (position) {
      ubication.lat = position.lat;
      ubication.lng = position.lng;
    } else {
      ubication.lat = currentPosition.lat;
      ubication.lng = currentPosition.lng;
    }
    const dataToPost = {
      userId: user.id,
      name: data.name,
      owner: user.displayName,
      telephone: data.phone,
      country: data.country,
      ubication: ubication,
      urls: certificateFile,
      infrastructure: data.infrastructure,
      perimetralFence: data.perimetralFence,
      totalSurface: data.totalSurface,
      start: new Date(data.start).getTime(),
      hidricRes: data.hidricRes || []
    };
    if (!position.lat || !position.lng) {
      setError('noLatLng', {
        message: t('validations.noLocationPermission'),
      });
      return;
    }
    dispatch(addFarm(dataToPost));
    reset();

    onClose();
  };
  const onSubmitEdit = async data => {
    const ubication = {};
    if (position) {
      ubication.lat = position.lat;
      ubication.lng = position.lng;
    } else {
      ubication.lat = currentPosition.lat;
      ubication.lng = currentPosition.lng;
    }

    const dataToPost = {
      userId: user.id,
      name: data.name,
      owner: user.displayName,
      telephone: data.phone,
      country: data.country,
      ubication: ubication,
      urls: certificateFile,
      infrastructure: data.infrastructure,
      perimetralFence: data.perimetralFence,
      totalSurface: data.totalSurface,
      start: new Date(data.start).getTime(),
      hidricRes: data.hidricRes || []
    };


    dispatch(editFarm({ data: dataToPost, id: farmInfo.id }));
    reset();
    onClose();
  };
  const onSubmit = edit ? onSubmitEdit : onSubmitAdd;

  useEffect(() => {
    // Load countries from datatbase
    const fetchCountries = async () => {
      try {
        const response = await getCountriesList(); 
        return response;
      } catch (error) {
        console.error(t('validations.errorData'), error);
      }
    };
    // Setting the countries fetched
    fetchCountries()
    .then((resolvedCountries) => {
      setCountries(resolvedCountries);
    })
    .catch((error) => {
      // Handle any errors here.
      console.error('Error fetching countries:', error);
    });

    if (farmInfo) {
      if (farmInfo.urls) setCertificateFileName(farmInfo.urls.filename);
    }
  }, [edit]);

  return (
    <div>
      <Dialog
        maxWidth="lg"
        fullWidth
        open={Boolean(open)}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {title}
          <IconButtonAnimate onClick={onClose}>
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                <Grid container spacing={1.5  }>
                  <Grid item xs={6}>
                    <RHFTextField name="name" label={t('inputs.name')} />
                  </Grid>
                  <Grid item xs={6}>
                    <RHFTextField
                      name="phone"
                      label={t('inputs.phone')}
                      type="text"
                      inputProps={{ maxLength: 14, pattern: '\\(\\d{3}\\)\\d{3}-\\d{4}' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <RHFSelect name="country" label={t('inputs.country')}>
                      <option></option>
                      {countries?.map(country => (
                        <option key={country?.id} value={country?.name}>
                          {country?.name} ({country?.code.toUpperCase()})
                        </option>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={3}>
                  <RHFTextField
                      name="totalSurface"
                      label={t('inputs.surface')}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={6}>
                  <RHFTextField name="owner" label={t('inputs.owner')} />  
                  </Grid>
                  <Grid  item xs={6}>
                    <Controller
                      control={control}
                      name="start"
                      render={({ field, formState }) => (
                        <DatePickerMUI
                          label={'Inicio de la propiedad'}
                          value={field.value}
                          onChange={field.onChange}
                          error={formState.errors.start}
                          variant={'outlined'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <RHFTextField name="perimetralFence" label="Tipo de cerco perimetral" />
                  </Grid>
                  <Grid item xs={12}>
                  <Typography>Recursos Hídricos</Typography>
                    <RHFMultiCheckbox variant="filled" name="hidricRes" options={waterSourcesLabels} />
                  </Grid>
                </Grid>
                {!!errors.noLatLng && <Alert severity="error">{errors.noLatLng.message}</Alert>}
              </FormProvider>
              <Grid item xs={12}>
                <DialogContentText padding={1} item id="alert-dialog-slide-description">{t('certificateDescription')}</DialogContentText>
                    <Button fullWidth variant="outlined" component="label">
                      <AttachFileIcon />
                      {t('inputs.saveCertificate')}
                      <input type="file" accept=".pdf,.jpg,.png" name="urls" style={{ display: 'none' }} onChange={handleFileUpload} />
                    </Button>
                    <span>{certificateFileName}</span>
                  
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <AddFarmMap
                position={position}
                setPosition={setPosition}
                openDialog={Boolean(open)}
                setCurrentPosition={setCurrentPosition}
                edit={edit}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
            <SaveIcon /> {edit ? t('inputs.saveEditFarm') : t('inputs.saveNewFarm')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddEditFarmDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  farmInfo: PropTypes.object,
};
