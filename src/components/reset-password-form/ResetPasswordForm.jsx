import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState, useEffect} from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack,IconButton,InputAdornment,Alert} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation } from 'react-router-dom';
import { changePassword } from '../../redux/slices/auth';
// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
    .min(8, 'Contraseña muy corta, al menos 8 caracteres')
    .matches(/\d+/, 'La contraseña debe contener al menos un número')
    .matches(/[a-z]+/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/[A-Z]+/, 'La contraseña debe contener al menos una letra mayúscula')
    .test('La contraseña tiene espacios', 'La contraseña no debe incluir espacios', value => !/\s+/.test(value))
    .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('La confirmación de contraseña es requerida')
});


  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { password: '',confirmPassword:''  },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = data => {
    dispatch(changePassword({ password: data.password, token: token })).then(e => {
      if (e.error) {
        setError('afterSubmit', { type: e.error.code, message: 'No pudimos restaurar tu contraseña. Token expirado' });
      } else  setShowSuccessMessage(true);;
    });
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
        {showSuccessMessage && (
        <Alert severity="success">
          ¡Contraseña actualizada correctamente! Redirigiendo...
        </Alert>
        
        )}
        </Stack>
        <br />
      <Stack spacing={4}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      <RHFTextField
          name="password"
          label="Contraseña"
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
          label="Confirma Contraseña"
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

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Reiniciar Contraseña
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
