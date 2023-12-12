import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getFarmsCarbon } from '../../pages/user/carbon-footprint/utils/getFarmsCarbon';

// ----------------------------------------------------------------------
/* eslint-disable camelcase */

const initialState = {
  isLoading: false,
  error: false,
  farms: [],
  allCalcs: [],
  farmCalcs: [],
  emissions: [],
  hhResults: { isOpen: false, data: {} },
};

export const updateCalc = createAsyncThunk('calcs/newCalc', async (data, { dispatch, getState }) => {
  dispatch(startLoading());
  const { user } = getState().authSlice;
  let huellaCarbono;

  const { farmId  } = data;
  const { consumo, factor,año,aplication_rate,porcentaje} = data.calc; 
  const {wet_rate, nitrogen_rate} = data.calc.optionalData;
  factor.optionalData = {
    wet_rate,
    nitrogen_rate,
    porcentaje,
    aplication_rate
  }
  try {
    const calcParams = {
      farmId,
      factor,
      consumo,
      año
    };
    const response = await axios.post(
      `${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/carbonFootPrint`,
      calcParams
    );
    huellaCarbono = response.data;
    if (!huellaCarbono) throw new Error('errHHReults');
    await dispatch(getFarmsCarbon(user.id, false));
    dispatch(setCalc(farmId, false));
    //dispatch(setHhResults({ open: true, data: huellaCarbono }));
    return huellaCarbono;
  } catch (error) {
    if (!error.code) {
      dispatch(hasError(error.message));
    } else {
      dispatch(hasError(error.code));
    }
    return Promise.reject(error);
  }finally {
    dispatch(stopLoading());
    
  }
});
export const deleteCalc = createAsyncThunk('calcs/delete', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/carbonFootPrint/${data.id}`);
    await dispatch(getFarmsCarbon(user.id));
    dispatch(setCalc(data.farmId, false));
  } catch (error) {
    dispatch(hasError(error.code));
  }finally {
    dispatch(stopLoading());
    
  }
 
});


const slice = createSlice({
  name: 'huellaCarbonoSlice',
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

    setEmissions(state, action) {
      state.emissions = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
export const { startLoading, stopLoading, getFarmsEvoSuccess, updateFarmCalc, setEmissions, hasError, setHhResults } = slice.actions;
// -----------------------------------

export const setCalc =
  (id, finishLoad = true) =>
  (dispatch, getState) => {
    const { farms } = getState().huellaCarbonoSlice;
    const farmCalc = farms.find(farm => farm.id === id).calc;
    dispatch(slice.actions.startLoading());
    // setTimeout(() => {
    dispatch(slice.actions.setFarmsCalc(farmCalc));
    // }, 1000);
    if (finishLoad) dispatch(slice.actions.stopLoading());
  };
