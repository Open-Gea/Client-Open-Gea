import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getFarmsByCooperative } from '../../pages/cooperative/my-farms/carboon-footprint/utils/getFarmsCarbon';

// ----------------------------------------------------------------------
/* eslint-disable camelcase */

const initialState = {
    isLoading: false,
    error: false,
    farms: [],
    allCalcs: [],
    farmCalcs: [],
    emissions: [],
};

export const deleteCalc = createAsyncThunk('calcs/delete', async (data, { dispatch, getState }) => {
    
    console.log('Deleting CALCULATED');
    const { cooperative } = getState().authSlice;
    dispatch(startLoading());
    try {
      await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/carbonFootPrint/${data.id}`);
      await dispatch(getFarmsByCooperative(cooperative.id));
      dispatch(setCalc(data.farmId, false));
    } catch (error) {
      dispatch(hasError(error.code));
    }finally {
      dispatch(stopLoading());
      
    }
   
});

const slice = createSlice({
  name: 'huellasCarbonoCooperativaSlice',
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
    setEmissions(state, action) {
        state.emissions = action.payload;
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
  },
});

// Reducer
export default slice.reducer;
export const { startLoading, stopLoading, getFarmsEvoSuccess, updateFarmCalc, setEmissions, hasError, } = slice.actions;
// -----------------------------------

export const setCalc =
  (id, year, finishLoad = true) =>
  (dispatch, getState) => {
    console.log('Get State ',getState());
    console.log('Setting Calc: '+year);
    const { farms } = getState().huellasCarbonoCooperativaSlice;
    const farmCalc = farms.find(farm => farm.id === id).calc;
    dispatch(slice.actions.startLoading());
    // setTimeout(() => {
    dispatch(slice.actions.setFarmsCalc(farmCalc));
    // }, 1000);
    if (finishLoad) dispatch(slice.actions.stopLoading());
  };