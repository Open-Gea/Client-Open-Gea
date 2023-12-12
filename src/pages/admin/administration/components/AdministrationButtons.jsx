import SvgColor from '../../../../components/svg-color/SvgColor';

// Using the same icons located in records
const icon = (name, size = 1) => <SvgColor src={`/assets/icons/records/${name}.svg`} sx={{ width: size, height: size }} />;

export const administrationMain = (size,t) => [
  {
    subheader: '',
    breadcum: {
      name: t('adminModules.managementLong'),
      links: [{ name: t('actions.home'), href: '/dashboard/admin' }, { name:  t('adminModules.management') }],
    },
    items: [
      {
        title: t('adminModules.users'),
        path: '/dashboard/admin/administration/page/usersInformation',
        icon: icon('staff', size),
      },
      {
        title: t('adminModules.countries'),
        path: '/dashboard/admin/administration/page/countriesInformation',
        icon: icon('earth', size),
      },
    ],
  },
];

export const getButtons = (size, page, t) => {
  if (page === undefined) return administrationMain(size, t);
};
