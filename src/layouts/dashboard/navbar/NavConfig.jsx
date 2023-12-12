// components
import SvgColor from '../../../components/svg-color/SvgColor';

// ----------------------------------------------------------------------

const icon = (name, size = 1) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: size, height: size }} />;

// t = translation function from useTranslation()
// t should be using "navigation" namespace.
const navConfig = (size, t) => [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      // MANAGEMENT : FARMS
      {
        title: t('modules.farms'),
        path: '/dashboard/main/farms',
        icon: icon('ic_fincas', size),
      },
      // MANAGEMENT : Huella de carbono
      {
        title: t('modules.carbon-footprint'),
        path: '/dashboard/main/carbon-footprint',
        icon: icon('ic_huellaCarbono', size),
      },
      // MANAGEMENT : Evotranspiracion
      {
        title: t('modules.water-footprint'),
        path: '/dashboard/main/evotranspiration',
        icon: icon('ic_evaporation', size),
      },
      // MANAGEMENT : necesidades de riego
      {
        title: t('modules.watering-needs'),
        path: '/dashboard/main/irrigation',
        icon: icon('ic_watering', size),
      },
      // MANAGEMENT : datos agronómicos
      {
        title: t('modules.agronomic-data'),
        path: '/dashboard/main/agronomic-data',
        icon: icon('ic_chart', size),
      },
      {
        title: t('modules.weather-forecast'),
        path: '/dashboard/main/weather-forecast',
        icon: icon('ic_weather', size),
      },
      {
        title: t('modules.seasonal-forecast'),
        path: '/dashboard/main/seasonal-forecast',
        // TODO: Add a different icon for this module (a thermometer icon maybe?)
        icon: icon('ic_weather', size),
      },

      {
        title: t('modules.historical-record'),
        path: '/dashboard/main/records/',
        icon: icon('ic_records', size),
        children: [
          { title: t('modules.historical-record-options.farms-information'), path: '/dashboard/main/records/farm' },
          { title: t('modules.historical-record-options.agriculture-productions'), path: '/dashboard/main/records/production' },
          { title: t('modules.historical-record-options.accounting'), path: '/dashboard/main/records/accounting' },
          { title: t('modules.historical-record-options.staffing'), path: '/dashboard/main/records/staff' },
        ],
      },


      {
        title: t('modules.soilRegenerationPlan'),
        path: '/dashboard/main/soil_regeneration',
        icon: icon('ic_naturalareas', size),
      },
      {
        title: t('modules.selfDiagnosisSustainability'),
        path: '/dashboard/main/selectCriterio',
        icon: icon('ic_autodiagnostico', size),
      },
      {
        title: t('modules.qr'),
        path: '/dashboard/main/qr',
        icon: icon('ic_qr', size),
      },
      {
      title: t('modules.organizations'),
      path: '/dashboard/main/organizations',
      icon: icon('ic_cooperative', size),
      children: [
        { title: t('modules.myCooperatives'), path: '/dashboard/main/organizations/page/myOrganizations' },
        { title: t('cooperativeModules.invitesInformation'), path: '/dashboard/main/organizations/page/invitesInformation' },
        { title: t('cooperativeModules.requestsInformation'), path: '/dashboard/main/organizations/page/requestsInformation' },
        ],
      },
    ],
  },
];

export default navConfig;
