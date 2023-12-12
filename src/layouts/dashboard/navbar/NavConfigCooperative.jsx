// components
import SvgColor from '../../../components/svg-color/SvgColor';

// ----------------------------------------------------------------------

const icon = (name, size = 1) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: size, height: size }} />;

// t = translation function from useTranslation()
// t should be using "navigation" namespace.
const navConfigCooperative = (size, t) => [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      // MANAGEMENT : Mi Cooperativa
      // {
      //   title: t('cooperativeModules.myCooperative'),
      //   path: '/dashboard/main/myOrganization',
      //   icon: icon('ic_cooperative', size),
      //   children: [
      //     { title: t('cooperativeModules.registerProducts'), path: '/dashboard/main/myOrganization/registerProducts' },
      //     { title: t('cooperativeModules.dashboardAccess'), path: '/dashboard/main/myOrganization/dashboardAccess' },
      //     { title: t('cooperativeModules.news'), path: '/dashboard/main/myOrganization/news' },
      //     { title: t('cooperativeModules.financeData'), path: '/dashboard/main/myOrganization/financeData' },
      //     { title: t('cooperativeModules.certifications'), path: '/dashboard/main/myOrganization/certifications' },
      //     { title: t('cooperativeModules.calendar'), path: '/dashboard/main/myOrganization/calendar' },
      //   ],
      // },
      // MANAGEMENT : Mis Fincas
      {
        title: t('cooperativeModules.myFarms'),
        path: '/dashboard/main/myFarms',
        icon: icon('ic_farminfo', size),
        children: [
          { title: t('cooperativeModules.farmsInformation'), path: '/dashboard/main/myFarms/page/farmsInformation' },
          { title: t('cooperativeModules.carboonFootprint'), path: '/dashboard/main/myFarms/page/carboonFootprints' },
          { title: t('cooperativeModules.evotranspiracion'), path: '/dashboard/main/myFarms/page/waterFootprints' },
         /* { title: t('cooperativeModules.climateInformation'), path: '/dashboard/main/records/staff' }, */
          { title: t('cooperativeModules.waterNeeds'), path: '/dashboard/main/myFarms/page/wateringNeeds' },
          { title: t('cooperativeModules.agronomicData'), path: '/dashboard/main/myFarms/page/agronomicData' },
        ],
      },
      // MANAGEMENT : Gestion de Miembros
      {
        title: t('cooperativeModules.membersManagement'),
        path: '/dashboard/main/members',
        icon: icon('ic_staff', size),
        children: [
          { title: t('cooperativeModules.myMembers'), path: '/dashboard/main/members/page/myMembers' },
          { title: t('cooperativeModules.groupsInformation'), path: '/dashboard/main/members/groupsInformation' },
          { title: t('cooperativeModules.invitesInformation'), path: '/dashboard/main/members/page/invitesInformation' },
          { title: t('cooperativeModules.requestsInformation'), path: '/dashboard/main/members/page/requestsInformation' },

        ],
      },
      // MANAGEMENT : Geolocalizacion
      {
        title: t('cooperativeModules.geolocation'),
        path: '/dashboard/main/georeferencing',
        icon: icon('ic_geolocation', size),
      },
    ],
  },
];

export default navConfigCooperative;
