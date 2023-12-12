import { format } from 'date-fns';
import capitalize from 'lodash.capitalize';
import { metricLabel } from './unitFormats';
import { t } from 'i18next';

const ns = "weather-forecast";

const getPrecipitationTypeLabel = (type = '') => {
  switch (type) {
    case 'rain':
      return t('precipitationTypes.rain', { ns });
    case 'snow':
      return t('precipitationTypes.snow', { ns });
    case 'precip': // any type of precipitation
      return t('precipitationTypes.generic', { ns });
    default:
      return t('precipitationTypes.unknown', { ns });
  }
};

const addUnitLabelsToForecastData = forecastData => {
  // copies original object and prevents mutation.
  const formattedForecastData = { ...forecastData };

  for (const property in formattedForecastData) {
    // Not all properties need labels, so we need to check for those which are present on the units object.
    // Also ignores properties with null values.
    if (metricLabel[property] !== undefined && formattedForecastData[property] !== null) {
      // if a label is found, it will concatenate it to the object's value.
      formattedForecastData[property] = `${formattedForecastData[property]} ${metricLabel[property]}`;
    }
  }

  return formattedForecastData;
};

// For reusability purposes, ForecastCard.jsx reads the values via an array, so we can loop through and render them.
export const mapForecastToBulletPoints = forecastData => {
  if (!forecastData) return null;

  const forecastWithLabels = addUnitLabelsToForecastData(forecastData);

  const {
    wxPhraseLong,
    uvIndex,
    cloudCover,
    temperature,
    temperatureFeelsLike,
    precipChance,
    precipType,
    qpf,
    relativeHumidity,
    pressureMeanSeaLevel,
    windDirectionCardinal,
    windSpeed,
  } = forecastWithLabels;

  return {
    summary: [
      { title: t('forecastSummary.status', { ns }), value: wxPhraseLong },
      { title: t('forecastSummary.uvIndex', { ns }), value: uvIndex },
      { title: t('forecastSummary.cloudCover', { ns }), value: cloudCover },
    ],
    temperature: [
      { title: t('forecastTemperature.temperature', { ns }), value: temperature },
      { title: t('forecastTemperature.temperatureFeelsLike', { ns }), value: temperatureFeelsLike || '[-]' }, // nullable value
    ],
    rain: [
      { title: t('forecastRain.precipChance', { ns }), value: `${precipChance} (${getPrecipitationTypeLabel(precipType)})` },
      { title: t('forecastRain.pp', { ns }), value: qpf },
    ],
    humidity: [
      { title: t('forecastHumidity.relativeHumidity', { ns }), value: relativeHumidity },
      { title: t('forecastHumidity.pressureMeanSeaLevel', { ns }), value: pressureMeanSeaLevel },
    ],
    wind: [
      { title: t('forecastWind.windSpeed', { ns }), value: windSpeed },
      { title: t('forecastWind.windDirectionCardinal', { ns }), value: windDirectionCardinal },
    ],
  };
};

export const mapNextDaysForecast = nextDaysSummary => {
  if (!nextDaysSummary) return null;

  const mappedSummary = nextDaysSummary.map(summaryDay => {
    const nextDaysForecastWithLabels = addUnitLabelsToForecastData(summaryDay);

    const { validTimeLocal, iconCode, wxPhraseLong, temperatureMin, temperatureMax, qpf } = nextDaysForecastWithLabels;

    return {
      formattedDate: capitalize(format(new Date(validTimeLocal), 'iii dd MMM')),
      iconCode,
      temperatureMin,
      temperatureMax,
      altText: wxPhraseLong,
      pp: `(${qpf})`,
    };
  });

  return mappedSummary;
};

// Returns a formatted icon filename to be used for weather forecast icon.
export const getIconFilename = iconCode => {
  // Note: 'na.svg' is the default icon, when there's no image available.
  if (!iconCode || isNaN(iconCode)) return 'na.svg';
  // For numbers lower than 10, it adds an extra 0 to the left.
  if (iconCode < 10) return `0${iconCode}.svg`;

  // if none of the conditions are met, it will just return the code with the file extension.
  return `${iconCode}.svg`;
};
