import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFarms } from '../../pages/user/farms/utils/getFarms';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  farms: [],
  countries: [],
  filteredFarms: [],
  page: 0,
  order: 'asc',
  orderBy: 'name',
  filterName: '',
  rowsPerPage: 5,
  filterCountry: 'All',
};

export const addFarm = createAsyncThunk('farms/add', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms`,data,{headers: {
      'Content-Type': 'multipart/form-data'
    }});
  } catch (error) {
    dispatch(hasError(error));
  }
  await dispatch(getFarms(user.id));
});
export const editFarm = createAsyncThunk('farms/edit', async ({ data, id }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try { 
    await axios.put(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms/${id}`, data,{headers: {
      'Content-Type': 'multipart/form-data'
    }});
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getFarms(user.id));
});
export const deleteFarm = createAsyncThunk('farms/delete', async (id, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms/${id}`);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getFarms(user.id));
});

const slice = createSlice({
  name: 'farmSlice',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getFarmsSuccess(state, action) {
      state.isLoading = false;
      state.farms = action.payload.farms;
      state.filteredFarms = action.payload.farms;
      state.countries = action.payload.uniqueCountries;
      state.error = null;
    },
    handleRequestSort(state, action) {
      const isAsc = state.orderBy === action.payload && state.order === 'asc';
      state.order = isAsc ? 'desc' : 'asc';
      state.property = action.payload;
      state.orderBy = action.payload;
    },
    handleChangeRowsPerPage(state, action) {
      console.log(state, action);
      state.rowsPerPage = parseInt(action.payload);
    },
    handleFilterByName(state, action) {
      state.filterName = action.payload;
      state.page = 0;
    },

    setPage(state, action) {
      state.page = action.payload;
    },
    setFilteredFarms(state, action) {
      if (action.payload.param) {
        state.filteredFarms = action.payload.list;
        state.filterCountry = action.payload.param;
      }
    },
    resetFilteredFarms(state) {
      state.filteredFarms = state.farms;
      state.filterCountry = 'All';
    },
  },
});

// Reducer
export default slice.reducer;
export const {
  startLoading,
  getFarmsSuccess,
  handleChangeRowsPerPage,
  hasError,
  handleFilterByName,
  handleRequestSort,
  setPage,
  setFilteredFarms,
  resetFilteredFarms,
} = slice.actions;
// -----------------------------------
