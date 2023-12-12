import { useDispatch, useSelector } from 'react-redux';
import {
  startLoadingForecast,
  finishLoadingForecast,
  setAvailableDates,
  setForecastType,
  setTimeRange,
  startLoadingDates,
  finishLoadingDates,
  enableError,
  cleanError,
  cleanSeasonalForecast,
} from '../../../../redux/slices/seasonalForecast';
import { getFarms } from '../../farms/utils/getFarms';
import { fetchAvailableDates, getDateLabelBySelectedRange, fetchSelectedForecast } from '../helpers';

export const useSeasonalForecast = () => {
  const dispatch = useDispatch();
  const {
    availableDates = [],
    forecastType,
    timeRange,
    isLoadingDates,
    isLoadingForecast,
    isLoadingFarms,
    hasError,
  } = useSelector(state => state.seasonalForecast) || [];
  const { user } = useSelector(s => s.authSlice);

  // TODO: create a universal selector/helper for this info, since it is being used for multiple modules??
  const { farms = [] } = useSelector(state => state.farmSlice);

  // Filters selected farms and maps the info to be used on Select input form.
  const mappedFarms = farms.map(farm => ({ farmId: farm.id, name: farm.name, lat: farm.lat, lng: farm.lng })) || [];

  // Called when component mounts
  const preloadFarmData = () => {
    // If there are no farms, there could be two possibilites: info is not loaded, or the user has no saved farms.
    // First, it will load the info just in case the user hasn't opened the farms module.
    // if the data is loaded and there are no saved farms, nothing will be mapped.
    if (farms.length === 0) {
      dispatch(getFarms(user?.id));
    }
  };

  // Maps a list of possible dates for the form
  const getDropdownDates = () => {
    if (!forecastType || !timeRange) return [];
    return availableDates.map((date, index) => ({
      id: `${date.rt}-${date.t}-${index}`,
      rt: date.rt,
      t: date.t,
      label: getDateLabelBySelectedRange(timeRange, date.t),
    }));
  };

  // Called when user submits forecast form
  const getValidFormResult = async formData => {
    const { date, farmId, forecastType, timeRange } = formData;
    if (!forecastType || !timeRange || !date || !farmId) return null;

    dispatch(startLoadingForecast());

    // 'rt' and 't' values are concatenated in getDropdownDates() id value.
    const [rt, t] = date.split('-');
    const { lat, lng } = farms.find(farm => farm.id === farmId);

    const forecastData = await fetchSelectedForecast(forecastType, timeRange, lat, lng, rt, t);
    if (!forecastData) {
      dispatch(enableError());
      dispatch(finishLoadingForecast());
      return null;
    }

    dispatch(cleanError());
    dispatch(finishLoadingForecast());
    return { farmId, forecastType, timeRange, lat, lng, seasonalData: forecastData };
  };

  // Called when user selected both forecastType and timeRange, this loads a list of
  // all the possible dates for the given selection.
  const loadAvailableDates = async (selectedForecastType, selectedTimeRange) => {
    if (!selectedForecastType || !selectedTimeRange) return;

    dispatch(startLoadingDates());
    dispatch(setForecastType(selectedForecastType));
    dispatch(setTimeRange(selectedTimeRange));

    const availableDates = await fetchAvailableDates(selectedForecastType, selectedTimeRange);
    if (!availableDates) {
      dispatch(enableError());
      dispatch(finishLoadingDates());
      return null;
    }

    dispatch(cleanError());
    dispatch(setAvailableDates(availableDates));
    dispatch(finishLoadingDates());
  };

  // Called when module unmounts
  const clearForecastModule = () => {
    dispatch(cleanSeasonalForecast());
  };


  return {
    preloadFarmData,
    getDropdownDates,
    getValidFormResult,
    loadAvailableDates,
    clearForecastModule,
    availableDates,
    mappedFarms,
    isLoadingDates,
    isLoadingForecast,
    isLoadingFarms,
    hasError,
  };
};
