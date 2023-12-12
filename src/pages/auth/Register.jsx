import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/utils/Page';
import { RegisterForm } from '../../components/register-form';

// images
import cebadasImg from '../../assets/mainviewImg/cebadas.png';
import newLogo from '../../assets/new_logo_yvy1.png';
import LanguagePopover from '../../layouts/dashboard/header/LanguagePopover';
import { Helmet } from 'react-helmet-async';
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
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  '& > *': {
    marginBottom: theme.spacing(3), // Espacio vertical uniforme entre elementos
  },
}));

// ----------------------------------------------------------------------

export default function Register() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const {t} = useTranslation('register-login')

  return (
    <>
       <Helmet>
        <title> {t('tabTitle')} | yvy </title>
      </Helmet>
      <StyledRoot>

        <Box  to="/" sx={{
          display: 'flex',
          justifyContent: 'space-between',
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
        <StyledSection>
          {mdUp && (    
              <Box component="img" src={cebadasImg} alt="login" maxHeight={500} />
              )}
        </StyledSection>

        <Container>
          <StyledContent >
                <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                  {t('haveAccount')}{' '}
                  <Link variant="subtitle2" component={RouterLink} to="/login">
                    {t('logIn')}
                  </Link>
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {t('register')}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{t('fieldsRequired')}</Typography>

            <RegisterForm />
          </StyledContent>
        </Container>
      </StyledRoot>

    </>
  );
}
