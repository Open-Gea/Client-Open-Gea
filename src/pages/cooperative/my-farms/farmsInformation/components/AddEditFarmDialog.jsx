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
  TextField,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// react -redux
import { useDispatch, useSelector } from 'react-redux';
// Components
import Iconify from '../../../../../components/utils/Iconify';
import { IconButtonAnimate } from '../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField, RHFAutocomplete } from '../../../../../components/hook-form';
import AddFarmMap from './AddFarmMap';
import { LoadingButton } from '@mui/lab';
import { addFarm, editFarm } from '../../../../../redux/slices/farmsCooperativa';
import { useTranslation } from 'react-i18next';

// Countries
import { getCountriesList } from '../../../../../utils/getCountries';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditFarmDialog({ onClose, open, title, edit, farmInfo }) {
  const { t } = useTranslation('farms');
  const theme = useTheme();

  const dispatch = useDispatch();
  // Required for loading countries list
  const [countries, setCountries] = useState(null);

  const [certificateFile, setCertificateFile] = useState(farmInfo ? farmInfo.urls : '');
  const [certificateFileName, setCertificateFileName] = useState('');
  const [position, setPosition] = useState({ lat: farmInfo ? farmInfo.lat : '', lng: farmInfo ? farmInfo.lng : '' });
  const [currentPosition, setCurrentPosition] = useState({});

  // Adding for the Users
  const { usersCooperative } = useSelector(state => state.farmsCooperativaSlice);

  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('validations.requiredName'))
      .test('len', t('validations.length', { val: 4 }), val => val.length >= 4),
    phone: Yup.string()
      .required(t('validations.requiredPhone'))
      .min(7, t('validations.length', { val: 7 })),
    country: Yup.string().required(t('validations.requiredCountry')),
    userFarm: Yup.object().required(t('validations.ownerRequired')),
  });

  function handleFileUpload(event) {
    // Acceder al archivo seleccionado en el evento
    const file = event.target.files[0];
    // Guardar el archivo en el estado
    setCertificateFile(file);
    // Guardar el nombre del archivo en el estado
    setCertificateFileName(file.name);
  }

  const defaultValues = edit
    ? farmInfo
    : { name: '', phone: '', country: '', userFarm: null, lat: position.lat, lng: position.lng, urls: '' };

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
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
      userId: data.userFarm.id,
      name: data.name,
      owner: data.userFarm.displayName,
      telephone: data.phone,
      country: data.country,
      ubication: ubication,
      totalSurface: '46466',
      infrastructure: 'null',
      perimetralFence: 'null',
      urls: certificateFile,
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
      urls: certificateFile,
      userId: data.userFarm.id,
      name: data.name,
      owner: data.userFarm.displayName,
      telephone: data.phone,
      country: data.country,
      ubication: ubication,
      totalSurface: '46466',
      infrastructure: 'null',
      perimetralFence: 'null',
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
                <Grid container spacing={1.5}>
                  <Grid item xs={12}>
                    <RHFTextField name="name" label={t('inputs.name')} />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFTextField
                      name="phone"
                      label={t('inputs.phone')}
                      type="text"
                      inputProps={{ maxLength: 14, pattern: '\\(\\d{3}\\)\\d{3}-\\d{4}' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFSelect name="country" label={t('inputs.country')}>
                      <option></option>
                      {countries?.map(country => (
                        <option key={country?.id} value={country?.name}>
                          {country?.name} ({country?.code.toUpperCase()})
                        </option>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={12}>
                    <RHFAutocomplete
                      name="userFarm"
                      options={usersCooperative}
                      label={edit ? t('validations.chooseOwnerSecurity') : t('validations.chooseOwner')}
                      errorMessage="Please choose an Owner"
                      farmInfo={farmInfo}
                    ></RHFAutocomplete>
                  </Grid>
                  <Grid item xs={6} justifyContent="center">
                    <TextField name="lat" label={t('inputs.latitude')} value={position.lat} type="string" disabled />
                  </Grid>
                  <Grid item xs={6} justifyContent="center">
                    <TextField name="lng" label={t('inputs.longitude')} value={position.lng} type="string" disabled />
                  </Grid>
                </Grid>
                {!!errors.noLatLng && <Alert severity="error">{errors.noLatLng.message}</Alert>}
              </FormProvider>
              <DialogContentText id="alert-dialog-slide-description">{t('certificateDescription')}</DialogContentText>
              <Grid item xs={12}>
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
