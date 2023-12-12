import axios from 'axios';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { format, set } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  mapFarmsToForecast,
  setFarmSelectionStatus,
  setWeatherForecastByFarmId,
  startLoadingForecast,
  finishLoadingForecast,
  clearWeatherForecast,
  startLoadingFarms,
  finishLoadingFarms,
} from '../../../../redux/slices/weatherForecast';
import { getFarms } from '../../farms/utils/getFarms';

const getEndpointUrl = (isoDatetime, farmId) => `${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/weatherForecast/daily/${isoDatetime}/${farmId}/${i18next.language}`;

export const useWeatherForecast = () => {
  const dispatch = useDispatch();
  const { t: tCommon } = useTranslation('common');
  const { forecastList, isLoadingForecast, isLoadingFarms } = useSelector(state => state.weatherForecast) || [];

  // TODO: create a universal selector/helper for this info, since it is being used for multiple modules??
  const { farms = [] } = useSelector(state => state.farmSlice);
  const { user } = useSelector(s => s.authSlice);

  // If all farms are selected, the system shouldn't allow to select another one.
  const shouldAllowNewFarmSelection = forecastList.some(farm => farm.isSelected === false);

  // Filters farms by their selection status.
  const selectedFarmList = forecastList.filter(farm => farm.isSelected === true) || [];

  // Filters selected farms and maps the info to be used on dropdowns (useful for enabling/disabling dropdown options on UI).
  const mappedFarmsForDropdown = forecastList.map(farm => ({ farmId: farm.farmId, name: farm.name, isSelected: farm.isSelected }));

  // Called the module mounts
  const preloadFarmData = () => {
    dispatch(startLoadingFarms());
    // If there are no farms, there could be two possibilites: info is not loaded, or the user has no saved farms.
    // First, it will load the info just in case the user hasn't opened the farms module.
    // if the data is loaded and there are no saved farms, it will stop the mapping.
    if (farms.length === 0) {
      dispatch(getFarms(user?.id));
    }

    const mappedFarms = farms.map(farm => ({ farmId: farm.id, name: farm.name, location: `${tCommon('coordinates.latitude')}: ${farm.lat}, ${tCommon('coordinates.longitude')}: ${farm.lng}` }));
    dispatch(mapFarmsToForecast(mappedFarms));
    dispatch(finishLoadingFarms());
  };

  // Called when module unmounts
  const cleanForecast = () => {
    dispatch(clearWeatherForecast());
  };

  // Refreshes a single forecast (useful when the user selects a new farm).
  const refreshForecastByFarmId = async (farmId, forecastDate) => {
    dispatch(startLoadingForecast());
    const cleanedDate = set(forecastDate, { minutes: 0, seconds: 0, milliseconds: 0 });
    const isoDatetime = format(cleanedDate, "yyyy-MM-dd'T'HH:mm:ssxxxx");

    try {
      // Note:
      // Hourly forecast: selected datetime.
      // Daily forecast: next days forecast carousel.
      const response = await axios.get(getEndpointUrl(isoDatetime, farmId));

      const hourlyForecast = response.data.hourlyForecast?.length > 0 ? response.data.hourlyForecast[0] : {};
      const dailyForecast = response.data.dailyForecast?.length > 0 ? response.data.dailyForecast : {};

      dispatch(setWeatherForecastByFarmId({ farmId, hourlyForecast, dailyForecast }));
      dispatch(finishLoadingForecast());
    } catch (error) {
      console.log('Forecast error: ', error);
      dispatch(finishLoadingForecast());
    }
  };

  // Refreshes all available forecasts (useful when the user has selected some farms already, and changes the date).
  const refreshAllForecasts = async forecastDate => {
    if (!forecastDate) return null;

    dispatch(startLoadingForecast());

    const cleanedDate = set(forecastDate, { minutes: 0, seconds: 0, milliseconds: 0 });
    const isoDatetime = format(cleanedDate, "yyyy-MM-dd'T'HH:mm:ssxxxx");

    try {
      const mappedFarms = selectedFarmList.map(farm => ({
        farmId: farm.farmId,
        url: getEndpointUrl(isoDatetime, farm.farmId),
      }));

      const promises = mappedFarms.map(farmMap => axios.get(farmMap.url));
      const responses = await Promise.allSettled(promises);

      responses.forEach((response, index) => {
        if (response.status === 'fulfilled') {
          const hourlyForecast = response.value.data.hourlyForecast?.length > 0 ? response.value.data.hourlyForecast[0] : {};
          const dailyForecast = response.value.data.dailyForecast?.length > 0 ? response.value.data.dailyForecast : {};
          dispatch(setWeatherForecastByFarmId({ farmId: mappedFarms[index].farmId, hourlyForecast, dailyForecast }));
        }
      });

      dispatch(finishLoadingForecast());
    } catch (error) {
      console.log('Forecast error: ', error);
      dispatch(finishLoadingForecast());
    }
  };

  // Adds a farm to the selection list
  const changeFarmStatusToSelected = (farmId = '') => {
    dispatch(setFarmSelectionStatus({ farmId, isSelected: true }));
  };

  // Removes a farm from the selection list
  const changeFarmStatusToUnselected = (farmId = '') => {
    dispatch(setFarmSelectionStatus({ farmId, isSelected: false }));
  };

  return {
    preloadFarmData,
    changeFarmStatusToSelected,
    changeFarmStatusToUnselected,
    refreshForecastByFarmId,
    refreshAllForecasts,
    cleanForecast,
    shouldAllowNewFarmSelection,
    forecastList,
    mappedFarmsForDropdown,
    selectedFarmList,
    isLoadingForecast,
    isLoadingFarms,
  };
};
