import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import LoginFormAdmin from '../../components/loginFormAdmin/LoginFormAdmin';
import { Link as RouterLink } from 'react-router-dom';
// images
import orquideaImg from '../../assets/mainviewImg/orquidea.png';
import newLogo from '../../assets/new_logo_yvy1.png';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
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

export default function LoginPageAdmin() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Admin Login | YvY </title>
      </Helmet>

      <StyledRoot>
        <Box component={RouterLink} to="/" sx={{ px: 2.5, py: 2, position: 'fixed', objectFit: 'cover' }}>
          <img height="100px" src={newLogo} alt="ivy-logo" />
        </Box>

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hola Admin, te damos la bienvenida! 
            </Typography>
            <center> <Box component="img" src={orquideaImg} alt="login" maxHeight={380} maxWidth={400} /> </center>
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              YvY
            </Typography>

            <br/>
            <Typography variant="body2" sx={{ mb: 2 }}>
              ¿Deseas volver al ingreso de usuario y organización? {'  '}
              <Link component={RouterLink} to="/login" variant="subtitle2">
                Volver
              </Link>
            </Typography>

            <LoginFormAdmin />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
