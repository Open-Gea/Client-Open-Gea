import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRequestsByUser } from '../../pages/user/organizations/requests-information/utils/getRequests';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  requests: [],
  filteredRequests: [],
  page: 0,
  order: 'desc',
  orderBy: 'createdAt',
  filterName: '',
  rowsPerPage: 5,
};

export const getCooperativeByEmail = createAsyncThunk('cooperatives/email', async ({ email }) => {
    try {
      // Bringing the information of the cooperative based on the email address
      const responseRequests =  await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/email/${email}`);
      const cooperative = responseRequests.data;
      return cooperative;
    } catch (error) {
      return Promise.reject(error);
    }
});
export const addRequest= createAsyncThunk('invite/add', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/userCooperatives`,data);
  } catch (error) {
    dispatch(hasError(error));
  }
  await dispatch(getRequestsByUser(user.id));
});
// Delete user's request to join organization
export const deleteUserRequest = createAsyncThunk('userCooperatives/delete', async (id, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/userCooperatives/${id}`);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getRequestsByUser(user.id));
});

const slice = createSlice({
  name: 'requestsUserSlice',
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
    getRequestsSuccess(state, action) {
      state.isLoading = false;
      state.requests = action.payload.requests;
      state.filteredRequests = action.payload.requests;
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
  getRequestsSuccess,
  handleChangeRowsPerPage,
  hasError,
  handleFilterByName,
  handleRequestSort,
  setPage,
} = slice.actions;
// -----------------------------------