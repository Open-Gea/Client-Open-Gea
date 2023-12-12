import { useTranslation } from 'react-i18next';


// Changed the way to translate the information since it was not working properly
const forecastAdvice = {
  temperature: {
    lower: 'temperatureAdvice.lower',
    higher: 'temperatureAdvice.higher',
    equal: 'temperatureAdvice.equal',
  },
  precipitation: {
    lower: 'precipitationAdvice.lower',
    higher: 'precipitationAdvice.higher',
    equal: 'precipitationAdvice.equal',
  },
};

const getValueIdentifier = value => {
  // 0 = average value.
  const fixedValue = value;
  switch (true) {
    case fixedValue > 0:
      return 'higher';
    case fixedValue < 0:
      return 'lower';
    case fixedValue === 0:
      return 'equal';
    default:
      return '';
  }
};

export const getForecastAdvice = (forecastType, value) => {
  // Importing the required to load the translation module
  const { i18n, t } = useTranslation('seasonal-forecast');
  const { t: tCommon } = useTranslation('common');

  if (!forecastType || !value) return null;
  const identifier = getValueIdentifier(value);
  const foundAdvice = forecastAdvice[forecastType]?.[identifier];

  // Doing the translation of the advice
  return t(foundAdvice) ?? null;
};
