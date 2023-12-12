import SvgColor from '../../../../components/svg-color/SvgColor';

// Using the same icons located in records
const icon = (name, size = 1) => <SvgColor src={`/assets/icons/records/${name}.svg`} sx={{ width: size, height: size }} />;

export const membersMain = (size,t) => [
  {
    subheader: '',
    breadcum: {
      name: t('cooperativeModules.membersManagement'),
      links: [{ name: t('actions.home'), href: '/dashboard/main' }, { name:  t('cooperativeModules.members') }],
    },
    items: [
      {
        title: t('cooperativeModules.myMembers'),
        path: '/dashboard/main/members/page/myMembers',
        icon: icon('users-addremove', size),
        childen: [{ title: t('cooperativeModules.myMembers'), path: '/dashboard/main/members/page/myMembers', icon: icon('users-addremove', size) }],
      },

      {
        title: t('cooperativeModules.groupsInformation'),
        path: '/dashboard/main/members/groupsInformation',
        icon: icon('groups-information', size),
        childen: [{ title: t('cooperativeModules.groupsInformation'), path: '/dashboard/main/members/groupsInformation', icon: icon('groups-information', size) }],
      },
      {
        title: t('cooperativeModules.invitesInformation'),
        path: '/dashboard/main/members/page/invitesInformation',
        icon: icon('invites-information', size),
        childen: [{ title: t('cooperativeModules.invitesInformation'), path: '/dashboard/main/members/page/invitesInformation', icon: icon('invites-information', size) }],
      },
      {
        title: t('cooperativeModules.requestsInformation'),
        path: '/dashboard/main/members/page/requestsInformation',
        icon: icon('requests', size),
        childen: [{ title: t('cooperativeModules.requestsInformation'), path: '/dashboard/main/members/page/requestsInformation', icon: icon('invites-information', size) }],
      }

    ],
  },
];

export const getButtons = (size, page, t) => {
  if (page === undefined) return membersMain(size, t);
};
