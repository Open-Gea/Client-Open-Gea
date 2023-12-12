import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

export default function StepsQrBreadcums() {
  const breadcrumbs = [
    <Typography key="0" variant="h5">
      Pasos para obtener tu QR
    </Typography>,
    <Link component={RouterLink} to="/dashboard/main/farms" underline="hover" key="1" color="inherit">
      1. Registra tus fincas
    </Link>,
    <Link component={RouterLink} to="/dashboard/main/carbon-footprint" underline="hover" key="2" color="inherit">
      2. Calcula la huella de carbono
    </Link>,
    <Link component={RouterLink} to="/dashboard/main/evotranspiration" underline="hover" key="3" color="inherit">
      3. Calcula la Evapotranspiración
    </Link>,
    <Typography key="4">¡Estás listo para empezar!</Typography>,
  ];

  return (
    <Stack>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
