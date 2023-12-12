import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getListCountries } from '../../pages/admin/administration/countriesInformation/utils/getCountries';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  countries: [],
  officialCountries: [],
  filteredCountries: [],
  page: 0,
  order: 'asc',
  orderBy: 'name',
  filterName: '',
  rowsPerPage: 5,
};

export const addCountry = createAsyncThunk('country/add', async (data, { dispatch, getState }) => {
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/countries`,data);
  } catch (error) {
    dispatch(hasError(error));
  }
  await dispatch(getListCountries());
});
export const editCountry = createAsyncThunk('country/edit', async ({ data, id }, { dispatch, getState }) => {
  dispatch(startLoading());
  try { 
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/countries/${id}`, data);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getListCountries());
});
export const deleteCountry = createAsyncThunk('country/delete', async (id, { dispatch, getState }) => {
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/countries/${id}`);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getListCountries());
});

const slice = createSlice({
  name: 'countriesAdminSlice',
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
    getCountriesSuccess(state, action) {
      state.isLoading = false;
      state.countries = action.payload.countries;
      state.filteredCountries = action.payload.countries;
      state.error = null;
    },
    getOfficialCountriesSuccess(state, action) {
      state.isLoading = false;
      state.officialCountries = action.payload.officialCountries;
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
    setFilteredCountries(state, action) {
      if (action.payload.param) {
        state.filteredCountries = action.payload.list;
      }
    },
    resetFilteredCountries(state) {
      state.filteredCountries = state.countries;
    },
  },
});

// Reducer
export default slice.reducer;
export const {
  startLoading,
  getCountriesSuccess,
  handleChangeRowsPerPage,
  hasError,
  handleFilterByName,
  handleRequestSort,
  setPage,
  setFilteredCountries,
  resetFilteredCountries,
  getOfficialCountriesSuccess
} = slice.actions;
// -----------------------------------
