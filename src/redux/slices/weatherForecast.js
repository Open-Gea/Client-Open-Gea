import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingFarms: false,
  isLoadingForecast: false,
  hasError: null,
  forecastList: [
    // {
    //   farmId: '123',
    //   date: null
    //   name: '',
    //   location: '',
    //   isSelected: false,
    //   forecastDetails: { ...[], nextDaysForecast: [] },
    // },
  ],
};

export const weatherForecast = createSlice({
  name: 'weatherForecast',
  initialState,
  reducers: {
    startLoadingForecast: state => {
      state.isLoadingForecast = true;
    },
    finishLoadingForecast: state => {
      state.isLoadingForecast = false;
    },
    startLoadingFarms: state => {
      state.isLoadingFarms = true;
    },
    finishLoadingFarms: state => {
      state.isLoadingFarms = false;
    },
    mapFarmsToForecast: (state, { payload }) => {
      // payload: [{ farmId, name, location }]
      state.forecastList = payload.map(farm => ({
        farmId: farm.farmId,
        date: null,
        name: farm.name,
        location: farm.location,
        isSelected: false,
        forecastDetails: {},
        nextDaysForecast: [],
      }));
      state.isLoadingFarms = false;
      // state.forecastList[0].isSelected = true; // Marks first farm as selected (for usability purposes).
    },
    setWeatherForecastByFarmId: (state, { payload }) => {
      // payload: { farmId, hourlyForecast, dailyForecast }
      state.forecastList = state.forecastList.map(farmData => {
        if (farmData.farmId === payload.farmId) {
          return { ...farmData, forecastDetails: payload.hourlyForecast, nextDaysForecast: payload.dailyForecast, };
        }
        return farmData;
      });
    },
    setFarmSelectionStatus: (state, { payload }) => {
      // payload: { farmId, isSelected }
      state.forecastList = state.forecastList.map(farmData => {
        if (farmData.farmId === payload.farmId) {
          return { ...farmData, isSelected: payload.isSelected };
        }
        return farmData;
      });
    },
    clearWeatherForecast: state => {
      state.forecastList = state.forecastList.map(farmData => ({
        ...farmData,
        date: null,
        isSelected: false,
        forecastDetails: {},
      }));
    },
  },
});

export const {
  startLoadingFarms,
  finishLoadingFarms,
  mapFarmsToForecast,
  setWeatherForecastByFarmId,
  setFarmSelectionStatus,
  clearWeatherForecast,
  startLoadingForecast,
  finishLoadingForecast,
} = weatherForecast.actions;

export default weatherForecast.reducer;
