import SvgColor from '../../../../components/svg-color/SvgColor';
import { GeneralInfoForm } from '../sections/farmInformation/components/GeneralInfoForm';
// Translation module
import { useTranslation } from 'react-i18next';

const icon = (name, size = 1) => <SvgColor src={`/assets/icons/records/${name}.svg`} sx={{ width: size, height: size }} />;

export const recordsMain = (size, t) => [
  {
    subheader: '',
    breadcum: {
      name: t('title'),
      links: [{ name: t('links.home'), href: '/dashboard/main' }, { name: t('titleTwo') }],
    },
    items: [
      {
        title: t('recordsButtons.farmsInformation'),
        path: '/dashboard/main/records/farm',
        icon: icon('farminfo', size),
        childen: [{ title: t('recordsButtons.farmsInformation'), path: '/dashboard/main/records', icon: icon('farminfo', size) }],
      },
      {
        title: t('recordsButtons.agricultureProduction'),
        path: '/dashboard/main/records/production',
        icon: icon('agriculturalprod', size),
        childen: [
          { title: t('recordsButtons.agricultureProduction'), path: '/dashboard/main/records', icon: icon('agriculturalprod', size) },
        ],
      },
      {
        title: t('recordsButtons.accounting'),
        path: '/dashboard/main/records/accounting',
        icon: icon('accounting', size),
        childen: [{ title: t('recordsButtons.accounting'), path: '/dashboard/main/records', icon: icon('accounting', size) }],
      },
      {
        title: t('recordsButtons.staffing'),
        path: '/dashboard/main/records/staff',
        icon: icon('staff', size),
        childen: [{ title: t('recordsButtons.staffing'), path: '/dashboard/main/records', icon: icon('staff', size) }],
      },
    ],
  },
];

export const recordsFarm = (size, t) => [
  {
    subheader: '',
    breadcum: {
      name: t('title'),
      links: [
        { name: t('links.home'), href: '/dashboard/main' },
        { name: t('titleTwo'), href: '/dashboard/main/records' },
        { name: t('links.farms') },
      ],
    },
    items: [
      // {
      //   title: t('recordsButtons.generalInformation'),
      //   form: <GeneralInfoForm />,
      //   icon: icon('generalinfo', size),
      // },
      {
        title: t('recordsButtons.lots'),
        path: '/dashboard/main/records/farm/lots',
        icon: icon('plot', size),
      },
      // {
      //   title: t('recordsButtons.naturalAreasManagement'),
      //   path: '/dashboard/main/records/',
      //   icon: icon('naturalareas', size),
      // },
      // {
      //   title: t('recordsButtons.preOperational'),
      //   path: '/dashboard/main/records/',
      //   icon: icon('preoperational', size),
      // },
      // {
      //   title: t('recordsButtons.waterSourcesInspection'),
      //   path: '/dashboard/main/records/',
      //   icon: icon('watersources', size),
      // },
      // {
      //   title: t('recordsButtons.landUse'),
      //   path: '/dashboard/main/records/',
      //   icon: icon('earthuse', size),
      // },
    ],
  },
];

export const recordsProduction = (size, t) => [
  {
    subheader: '',
    breadcum: {
      name: t('title'),
      links: [
        { name: t('links.home'), href: '/dashboard/main' },
        { name: t('titleTwo'), href: '/dashboard/main/records' },
        { name: t('recordsButtons.agricultureProduction') },
      ],
    },
    items: [

      {
        title: t('recordsButtons.labors'),
        path: '/dashboard/main/records/production/labors',
        icon: icon('labor', size),
      },

      {
        title: t('recordsButtons.productionInformation'),
        path: '/dashboard/main/records/production/productionInfo',
        icon: icon('productioninfo', size),
      },

      {
        title: t('recordsButtons.sowing'),
        path: '/dashboard/main/records/production/sowing',
        icon: icon('sowing', size),
      },

      {
        title: t('recordsButtons.fertilization'),
        path: '/dashboard/main/records/production/fertilizationRecord',
        icon: icon('fertilization', size),
      },
      {
        title: t('recordsButtons.usePhytosanitaryProducts'),
        path: '/dashboard/main/records/production/phyto',
        icon: icon('phytosanitary', size),
      },
      {
        title: t('recordsButtons.soilData'),
        path: '/dashboard/main/records/production/soils',
        icon: icon('soil', size),
      },
      {
        title: t('recordsButtons.agrochemical'),
        path: '/dashboard/main/records/production/agrochemical',
        icon: icon('machinery', size),
      },
      // {
      //   title: t('recordsButtons.seeds'),
      //   path: '/dashboard/main/records/',
      //   icon: icon('seed', size),
      // },
      {
        title: t('recordsButtons.bioinputsElaboration'),
        path: '/dashboard/main/records/production/bioinputs',
        icon: icon('bioinputs', size),
      },

    ],
  },
];

export const recordsAccounting = (size, t) => [
  {
    subheader: '',
    breadcum: {
      links: [
        { name: t('links.home'), href: '/dashboard/main' },
        { name: t('titleTwo'), href: '/dashboard/main/records' },
        { name: t('recordsButtons.accounting') },
      ],
    },

    items: [
      {
        title: t('recordsButtons.sales'),
        path: '/dashboard/main/records/accounting/sales',
        icon: icon('sales', size),
      },
      {
        title: t('recordsButtons.revenuesExpenses'),
        path: '/dashboard/main/records/accounting/revenuesExpenses',
        icon: icon('profits', size),
      },
      {
        title: t('recordsButtons.performance'),
        path: '/dashboard/main/records/accounting/performance',
        icon: icon('performance', size),
      },
    ],
  },
];

export const recordsStaff = (size, t) => [
  {
    subheader: '',
    breadcum: {
      links: [
        { name: t('links.home'), href: '/dashboard/main' },
        { name: t('titleTwo'), href: '/dashboard/main/records' },
        { name: t('links.staff') },
      ],
    },

    items: [
      {
        title: t('recordsButtons.staffData'),
        path: '/dashboard/main/records/staff/staffInfo',
        icon: icon('employeeinfo', size),
      },
      // {
      //   title: t('recordsButtons.trainings'),
      //   path: '/dashboard/main/records',
      //   icon: icon('training', size),
      // },
      {
        title: t('recordsButtons.suppliers'),
        path: '/dashboard/main/records/staff/suppliers',
        icon: icon('employeeinfo', size),
      },
    ],
  },
];

export const getButtons = (size, page) => {
  // Added the translation for the button cards titles
  const { t } = useTranslation('records');

  if (page === undefined) return recordsMain(size, t);
  if (page === 'farm') return recordsFarm(size, t);
  if (page === 'production') return recordsProduction(size, t);
  if (page === 'accounting') return recordsAccounting(size, t);
  if (page === 'staff') return recordsStaff(size, t);
};
