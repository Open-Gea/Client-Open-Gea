import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import ResetPasswordForm from '../../components/reset-password-form/ResetPasswordForm';
import { Link as RouterLink } from 'react-router-dom';
// images
import newLogo from '../../assets/new_logo_yvy1.png';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function PasswordRecovery() {
  return (
    <>
      <Helmet>
        <title> Recuperar Contraseña </title>
      </Helmet>

      <StyledRoot>
        <Box component={RouterLink} to="/" sx={{ px: 2.5, py: 2, position: 'fixed', objectFit: 'cover' }}>
          <img height="100px" src={newLogo} alt="ivy-logo" />
        </Box>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom align='center'>
              Reinicia tu contraseña
            </Typography>
            <ResetPasswordForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
