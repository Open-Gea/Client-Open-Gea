import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Typography,
  styled,
  Link
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
// react- router
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
import { useDispatch } from 'react-redux';
import { fetchAdminUser } from '../../redux/slices/auth';
import { getValidationError } from '../../utils/getValidationError';

// ----------------------------------------------------------------------
const StyledTypography = styled(Typography)({
  marginBottom: '1px',
  fontWeight: 500,
  fontSize: '14px',
});

export default function LoginFormAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Introduce un email válido').required('Email es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = data => {

    // Llamar a la función fetchUser
    dispatch(fetchAdminUser({ email: data.email, password: data.password })).then(e => {
      if (e.error) {
        reset();
        setError('afterSubmit', { type: e.error.code, message: getValidationError(e.error.code) });
      } else navigate('/dashboard/admin');
    });

  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <br />
          <StyledTypography variant="subtitle1">Email:</StyledTypography>
          <RHFTextField name="email" />
          <StyledTypography variant="subtitle1">Contraseña:</StyledTypography>
          <RHFTextField
            name="password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <VisibilityIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
          <RHFCheckbox name="remember" label="Recordar" />
          <Typography variant="body2" sx={{ mb: -1 }}>
               {'  '}
              <Typography  variant="subtitle2" color={'#0b8f1b'}>
              Contacte a soporte si tiene problemas para ingresar
              </Typography>
          </Typography>
        </Stack>

        <LoadingButton fullWidth size="large" onClick={handleSubmit(onSubmit)} variant="contained" loading={isSubmitting}>
          Ingresar
        </LoadingButton>
      </FormProvider>

    </>
  );
}
