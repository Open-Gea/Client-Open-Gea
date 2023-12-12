import { Button, CssBaseline, Container, Stack, Divider, Box } from '@mui/material';
import './mainview.css';
import LandingPage from './LandingPage';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import LanguagePopover from '../../layouts/dashboard/header/LanguagePopover';
import useResponsive from '../../hooks/useResponsive';
import Logo from '../../assets/mainviewImg/Logo final-color.png';
import Plan21 from '../../assets/mainviewImg/plan21.png';

export default function Mainview() {
  const { t } = useTranslation('navigation');
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'lg');

  return (
    <>
      <Container
        maxWidth="false"
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          paddingBottom: '4vh',
          alignItems: 'center'
          // height: '5.5vh',
          // border: '2px solid black'
        }}
        >
        <Stack  direction={'row'} justifyContent={'space-around'} alignItems={'center'} /* marginLeft={'5vw'} */ width={isDesktop ? '40vw' : '100vw'} /* border={'2px solid black'} */>
          
          <img height={isDesktop ? '150px' : '120px'} src={Logo} alt="ivy-logo" />
          <img height={isDesktop ? '100px' : '80px'}  src={Plan21} alt="plan21-logo" />
          
        </Stack>
        <Stack spacing={2} direction="row" alignItems={'center'} justifyContent={'space-around'} width={isDesktop ? '40vw' : '100vw'} /* border={'solid 2px black'} */>
          <Box /* sx={{ maxHeight: '2rem' }} */>
            <LanguagePopover iconSize={30} />
          </Box>
          <Divider orientation="vertical" />
          <Button
            variant="contained"
            size='large'
            onClick={() => navigate('/login')}
            sx={{ background: 'rgb(0,138,74)'}}
          >
            {t('actions.login')}
          </Button>
          <Button
            variant="contained"
            size='large' 
            onClick={() => navigate('/selectRegister')}
            sx={{ background: 'rgb(0,138,74)' }}
          >
            {t('actions.register')}
          </Button>
        </Stack>
      </Container>
      <CssBaseline />
      <LandingPage />
    </>
  );
}
