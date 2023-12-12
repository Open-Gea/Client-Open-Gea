import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasError: false,
  isLoadingFarms: false,
  isLoadingDates: false,
  isLoadingForecast: false,
  forecastType: '',
  timeRange: '',
  availableDates: [
    {
      rt: null,
      t: null,
    },
  ],
};

export const seasonalForecast = createSlice({
  name: 'seasonalForecast',
  initialState,
  reducers: {
    // forecast loading status
    startLoadingForecast: state => {
      state.isLoadingForecast = true;
    },
    finishLoadingForecast: state => {
      state.isLoadingForecast = false;
    },
    // farm loading status
    startLoadingFarms: state => {
      state.isLoadingFarms = true;
    },
    finishLoadingFarms: state => {
      state.isLoadingForecast = false;
    },
    // dates loading status
    startLoadingDates: state => {
      state.isLoadingDates = true;
    },
    finishLoadingDates: state => {
      state.isLoadingDates = false;
    },
    // forecast info
    setForecastType: (state, { payload }) => {
      // 'temperature', 'precipitation'
      state.forecastType = payload;
    },
    setTimeRange: (state, { payload }) => {
      // 'quarterly', 'monthly', 'weekly'
      state.timeRange = payload;
    },
    setAvailableDates: (state, { payload }) => {
      // payload: [{ rt: Number, t: Number }]
      state.availableDates = payload;
    },
    // error management
    enableError: state => {
      state.hasError = true;
    },
    cleanError: state => {
      state.hasError = false;
    },
    // module cleanup
    cleanSeasonalForecast: state => {
      state.hasError = initialState.hasError;
      state.isLoadingFarms = initialState.isLoadingFarms;
      state.isLoadingDates = initialState.isLoadingDates;
      state.isLoadingForecast = initialState.isLoadingForecast;
      state.forecastType = initialState.forecastType;
      state.timeRange = initialState.timeRange;
      state.availableDates = initialState.availableDates;
    },
  },
});

export const {
  startLoadingFarms,
  finishLoadingFarms,
  startLoadingForecast,
  finishLoadingForecast,
  startLoadingDates,
  finishLoadingDates,
  setAvailableDates,
  cleanSeasonalForecast,
  setForecastType,
  setTimeRange,
  enableError,
  cleanError,
} = seasonalForecast.actions;

export default seasonalForecast.reducer;
