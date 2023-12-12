import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import LoginForm from '../../components/loginForm/LoginForm';
import { Link as RouterLink } from 'react-router-dom';
// images
import girasolImg from '../../assets/mainviewImg/girasol.png';
import newLogo from '../../assets/new_logo_yvy1.png';
import LanguagePopover from '../../layouts/dashboard/header/LanguagePopover';
import { useTranslation } from 'react-i18next';
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
  // minHeight: '70vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  '& > *': {
    marginBottom: theme.spacing(3), // Espacio vertical uniforme entre elementos
  },
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const {t} = useTranslation('register-login');

  return (
    <>
      <Helmet>
        <title> {t('login')} | yvy </title>
      </Helmet>

      <StyledRoot>
      <Box  to="/" sx={{
          display: 'flex',
          justifyContent: 'space-between', // Esto coloca los elementos en las esquinas opuestas
          px: 2.5,
          py: 2,
          position: 'absolute',
          width: '100%',
        }}>
          <Box component={RouterLink} to="/">
            <img height={mdUp ? "100px" : "60px"} src={newLogo} alt="ivy-logo" />
          </Box>
          <LanguagePopover iconSize={30} />
        </Box>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              {t('welcome')}
            </Typography>
            <Box component="img" src={girasolImg} alt="login" maxHeight={500} />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              YvY
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              {t('noAccount')} {'  '}
              <Link component={RouterLink} to="/selectRegister" variant="subtitle2">
                {t('start')}
              </Link>
            </Typography>
            <LoginForm />
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t('contact')} {'  '}
              <Link component={RouterLink} to="/contact-us" variant="subtitle2">
                {t('contactUs.hemlet')}
              </Link>
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
