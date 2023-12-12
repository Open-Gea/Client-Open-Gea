// TODO: migrate these calls to the backend.

import axios from 'axios';
import { getTWCForecastType } from './getTWCForecastTypes';

const baseUrl = `${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/seasonalForecast`;

// TODO: move this logic to an endpoint.
// Perhaps encasulate it to make it more readable?
// e.g: front end only passes forecastType and timeRange, instead of having to deal with
// twc long API products. Would make the code more easy to follow. I think this is important
// for this particular module due to complexity to understand flow.
export const fetchAvailableDates = async (forecastType = '', timeRange = '') => {
  const twcForecastType = getTWCForecastType(forecastType, timeRange);

  const [productNumber, productName] = twcForecastType.split(':');

  try {

    const params = {
      products: twcForecastType,
      meta: false,
    }
    const response = await axios.post(`${baseUrl}/info`, params);

    const data = response.data.layers[productNumber][productName].dimensions || null;

    // Only the first position is needed, since it is the lastest dataset available.
    const mappedResponse = data[0].t?.map(tData => ({
      rt: data[0].rt[0],
      t: tData
    }));
    return mappedResponse;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export const fetchSelectedForecast = async (forecastType = '', timeRange = '', lat, lon, rt, t) => {
  const twcForecastType = getTWCForecastType(forecastType, timeRange);

  try {

    const params = {
      products: twcForecastType,
      meta: false,
      lat,
      lon,
      rt,
      t,
      format: 'geojson',
      method: 'nearest',
    }

    const response = await axios.post(`${baseUrl}/point`, params);

    const data = response.data.features[0].properties;
    return data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
