import SvgColor from '../../../../components/svg-color/SvgColor';

// Using the same icons located in records
const icon = (name, size = 1) => <SvgColor src={`/assets/icons/records/${name}.svg`} sx={{ width: size, height: size }} />;

export const statisticsMain = (size,t) => [
  {
    subheader: '',
    breadcum: {
      name: t('adminModules.statisticsLong'),
      links: [{ name: t('actions.home'), href: '/dashboard/admin' }, { name:  t('adminModules.statistics') }],
    },
    items: [
      {
        title: t('adminModules.userRegisteredInYvY-U'),
        path: '/dashboard/admin/statistics/page/usersPerCountry',
        icon: icon('staff', size),
      },
      {
        title: t('adminModules.userRegisteredPerYear'),
        path: '/dashboard/admin/statistics/page/usersRegisteredPerYear',
        icon: icon('line-diagram', size),
      },
    ],
  },
];

export const getButtons = (size, page, t) => {
  if (page === undefined) return statisticsMain(size, t);
};
