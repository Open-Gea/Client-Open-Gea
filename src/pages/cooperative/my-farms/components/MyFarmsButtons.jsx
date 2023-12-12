import SvgColor from '../../../../components/svg-color/SvgColor';

// Using the same icons located in records
const icon = (name, size = 1) => <SvgColor src={`/assets/icons/records/${name}.svg`} sx={{ width: size, height: size }} />;

export const myFarmsMain = (size,t) => [
  {
    subheader: '',
    breadcum: {
      name: t('modules.farmsAssociated'),
      links: [{ name: t('actions.home'), href: '/dashboard/main' }, { name:  t('modules.farms') }],
    },
    items: [
      {
        title: t('cooperativeModules.farmsInformation'),
        path: '/dashboard/main/myFarms/page/farmsInformation',
        icon: icon('myfarms', size),
        childen: [{ title: t('cooperativeModules.farmsInformation'), path: '/dashboard/main/myFarms/page/farmsInformation', icon: icon('myfarms', size) }],
      },
      {
        title: t('cooperativeModules.carboonFootprint'),
        path: '/dashboard/main/myFarms/page/carboonFootprints',
        icon: icon('huellacarbono', size),
        childen: [{ title: t('cooperativeModules.carboonFootprint'), path: '/dashboard/main/myFarms/page/carboonFootprints', icon: icon('huellacarbono', size) }],
      },
      {
        title: t('cooperativeModules.evotranspiracion'),
        path: '/dashboard/main/myFarms/page/waterFootprints',
        icon: icon('evotranspiracion', size),
        childen: [{ title: t('cooperativeModules.evotranspiracion'), path: '/dashboard/main/myFarms/page/waterFootprints', icon: icon('evotranspiracion', size) }],
      },
      /* Removed as requested by the customer
      {

        title: t('cooperativeModules.climateInformation'),
        path: '/dashboard/main/records/staff',
        icon: icon('pronostico', size),
        childen: [{ title:  t('cooperativeModules.climateInformation'), path: '/dashboard/main/records/farm', icon: icon('pronostico', size) }],
      },
      */
      {
        title:  t('cooperativeModules.waterNeeds'),
        path: '/dashboard/main/myFarms/page/wateringNeeds',
        icon: icon('necesidadriego', size),
        childen: [{ title:  t('cooperativeModules.waterNeeds'), path: '/dashboard/main/myFarms/page/wateringNeeds', icon: icon('necesidadriego', size) }],
      },
      {
        title: t('cooperativeModules.agronomicData'),
        path: '/dashboard/main/myFarms/page/agronomicData',
        icon: icon('datosagronomicos', size),
        childen: [{ title: t('cooperativeModules.agronomicData'), path: '/dashboard/main/myFarms/page/agronomicData', icon: icon('datosagronomicos', size) }],
      },
    ],
  },
];

export const getButtons = (size, page, t) => {
  if (page === undefined) return myFarmsMain(size, t);
};
