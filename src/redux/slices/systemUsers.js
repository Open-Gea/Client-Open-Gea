import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../../pages/admin/administration/usersInformation/utils/getUsers';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  users: [],
  countries: [],
  filteredUsers: [],
  page: 0,
  order: 'asc',
  orderBy: 'displayName',
  filterName: '',
  rowsPerPage: 5,
  filterCountry: 'All',
  usersPerCountry: [],
  years: [],
  usersData:[],
  organizationsData:[],
  totalUsers: 0,
};

// Remove user's access to YvY
export const removeUserAccess = createAsyncThunk('admin/disable', async ({id}, { dispatch, getState }) => {
  // dispatch(startLoading());
  try {
    await axios.put(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/users/${id}/disable`);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getAllUsers('Farmer'));
});

// Remove organization's access to YvY
export const removeOrganizationAccess = createAsyncThunk('admin/disableOrganization', async ({id}, { dispatch, getState }) => {
  // dispatch(startLoading());
  try {
    await axios.put(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/cooperatives/${id}/disable`);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getAllUsers('Organization'));
});

// Give user's access to YvY
export const giveUserAccess = createAsyncThunk('admin/enable', async ({id}, { dispatch, getState }) => {
  // dispatch(startLoading());
  try {
    await axios.put(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/users/${id}/enable`);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getAllUsers('Farmer'));
});

// Give organization's access to YvY
export const giveOrganizationAccess = createAsyncThunk('admin/enableOrganization', async ({id}, { dispatch, getState }) => {
  // dispatch(startLoading());
  try {
    await axios.put(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/cooperatives/${id}/enable`);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getAllUsers('Organization'));
});



const slice = createSlice({
  name: 'systemUsersSlice',
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
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload.users;
      state.filteredUsers = action.payload.users;
      state.countries = action.payload.uniqueCountries;
      state.error = null;
    },
    getUsersPerCountrySuccess(state, action) {
      state.isLoading = false;
      state.usersPerCountry = action.payload.usersPerCountry;
      state.countries = action.payload.uniqueCountries;
      state.error = null;
    },
    getGraphData(state, action) {
      state.isLoading = false;
      state.years = action.payload.years;
      state.usersData = action.payload.usersData;
      state.organizationsData = action.payload.organizationsData;
      state.totalUsers = action.payload.totalUsers;
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
    setFilteredUsers(state, action) {
      if (action.payload.param) {
        state.filteredUsers = action.payload.list;
        state.filterCountry = action.payload.param;
      }
    },
    resetFilteredUsers(state) {
      state.filteredUsers = state.users;
      state.filterCountry = 'All';
    },
  },
});

// Reducer
export default slice.reducer;
export const {
  startLoading,
  getUsersSuccess,
  getUsersPerCountrySuccess,
  handleChangeRowsPerPage,
  hasError,
  handleFilterByName,
  handleRequestSort,
  setPage,
  setFilteredUsers,
  resetFilteredUsers,
  getGraphData,
} = slice.actions;
// -----------------------------------
