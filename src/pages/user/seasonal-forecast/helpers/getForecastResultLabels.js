import { t } from "i18next";

const ns = "seasonal-forecast";

export const getTemperatureLabel = value => {
  let amountlabel = '';

  if (value < 0) {
    amountlabel = t('temperatureForecastSummary.colder', { ns });
  } else {
    amountlabel = t('temperatureForecastSummary.warmer', { ns });
  }

  return `${amountlabel} (${value.toFixed(2)} °C)`;
};

export const getPrecipitationLabel = value => {
  let amountlabel = '';

  if (value < 0) {
    amountlabel = t('precipitationForecastSummary.less', { ns });
  } else {
    amountlabel = t('precipitationForecastSummary.more', { ns });
  }

  return `${amountlabel} (${value.toFixed(2)} mm)`;
};

export const getForecastResultLabel = (forecastType, value) => {
  switch (forecastType) {
    case 'precipitation':
      return getPrecipitationLabel(value);

    case 'temperature':
      return getTemperatureLabel(value);

    default:
      return null;
  }
};
