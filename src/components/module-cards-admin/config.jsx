// component
import SvgColor from '../svg-color';
import PeopleIcon from '@mui/icons-material/People';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import InventoryIcon from '@mui/icons-material/Inventory';

// ----------------------------------------------------------------------

const icon = name => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: '90px', height: '90px' }} />;

export const userNavConfig = [
  {
    title: 'Mis Fincas',
    path: '/dashboard/main/myFarms',
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
];
export const adminNavConfig = [
  {
    title: 'Users',
    path: '/admin/users',
    icon: <PeopleIcon sx={{ width: '90px', height: '90px' }} />,
  },
  {
    title: 'Global Warming Potentials',
    path: '/admin/gwpq',
    icon: <WhatshotIcon sx={{ width: '90px', height: '90px' }} />,
  },
  {
    title: 'Emission Factor',
    path: '/admin/ef',
    icon: <CarCrashIcon sx={{ width: '90px', height: '90px' }} />,
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: <InventoryIcon sx={{ width: '90px', height: '90px' }} />,
  },
  {
    title: 'Countries',
    path: '/admin/countries',
    icon: icon('ic_huellaCarbono'),
  },
];
