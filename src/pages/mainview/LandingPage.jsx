import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardMedia, Container, Stack, Box, Typography, Grid, Divider } from '@mui/material';
import Logo from '../../assets/mainviewImg/Logo final-color.png';
import Plan21 from '../../assets/mainviewImg/plan21.png';
import SvgColor from '../../components/svg-color';
import campo from '../../assets/mainviewImg/campo1.jpg'
import MyCarousel from './MyCarousel';
import useResponsive from '../../hooks/useResponsive';
import Footer from './Footer';


const icon = name => <SvgColor src={`../assets/icons/navbar/${name}.svg`} sx={{ width: '90px', height: '90px' }} />;

const landingPageStyles = {
  backgroundImage: `url(${campo})`,
  backgroundSize: 'cover',        // Ajusta el tamaño de la imagen para cubrir todo el contenedor
  backgroundPosition: 'center',   // Ajusta la posición de la imagen al centro
  minHeight: '93.6vh',            // Fija una altura mínima para el contenedor
};

const LandingPage = () => {

  const isFirefox = /firefox/i.test(navigator.userAgent);

  const { t } = useTranslation('landing-page');
  const isDesktop = useResponsive('up', 'lg');
  return (
    <Container maxWidth="false" sx={landingPageStyles}>
      <Grid container spacing={3} alignItems={'center'} /* sx={{ border: '2px solid black'} } */>
        <Grid item xs={12} md={6}  >
          <Box>
            <Typography  variant='h3' paddingLeft={3}  color='white'  sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'  }}>
              {t('title')}
            </Typography>
            <Typography variant='h2' paddingLeft={3} paddingTop={2} color='white'  sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'  }}>
              {t('plan21')}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} justifyItems={'center'} /* sx={{ border: '2px solid black'}} */>
          <MyCarousel/>
        </Grid>
        <Grid item xs={12} marginTop={isFirefox ? '9vh' : '3vh'}>
          <Footer/>
        </Grid>
      </Grid>
    </Container>
  );
};
export default LandingPage;
