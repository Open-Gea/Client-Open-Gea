import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';

// components
import { FormProvider, RHFTextField, RHFSelect,RHFInputFile } from '../../components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserInsideCooperative } from '../../redux/slices/auth';
import { getValidationError } from '../../utils/getValidationError';

// Add user to cooperative 
import { addUserToCooperative } from '../../redux/slices/membersCooperativa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Countries
import { getCountriesList } from '../../utils/getCountries';

// ----------------------------------------------------------------------

export function RegisterUserForm({onClose}) {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { cooperative } = useSelector(s => s.authSlice);
  // Adding translation
  const { t } = useTranslation('register-data');

  // Required for loading countries list
  const [countries, setCountries] = useState(null);

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

  }, []);


  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(t('fieldsMessages.name')),
    lastname: Yup.string().required(t('fieldsMessages.lastName')),
    email: Yup.string().email(t('fieldsMessages.emailValid')).required(t('fieldsMessages.emailRequired')),
    password: Yup.string()
      .min(8, t('fieldsMessages.passwordValid1'))
      .matches(/\d+/, t('fieldsMessages.passwordValid2'))
      .matches(/[a-z]+/, t('fieldsMessages.passwordValid3'))
      .matches(/[A-Z]+/, t('fieldsMessages.passwordValid4'))
      .test(t('fieldsMessages.passwordValid5'), t('fieldsMessages.passwordValid6'), value => !/\s+/.test(value))
      .required(t('fieldsMessages.passwordValid7')),
    phone: Yup.string()
      .matches(/^[0-9]*$/, t('fieldsMessages.phoneValid'))
      .required(t('fieldsMessages.phoneRequired')),
    country: Yup.string().required(t('fieldsMessages.country')),
    username: Yup.string().required(t('fieldsMessages.userRequired')),
    confirmPassword: Yup.string() 
      .oneOf([Yup.ref('password'), null], t('validations.passwordsMustMatch')) 
      .required(t('validations.confirmPasswordRequired')),
  });

  const defaultValues = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    username: '',
    description: '',
    profile_picture: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = data => {


    // Check if profile_picture is a File object, if it is, process it as FormData
    let formData = new FormData();
    if (data.password === data.confirmPassword) {
      if (data.profile_picture instanceof FileList) {
        formData.append('profile_picture', data.profile_picture[0]);
      }
      // Append the rest of the data to formData
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'profile_picture') {
          formData.append(key, value);
        }
      });
      // Defining the terms and conditions as false, in order to let the user accept them.
      formData.append('acceptedTermsConditions',false);
  
      dispatch(
        registerUserInsideCooperative(formData)
      ).then(e => {
         if (e.error) {
          setError('afterSubmit', { type: e.error.code, message: getValidationError(e.error.code) });
          console.log(errors);
        } else { 
          const dataToPost = {
            id: cooperative.id,
            userId: e.payload.id
          };
          dispatch(addUserToCooperative(dataToPost));
          onClose();
        } 
      }); 
    }
    else {
      setError('confirmPassword', {
        type: 'manual',
        message: t('validations.passwordsMustMatch'),
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="name" label={t('fieldsPlaceHolders.name')} />
          <RHFTextField name="lastname" label={t('fieldsPlaceHolders.lastName')} />
        </Stack>

        <RHFTextField name="description" label={t('fieldsPlaceHolders.description')} multiline rows={3} variant="outlined" />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="username" label={t('fieldsPlaceHolders.userName')} />
          <RHFTextField name="phone" label={t('fieldsPlaceHolders.phoneNumber')}/>
        </Stack>
        <RHFSelect name="country" label={t('fieldsPlaceHolders.country')}>
                      <option></option>
                      {countries?.map(country => (
                        <option key={country?.id} value={country?.name}>
                          {country?.name} ({country?.code.toUpperCase()})
                        </option>
                      ))}
                    </RHFSelect>

        <RHFTextField name="email" label={t('fieldsPlaceHolders.email')} />

        <InputLabel htmlFor="profile_picture">{t('fieldsPlaceHolders.profilePicture')} </InputLabel>
       <RHFInputFile name="profile_picture" accept="image/*"  variant="outlined" />

        <RHFTextField
          name="password"
          label={t('fieldsPlaceHolders.password')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <VisibilityIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
            name="confirmPassword"
            label={t('labels.confirmPassword')}
            type={showConfirm ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirm(!showConfirm)}>
                    <VisibilityIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} >
          Registrar
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}


RegisterUserForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  farmInfo: PropTypes.object,
};
