import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';

// components
import { FormProvider, RHFTextField, RHFSelect,RHFInputFile } from '../../components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerCooperative } from '../../redux/slices/auth';
import { useNavigate } from 'react-router';
import { getValidationError } from '../../utils/getValidationError';
import TermsAndConditionsCheckbox from './TermsAndConditionsCheckbox';

// translation module
import { useTranslation } from 'react-i18next';

// countries
import { getCountriesList } from '../../utils/getCountries';

// ----------------------------------------------------------------------

export function RegisterCooperativeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [termsConditionsAccepted, setTermsConditionsAccepted] = useState(false);

  // Required for loading countries list
  const [countries, setCountries] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  // Added for translations
  const { t } = useTranslation('register-login');

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
    name: Yup.string().required(t('validations.nameRequired')),
    country: Yup.string().required(t('validations.countryRequired')),
    email: Yup.string().email(t('validations.validEmail')).required(t('validations.emailRequired')),
    password: Yup.string()
    .min(8, t('validations.shortPass'))
    .matches(/\d+/, t('validations.noNumberPass'))
    .matches(/[a-z]+/, t('validations.noLowerCase'))
    .matches(/[A-Z]+/, t('validations.noUpperCase'))
    .test(t('validations.noSpace'), t('validations.noSpace'), value => !/\s+/.test(value))
    .required(t('validations.passRequired')),
    confirmPassword: Yup.string() 
      .oneOf([Yup.ref('password'), null], t('validations.passwordsMustMatch')) 
      .required(t('validations.confirmPasswordRequired')),
  });

  const defaultValues = {
    name: '',
    country: '',
    profile_picture: '',
    description: '',
    email:'',
    password: '',
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
    if (data.password === data.confirmPassword) {
      // Las contraseñas coinciden, procede a enviar los datos
      let formData = new FormData();
      if (data.profile_picture instanceof FileList) {
        formData.append('profile_picture', data.profile_picture[0]);
      }
      // Append the rest of the data to formData
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'profile_picture') {
          formData.append(key, value);
        }
      });
  
      dispatch(
        registerCooperative(formData)
      ).then(e => {
        if (e.error) {
          setError('afterSubmit', { type: e.error.code, message: getValidationError(e.error.code) });
          console.log(errors);
        } else {
          setDialogOpen(true);
        }/* navigate('/login'); */
      });
      
    } else {
      setError('confirmPassword', {
        type: 'manual',
        message: t('validations.passwordsMustMatch'),
      });
    }
    // Check if profile_picture is a File object, if it is, process it as FormData
    
  };

  return (
  <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label={t('labels.orgaName')} />
          </Stack>

          <RHFTextField name="description" label={t('labels.description')}  multiline rows={3} variant="outlined" />
          <RHFSelect name="country" label={t('labels.country')} >
                        <option></option>
                        {countries?.map(country => (
                          <option key={country?.id} value={country?.name}>
                            {country?.name} ({country?.code.toUpperCase()})
                          </option>
                        ))}
                      </RHFSelect>

          <RHFTextField name="email" label={t('labels.email')}  />

          <InputLabel htmlFor="profile_picture">{t('labels.photo')} </InputLabel>
          <RHFInputFile name="profile_picture" accept="image/*"  variant="outlined" />

          <RHFTextField
            name="password"
            label={t('labels.pass')} 
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

          <TermsAndConditionsCheckbox
            termsConditionsAccepted={termsConditionsAccepted}
            setTermsConditionsAccepted={setTermsConditionsAccepted}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} disabled={!termsConditionsAccepted}>
          {t('registerButton')}
          </LoadingButton>
        </Stack>
      </FormProvider>
      <Dialog open={dialogOpen} onClose={()=> {setDialogOpen(false); navigate('/login');}}>
      <div>
        <DialogTitle>Verifica tu correo electrónico</DialogTitle>
        <DialogContent>
          <p>
            Hemos enviado un enlace de verificación a tu dirección de correo electrónico. Por favor, verifica tu correo electrónico haciendo clic en el enlace para completar el proceso de registro.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setDialogOpen(false); navigate('/login');}} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  </>
  );
}
