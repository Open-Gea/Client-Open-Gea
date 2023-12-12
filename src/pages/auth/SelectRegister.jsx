import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';
// components
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
// images
import newLogo from '../../assets/new_logo_yvy1.png';
import LanguagePopover from '../../layouts/dashboard/header/LanguagePopover';
import { Link as RouterLink } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import { useTranslation } from 'react-i18next';


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 900,
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
const StyledButton = styled(Button)({
  fontFamily: 'Public Sans,sans-serif',
  fontWeight: '700',
  textTransform: 'capitalize',
  color: '#f7f4e6',
  fontSize: '0.9375rem',
  padding: '5px 20px',
  textDecoration: 'none',
  maxWidth: '100%', 
  maxHeight: '300%',
  lineHeight: '2.3',
  
  borderRadius: '8px',
  boxShadow: '0px 1px 3px #666666',
  textShadow: '1px 1px 3px #55c255',
  border: 'solid #000000 0px',
  backgroundColor: '#00AB55',
  '&:hover': {
    background: '#007b55',
    boxShadow: '0px 1px 3px #333333',
  },
  '&:not(:last-child)': {
    marginBottom: '4px',
  },
});

export default function SelectRegister() {
  const navigate = useNavigate();

  const {t} = useTranslation('register-login')

  const handleOptionClick = (option) => {
    if (option === 'Productor') {
      // Redirigir a la página específica para "CRITERIOS DE SOSTENIBILIDAD PARA PRODUCCIÓN AGROPECUARIA TU MODELO"
      navigate('/register');
    } else if (option === 'Cooperativa') {
      // Redirigir a la página específica para "CRITERIOS DE SOSTENIBILIDAD NORMATIVA SMART PLANET"
      navigate('/registerCooperative');
    }
  };

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  return (
    <>
      <Helmet>
        <title>{t('tabTitle')} | yyv</title>
      </Helmet>

      <StyledRoot>

        <Box  to="/" sx={{
          display: 'flex',
          justifyContent: 'space-between', // Esto coloca los elementos en las esquinas opuestas
          px: 2.5,
          py: 2,
          position: 'fixed',
          width: '100%',
        }}>
          <Box component={RouterLink} to="/">
            <img height={mdUp ? "100px" : "60px"} src={newLogo} alt="ivy-logo" />
          </Box>
          <LanguagePopover iconSize={30} />
        </Box>
        <Container maxWidth="sm" maxHeight="md">
          
          <StyledContent>
                <Typography variant="h4" gutterBottom>
                  {t('selectRegister')}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}> {t('helperRegister')} </Typography>

            <StyledButton
              variant="outlined"
              onClick={() => handleOptionClick('Productor')}
            >
             {t('producer')}
            </StyledButton>
            <br />
            <StyledButton
              variant="outlined"
              onClick={() => handleOptionClick('Cooperativa')}
            >
              {t('orga')}
            </StyledButton>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}