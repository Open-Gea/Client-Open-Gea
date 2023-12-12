import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';
// components
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
// images
import newLogo from '../../../assets/new_logo_yvy1.png'
// Translation module
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
  justifyContent: 'up',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
const StyledButton = styled(Button)({
  fontFamily: 'Arial',
  color: '#f7f4e6',
  fontSize: '18px',
  padding: '6px 20px',
  textDecoration: 'none',
  
  borderRadius: '28px',
  boxShadow: '0px 1px 3px #666666',
  textShadow: '1px 1px 3px #55c255',
  border: 'solid #000000 2px',
  background: 'linear-gradient(0deg, #00ab55 , #00ab55 )',
  '&:hover': {
    background: '#298A08',
    boxShadow: '0px 1px 3px #333333',
  },
  '&:not(:last-child)': {
    marginBottom: '10px',
  },
  fontWeight: 'bold', // Agregar esta línea para establecer el texto en negrita

});

export default function SelectCriterio() {
  const navigate = useNavigate();
  const handleOptionClick = (option) => {
    if (option === 'MAG') {
      // Redirigir a la página específica para "CRITERIOS DE SOSTENIBILIDAD PARA PRODUCCIÓN AGROPECUARIA TU MODELO"
      navigate('/dashboard/main/mag');
    } else if (option === 'SMART_PLANET') {
      // Redirigir a la página específica para "CRITERIOS DE SOSTENIBILIDAD NORMATIVA SMART PLANET"
      navigate('/dashboard/main/smart-planet');
    }
  };
  const { t } = useTranslation('self-diagnosis');
  return (
    <>
      <Helmet>
        <title>{t('titleWeb')}</title>
      </Helmet>

      <StyledRoot>

      <Box  to="/" sx={{ px: 2.5, py: 2, position: 'fixed', objectFit: 'cover' }}>
          <img height="100px" src={newLogo} alt="yvy-logo" />
        </Box>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" gutterBottom align="center">
              {t('title2')}
            </Typography>
            <Typography variant="h5" gutterBottom align="center">
              {t('chooseOption')}
            </Typography>
            <StyledButton
              variant="outlined"
              size="small"
              onClick={() => handleOptionClick('MAG')}
              >
              {t('buttons.mag')}
            </StyledButton>
            
            {/* <StyledButton
              variant="outlined"
              size="medium"
              onClick={() => handleOptionClick('SMART_PLANET')}
            >
              {t('buttons.smartPlanet')}
            </StyledButton> */}
            
            </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}