// component
import SvgColor from '../../../components/svg-color';
import PeopleIcon from '@mui/icons-material/People';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import InventoryIcon from '@mui/icons-material/Inventory';

// ----------------------------------------------------------------------

const icon = name => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const userNavConfig = [
  {
    title: 'Mis Fincas',
    path: '/dashboard/main/farms',
    icon: icon('ic_fincas'),
  },
  {
    title: 'Huella de carbono',
    path: '/dashboard/main/carbon-footprint',
    icon: icon('ic_huellaCarbono'),
  },
  {
    title: 'Huella Hídrica',
    path: '/dashboard/main/evotranspiration',
    icon: icon('ic_evaporation'),
  },
  {
    title: 'Necesidades de riego',
    path: '/dashboard/main/irrigation',
    icon: icon('ic_watering'),
  },
  {
    title: 'Datos agronómicos',
    path: '/dashboard/main/agronomic-data',
    icon: icon('ic_chart'),
  },
  {
    title: 'Pronósticos climáticos',
    path: '/dashboard/main/weather-forecast',
    icon: icon('ic_weather'),
  },
  {
    title: 'Pronóstico estacional',
    path: '/dashboard/main/seasonal-forecast',
    // TODO: Add a different icon for this module (a thermometer icon maybe?)
    icon: icon('ic_weather'),
  },
  {
    title: 'autodiagnostico',
    path: '/dashboard/main/selectCriterio',
    icon: icon('ic_autodiagnostico'),
  },
  {
    title: 'Codigo QR',
    path: '/dashboard/main/qr',
    icon: icon('ic_qr'),
  },
  {
    title: 'Plan Regeneración de Suelo',
    path: '/dashboard/main/soil_regeneration',
    icon: icon('ic_qr'),
  }
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export const adminNavConfig = [
  {
    title: 'Users',
    path: '/dashboard/admin/users',
    icon: <PeopleIcon />,
  },
  {
    title: 'Global Warming Potentials',
    path: '/dashboard/admin/gwpq',
    icon: <WhatshotIcon />,
  },
  {
    title: 'Emission Factor',
    path: '/dashboard/admin/ef',
    icon: <CarCrashIcon />,
  },
  {
    title: 'Products',
    path: '/dashboard/admin/products',
    icon: <InventoryIcon />,
  },
  {
    title: 'Countries',
    path: '/dashboard/admin/countries',
    icon: icon('ic_huellaCarbono'),
  },
];
