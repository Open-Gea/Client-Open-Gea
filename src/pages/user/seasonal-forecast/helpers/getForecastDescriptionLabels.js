import { t } from "i18next";

const ns = "seasonal-forecast";

export const getForecastType = forecastType => {
  switch (forecastType) {
    case 'precipitation':
      return t('forecastDescriptionString.precipitation', { ns });

    case 'temperature':
      return t('forecastDescriptionString.temperature', { ns });

    default:
      return null;
  }
};

export const getTimeRange = timeRange => {
  switch (timeRange) {
    case 'quarterly':
      return t('forecastDescriptionString.quarterly', { ns });

    case 'monthly':
      return t('forecastDescriptionString.monthly', { ns });

    case 'weekly':
      return t('forecastDescriptionString.weekly', { ns });

    default:
      return null;
  }
};

export const getValueDescription = value => {
  const fixedValue = Number(value.toFixed(4));

  // Will return the one that matches with "true"
  switch (true) {
    case fixedValue > 0:
      return t('forecastDescriptionString.higherValue', { ns });
    case fixedValue < 0:
      return t('forecastDescriptionString.lowerValue', { ns });
    case fixedValue === 0:
      return t('forecastDescriptionString.equalValue', { ns });

    default:
      return null;
  }
};

export const getForecastDescription = (forecastType, timeRange, value) => {
  const baseDescription = t('forecastDescriptionString.fullString', { ns, forecastType: getForecastType(forecastType), timeRange: getTimeRange(timeRange), variation: getValueDescription(value) });
  return baseDescription;
};
