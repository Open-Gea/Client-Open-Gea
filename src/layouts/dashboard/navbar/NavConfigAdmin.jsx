// components
import SvgColor from '../../../components/svg-color/SvgColor';

// ----------------------------------------------------------------------

const icon = (name, size = 1) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: size, height: size }} />;

// t = translation function from useTranslation()
// t should be using "navigation" namespace.
const navConfigAdmin = (size, t) => [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      // MANAGEMENT
      {
      title: t('adminModules.management'),
      path: '/dashboard/admin/administration',
      icon: icon('ic_administrator', size),
      children: [
        { title: t('adminModules.users'), path: '/dashboard/admin/administration/page/usersInformation' },
        { title: t('adminModules.countries'), path: '/dashboard/admin/administration/page/countriesInformation' },
        ],
      },
      // STATISTICS
      {
        title: t('adminModules.statistics'),
        path: '/dashboard/admin/statistics',
        icon: icon('ic_stats', size),
        children: [
          { title: t('adminModules.userRegisteredInYvY'), path: '/dashboard/admin/statistics/page/usersPerCountry' },
          { title: t('adminModules.userRegisteredPerYear'), path: '/dashboard/admin/statistics/page/usersRegisteredPerYear' },
          ],
      },
    ],
  },
];

export default navConfigAdmin;
