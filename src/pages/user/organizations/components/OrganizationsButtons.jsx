import SvgColor from '../../../../components/svg-color/SvgColor';

// Using the same icons located in records
const icon = (name, size = 1) => <SvgColor src={`/assets/icons/records/${name}.svg`} sx={{ width: size, height: size }} />;

export const membersMain = (size,t) => [
  {
    subheader: '',
    breadcum: {
      name: t('cooperativeModules.membersManagement'),
      links: [{ name: t('actions.home'), href: '/dashboard/main' }, { name:  t('modules.organizationsActions') }],
    },
    items: [
      {
        title: t('modules.myCooperatives'),
        path: '/dashboard/main/organizations/page/myOrganizations',
        icon: icon('ic_cooperative', size),
        childen: [{ title: t('modules.myCooperatives'), path: '/dashboard/main/organizations/page/myOrganizations', icon: icon('ic_cooperative', size) }],
      },
      {
        title: t('cooperativeModules.invitesInformation'),
        path: '/dashboard/main/organizations/page/invitesInformation',
        icon: icon('invites-information', size),
        childen: [{ title: t('cooperativeModules.invitesInformation'), path: '/dashboard/main/organizations/page/invitesInformation', icon: icon('invites-information', size) }],
      },
      {
        title: t('cooperativeModules.requestsInformation'),
        path: '/dashboard/main/organizations/page/requestsInformation',
        icon: icon('requests', size),
        childen: [{ title: t('cooperativeModules.requestsInformation'), path: '/dashboard/main/organizations/page/requestsInformation', icon: icon('invites-information', size) }],
      }
    ],
  },
];

export const getButtons = (size, page, t) => {
  if (page === undefined) return membersMain(size, t);
};
