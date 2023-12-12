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
import cacao from '../../assets/mainviewImg/cacao.png';
import newLogo from '../../assets/new_logo_yvy1.png';
import { useTranslation } from 'react-i18next';
import LanguagePopover from '../../layouts/dashboard/header/LanguagePopover';
import ContactUsForm  from '../../components/concact-us/ContactUsForm';
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
  const {t} = useTranslation('register-login')
  return (
    <>
      <Helmet>
        <title> {t('contactUs.hemlet')} | yvy </title>
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
              {t('contactUs.title')}
            </Typography>
            <Box component="img" src={cacao} alt="login" maxHeight={500} />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              YvY
            </Typography>
            <ContactUsForm/>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
