import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// images
import newLogo from '../../assets/new_logo_yvy1.png';
import { useDispatch } from 'react-redux';
import { hasError, resendEmailVerification, verifyEmail } from '../../redux/slices/auth';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../components/utils/LoadingScreen';
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

export default function EmailVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const token = new URLSearchParams(location.search).get('token');
  const email = new URLSearchParams(location.search).get('email');
  const isCoop = new URLSearchParams(location.search).get('isCoop');

  const [resendEmail, setResendEmail] = useState(false);
  const [redirectTimeout, setRedirectTimeout] = useState(null);
  const [remainingTime, setRemainingTime] = useState(5);

  useEffect(() => {
    const onMount = async () => {
        await dispatch(verifyEmail({ token, email, isCoop }))
        .then(e => {
            setIsLoading(false); // Finaliza la carga
            if(e.meta.requestStatus === 'rejected') {
                dispatch(hasError(e));
                setError(true);
            }else{
                handleRedirect()
            }
        })
        .catch(e => {
          console.error('Error:', e);
          
        });
    };

    onMount();
  }, []);


  const handleRedirect = () => {
    // Configura el temporizador para redirigir después de 5 segundos
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 5000);
    setRedirectTimeout(timeout);
  };



  const handleSubmit = () => {
    dispatch(resendEmailVerification({ email }));
    setResendEmail(true);
    handleRedirect(); // Activa el temporizador después de hacer clic en "Enviar"
  }

  
  return (
    <>
        {isLoading ? (
        <LoadingScreen /> // Muestra el componente de carga mientras se espera la respuesta
      ) : 
      (
        <>
        
            <Helmet>
                <title> YvY | Verificacion de E-Mail </title>
            </Helmet>

            <StyledRoot>
                <Box component={RouterLink} to="/" sx={{ px: 2.5, py: 2, position: 'fixed', objectFit: 'cover' }}>
                    <img height="100px" src={newLogo} alt="ivy-logo" />
                </Box>

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" align="center" gutterBottom>
                            Verificación de Correo Electrónico
                        </Typography>
                        {error ? 
                        <>
                         <Typography variant="body1" align="center" paragraph>
                          Tu correo electrónico: <span style={{ fontWeight: 'bold'}}>{email}</span> no pudo ser verificado. Puede que el link haya expirado. Intente nuevamente haciendo click en "Reenviar"
                         </Typography>
                         <Button onClick={handleSubmit}>Reenviar</Button>
                         {
                            resendEmail && (
                                <>
                                    <Typography variant="body1" align="center" paragraph>
                                        Correo Electrónico enviado. Esta ventana se redirigirá automaticamente en unos segundos...
                                    </Typography>
                                </>
                            )
                         }
                         <Typography variant="body2" align="center" paragraph>
                          Si el problema persiste, contáctenos: yvy.plan21@gmail.com
                         </Typography>
                        </>
                        :(<Typography variant="body1" align="center" paragraph>
                            Tu correo electrónico ha sido verificado. Esta ventana se redirigirá automaticamente en unos segundos...
                        </Typography>)}
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
      )}
    </>
  );
}
