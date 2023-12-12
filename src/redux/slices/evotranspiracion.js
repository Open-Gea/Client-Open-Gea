import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getFarmsEvo } from '../../pages/user/evapotranspiration/utils/getFarmsEvo';

// ----------------------------------------------------------------------
/* eslint-disable camelcase */

const initialState = {
  isLoading: false,
  error: false,
  farms: [],
  allCalcs: [],
  farmCalcs: [],
  products: [],
  hhResults: { isOpen: false, data: {} },
};

export const updateCalc = createAsyncThunk('calcs/newCalc', async (data, { dispatch, getState }) => {
  dispatch(startLoading());
  const { user } = getState().authSlice;
  let evotranspiration;

  const formatDate = date => {
    return new Date(date)
      .toLocaleDateString('es-ES')
      .split('/')
      .map(el => {
        if (el.length < 2) return '0' + el;
        else return el;
      })
      .reverse()
      .join('-');
  };

  const { id, name, category, crop_kc, crop_stages } = data.product;
  const { fechaSiembra, fechaCocecha, toneladas, hectareas } = data.calc.detail;

  try {
    const calcParams = {
      georef: data.georef,
      crop: {
        Name: name.toLowerCase().trim(),
        Category: category.toLowerCase().trim(),
        start: formatDate(fechaSiembra),
        end: formatDate(fechaCocecha),
      },
      crop_stages,
      crop_kc,
      tons: toneladas,
      hectares: hectareas,
    };
    console.log('calcParams',calcParams.crop);
    const response = await axios.post(
      `${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/waterFootPrint/calculate`,
      calcParams
    );
    evotranspiration = response.data;

    if (!evotranspiration.hh_total) throw new Error('errHHReults');
  } catch (error) {
    if (!error.code) {
      dispatch(hasError(error.message));
    } else {
      dispatch(hasError(error.code));
    }
    return Promise.reject(error);
  }
  try {
    const evaluationData = {
      user: { id: user.id },
      farm: { id: data.id },
      evotranspiration,
      registerDate: formatDate(data.calc.fecha),
      startDate: formatDate(fechaSiembra),
      endDate: formatDate(fechaCocecha),
      hectares: hectareas,
      tons: toneladas,
      score: 100,
      status: 'APPROVED',
      product: { id },
    };
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/evaluation/`, evaluationData);
    await dispatch(getFarmsEvo(user.id, false));
    dispatch(setCalc(data.id, false));
    dispatch(setHhResults({ open: true, data: evotranspiration }));
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    dispatch(stopLoading());
  }
});

const slice = createSlice({
  name: 'evotranspiracionSlice',
  initialState,
  reducers: {
    // LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.farms = [];
      state.farmCalcs = [];
    },
    getFarmsEvoSuccess(state, action) {
      state.farms = action.payload.farms;
      state.error = null;
    },
    setFarmsCalc(state, action) {
      state.farmCalcs = action.payload;
    },
    updateFarmCalc(state, action) {
      state.farms = state.farms.map(farm => {
        if (farm.id === action.payload.id) {
          return {
            ...farm,
            calc: [...farm.calc, action.payload.calc],
          };
        }
        return farm;
      });
    },
    setHhResults(state, action) {
      state.hhResults = {
        isOpen: action.payload.open,
        data: action.payload.data ? action.payload.data : state.hhResults.data,
        isLoading: false,
      };
    },

    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
export const { startLoading, stopLoading, getFarmsEvoSuccess, updateFarmCalc, setProducts, hasError, setHhResults } = slice.actions;
// -----------------------------------

export const setCalc =
  (id, finishLoad = true) =>
  (dispatch, getState) => {
    const { farms } = getState().evotranspiracionSlice;
    const farmCalc = farms.find(farm => farm.id === id).calc;
    dispatch(slice.actions.startLoading());
    dispatch(slice.actions.setFarmsCalc(farmCalc));
    if (finishLoad) dispatch(slice.actions.stopLoading());
  };
