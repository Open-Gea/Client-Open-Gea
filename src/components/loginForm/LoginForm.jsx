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
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Checkbox,
  TextField,
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
import { fetchCooperative, fetchUser, recoveryPassword } from '../../redux/slices/auth';
import { getValidationError } from '../../utils/getValidationError';
import { useTranslation } from 'react-i18next';
import { DialogPassAndEmal } from './DialogPassAndEmail';

// ----------------------------------------------------------------------
const StyledTypography = styled(Typography)({
  marginBottom: '1px',
  fontWeight: 500,
  fontSize: '14px',
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {t} = useTranslation('register-login')

  const [showPassword, setShowPassword] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [isCooperative, setIsCooperative] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');

  const handleOpen = (type) => {
    setType(type)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(t('validations.validEmail')).required(t('validations.emailRequired')),
    password: Yup.string().required(t('validations.passRequired')),
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
    if (isCooperative) {
      // Llamar a la función fetchCooperative
      dispatch(fetchCooperative({ email: data.email, password: data.password })).then(e => {
        if (e.error) {
          reset();
          setError('afterSubmit', { type: e.error.code, message: getValidationError(e.error.code) });
        } else navigate('/dashboard/main');
      });
    } else {
      // Llamar a la función fetchUser
      dispatch(fetchUser({ email: data.email, password: data.password })).then(e => {
        if (e.error) {
          reset();
          setError('afterSubmit', { type: e.error.code, message: getValidationError(e.error.code) });
        } else navigate('/dashboard/main');
      });
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>{showEmailSent && <Alert severity="success">Email enviado. Revisa tu casilla de mensajes.</Alert>}</Stack>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
            <FormControlLabel
              control={<Checkbox checked={isCooperative} onChange={e => setIsCooperative(e.target.checked)} color="success" />}
              label={
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {t('logInOrga')}
                </Typography>
              }
            />
          </Stack>

          <StyledTypography variant="subtitle1">{t('labels.email')}</StyledTypography>
          <RHFTextField name="email" />
          <StyledTypography variant="subtitle1">{t('labels.pass')}</StyledTypography>
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
          {/* !-- Old position of Access Admin User */}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
          <Button onClick={() => handleOpen('PASSWORD_FORGOT')}>{t('passForgot')}</Button>
          <Button onClick={() => handleOpen('EMAIL_VERIF')}>{t('verifEmail')}</Button>
        </Stack>
        <LoadingButton fullWidth size="large" onClick={handleSubmit(onSubmit)} variant="contained" loading={isSubmitting}>
          {t('logInButton')}
        </LoadingButton>

        {/* !-- New section to Access Admin User */}
        <br />
        <br />
        <Typography variant="body2" sx={{ mb: -1 }}>
              {t('adminAccess1')} {'  '}
              <Link component={RouterLink} to="/loginAdmin" variant="subtitle2">
                {t('adminAccess2')}
              </Link>
        </Typography>
        
      </FormProvider>

      <DialogPassAndEmal open={open} onClose={handleClose} type={type}/>
    </>
  );
}
