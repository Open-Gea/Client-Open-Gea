import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import {
  Card,
  Stack,
  Alert,
  Box,
  Container,
  Typography,
  Avatar,
  Collapse,
  DialogContentText
} from '@mui/material';



import { FormProvider, RHFTextField, RHFSelect, RHFInputFile } from '../../../components/hook-form';

import { useTheme } from '@emotion/react';
// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';

// react -redux
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCooperative, fetchUserData } from '../../../redux/slices/auth';

import Page from '../../../components/utils/Page';
import ChangeProfilePicture from './components/ChangeProfilePicture';

import { useNavigate } from 'react-router';
import { el } from 'date-fns/locale';

import { getValidationError } from '../../../utils/getValidationError';
import { getCooperative } from './utils/getCooperative';

// Translation module
import { useTranslation } from 'react-i18next';

// Countries
import { getCountriesList } from '../../../utils/getCountries';

export default function CooperativeProfile() {

  const dispatch = useDispatch();
  const [profilePictureDataURL, setProfilePictureDataURL] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [cooperativeData, setCooperativeData] = useState(null);

  const [openDialogProfile, setOpenDialogProfile] = useState(false);
  const [openDialogMedia, setOpenDialogMedia] = useState(false);

  const { cooperative } = useSelector(s => s.authSlice);

  // Added for translations
  const { t } = useTranslation('user-profile');

  // Required for loading countries list
  const [countries, setCountries] = useState(null);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(t('validations.nameRequired')),
    email: Yup.string().email(t('validations.validEmail')).required(t('validations.emailRequired')),
  });


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

    const fetchCooperative = async () => {
      try {
        const response = await getCooperative(cooperative.id); // Reemplaza 'URL' con la URL correcta para obtener los datos del usuario
        const data =  response.data
        setCooperativeData(data);
      } catch (error) {
        console.error(t('validations.errorData'), error);
      }
    };

    fetchCooperative();
  }, []);


  const defaultValues = {
    name: cooperativeData?.name || '',
    email: cooperativeData?.email || '',
    country: cooperativeData?.country || '',
    description: cooperativeData?.description || '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;


  const onSubmit = async (data) => {

    // Create a FormData object and append all the required fields
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('country', data.country);
    formData.append('description', data.description);

    if (cooperative?.profilePicture) {
      const buffer = new Uint8Array(cooperative?.profilePicture.data).buffer;
      const blob = bufferToBlob(buffer);
      const imageFile = blobToFile(blob, 'profile_picture.png');
      formData.append('profile_picture', imageFile);
    }

    await dispatch(UpdateCooperative({ cooperativeId: cooperative.id, formData })).then(e => {
      if (e.error) {
        setError('afterSubmit', { type: e.error.code, message: getValidationError(e.error.code) });
      } else {
        setShowSuccessAlert(true);
      }
    });


  };

  const bufferToBlob = (buffer, mimeType = 'image/png') => {
    const byteArray = new Uint8Array(buffer);
    return new Blob([byteArray], { type: mimeType });
  };

  const blobToFile = (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type });
  };


  useEffect(() => {
    if (cooperative?.profilePicture) {

      const uint8Array = new Uint8Array(cooperative?.profilePicture.data);
      const base64Flag = "data:image/png;base64,";
      const imageStr = arrayBufferToBase64(uint8Array.buffer);
      setProfilePictureDataURL(base64Flag + imageStr);
    }
  }, [cooperative?.profilePicture]);

  useEffect(() => {
    if (cooperativeData) {
      methods.reset({
        name: cooperativeData.name || '',
        email: cooperativeData.email || '',
        country: cooperativeData.country || '',
        description: cooperativeData.description || '',

      });
    }
  }, [cooperativeData, methods]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const bufferToDataURL = (buffer) => {
    const byteArray = new Uint8Array(buffer);
    const blob = new Blob([byteArray], { type: "image/jpeg" });
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleCloseDialogProfile = () => {
    setOpenDialogProfile(false);
  };

  const handleCloseDialogMedia = () => {
    setOpenDialogMedia(false);
  };

  return (
    <Page title={t('titleCooperative')}>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('titleCooperative')}
        </Typography>
      </Box>
      <Card>
        <Container>
          <br />
          <br />
          {showSuccessAlert && (
            <Collapse in={showSuccessAlert}>
              <Alert
                severity="success"
                onClose={() => setShowSuccessAlert(false)}
              >
                {t('validations.profileUpdated')}
              </Alert>
            </Collapse>
          )}

          {!!errors.afterSubmit && <Alert severity="error">{t('validations.generalError')}</Alert>}


          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <br />
            <br />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Avatar
                alt={t('titlePhoto')}
                src={profilePictureDataURL}
                sx={{ width: 100, height: 100 }}
                onClick={e => setOpenDialogProfile(true)}
              />

            </Stack>
            <br />
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <RHFTextField name="name" label={t('labels.name')} defaultValue={defaultValues.name} />
              </Stack>
              <RHFTextField name="description" label={t('labels.description')} multiline rows={3} variant="outlined" />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <RHFSelect name="country" label={t('labels.country')}>
                  {countries?.map(country => (
                    <option key={country?.id} value={country?.name}>
                      {country?.name} ({country?.code.toUpperCase()})
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField name="email" label={t('labels.email')} />
              </Stack>
              <DialogContentText id="alert-dialog-slide-description"> {t('labels.helpProfile')} </DialogContentText>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <LoadingButton fullWidth size="medium" type="submit" variant="contained" >
                  {t('buttons.update')}
                </LoadingButton>
              </Stack>

            </Stack>

          </FormProvider>
          <ChangeProfilePicture open={openDialogProfile} onClose={handleCloseDialogProfile} profilePictureDataURL={profilePictureDataURL} />

        </Container>

      </Card>

    </Page>
  );

}