import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getInvitationsByUser } from '../../pages/user/organizations/invites-information/utils/getInvites';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  invitesUser: [],
  filteredInvitesUser: [],
  page: 0,
  order: 'desc',
  orderBy: 'createdAt',
  filterName: '',
  rowsPerPage: 5,
};

// Reject user's request to join organization
export const rejectUserRequest = createAsyncThunk('userCooperatives/reject', async ({data,id}, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  // dispatch(startLoading());
  try {
    await axios.put(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/userCooperatives/${id}`, data);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getInvitationsByUser(user.id));
});
// Approve user's request to join organization
export const approveUserRequest = createAsyncThunk('userCooperatives/reject', async ({data,id, requestInfo}, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  // dispatch(startLoading());
  try {
    // Updating the request
    await axios.put(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/userCooperatives/${id}`, data);
    // Adding the user to the cooperative
    const dataToPost = {
      id: requestInfo.coop.id,
      userId: user.id
    };
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/users/addUser`,dataToPost); 

  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getInvitationsByUser(user.id));
});

const slice = createSlice({
  name: 'invitesUserSlice',
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
    getInvitesSuccessUser(state, action) {
      state.isLoading = false;
      state.invitesUser = action.payload.invites;
      state.filteredInvitesUser = action.payload.invites;
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
  getInvitesSuccessUser,
  handleChangeRowsPerPage,
  hasError,
  handleFilterByName,
  handleRequestSort,
  setPage,
} = slice.actions;
// -----------------------------------