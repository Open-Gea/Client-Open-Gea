import SvgColor from '../../../../components/svg-color/SvgColor';

// Using the same icons located in records
const icon = (name, size = 1) => <SvgColor src={`/assets/icons/records/${name}.svg`} sx={{ width: size, height: size }} />;

export const cooperativeMain = (size,t) => [
  {
    subheader: '',
    breadcum: {
      name: t('cooperativeModules.membersManagement'),
      links: [{ name: t('actions.home'), href: '/dashboard/main' }, { name:  t('cooperativeModules.organization') }],
    },
    items: [
      {
        title: t('cooperativeModules.registerProducts'),
        path: '/dashboard/main/myOrganization/registerProducts',
        icon: icon('products-registration', size),
        childen: [{ title: t('cooperativeModules.registerProducts'), path: '/dashboard/main/myOrganization/registerProducts', icon: icon('users-addremove', size) }],
      },
      {
        title: t('cooperativeModules.dashboardAccess'),
        path: '/dashboard/main/myOrganization/dashboardAccess',
        icon: icon('access-dashboard', size),
        childen: [{ title: t('cooperativeModules.dashboardAccess'), path: '/dashboard/main/myOrganization/dashboardAccess', icon: icon('users-addremove', size) }],
      },
      {
        title: t('cooperativeModules.news'),
        path: '/dashboard/main/myOrganization/news',
        icon: icon('news', size),
        childen: [{ title: t('cooperativeModules.news'), path: '/dashboard/main/myOrganization/news', icon: icon('users-addremove', size) }],
      },
      {
        title: t('cooperativeModules.financeData'),
        path: '/dashboard/main/myOrganization/financeData',
        icon: icon('finance-data', size),
        childen: [{ title: t('cooperativeModules.financeData'), path: '/dashboard/main/myOrganization/financeData', icon: icon('users-addremove', size) }],
      },
      {
        title: t('cooperativeModules.certifications'),
        path: '/dashboard/main/myOrganization/certifications',
        icon: icon('certifications', size),
        childen: [{ title: t('cooperativeModules.certifications'), path: '/dashboard/main/myOrganization/certifications', icon: icon('users-addremove', size) }],
      },
      {
        title: t('cooperativeModules.calendar'),
        path: '/dashboard/main/myOrganization/calendar',
        icon: icon('calendar', size),
        childen: [{ title: t('cooperativeModules.calendar'), path: '/dashboard/main/myOrganization/calendar', icon: icon('users-addremove', size) }],
      }
    ],
  },
];

export const getButtons = (size, page, t) => {
  if (page === undefined) return cooperativeMain(size, t);
};
