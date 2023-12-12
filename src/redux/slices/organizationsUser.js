import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrganizationsByUser } from '../../pages/user/organizations/my-organizations/utils/getOrganizations';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  organizations: [],
  filteredOrganizations: [],
  page: 0,
  order: 'desc',
  orderBy: 'name',
  filterName: '',
  rowsPerPage: 5,
};

// Remove user from cooperative using cooperative_user id 
export const removeUserFromCooperative = createAsyncThunk('users/delete', async (id, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/users/${id}`);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getOrganizationsByUser(user.id));
});

const slice = createSlice({
  name: 'organizationsUserSlice',
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
    getOrganizationsSuccessUser(state, action) {
      state.isLoading = false;
      state.organizations = action.payload.organizations;
      state.filteredOrganizations = action.payload.organizations;
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
  },
});

// Reducer
export default slice.reducer;
export const {
  startLoading,
  getOrganizationsSuccessUser,
  handleChangeRowsPerPage,
  hasError,
  handleFilterByName,
  handleRequestSort,
  setPage,
} = slice.actions;
// -----------------------------------