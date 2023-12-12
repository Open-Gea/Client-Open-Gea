import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getInvitesByCooperative } from '../../pages/cooperative/members-management/invites-information/utils/getInvites';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  invites: [],
  filteredInvites: [],
  page: 0,
  order: 'desc',
  orderBy: 'createdAt',
  filterName: '',
  rowsPerPage: 5,
};

export const getUserByEmail = createAsyncThunk('users/email', async ({ email, isCoop = false }) => {
    try {
      // Bringing the information of the user based on the email address
      const responseInvites = !isCoop ? 
        await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/users/email/${email}`) :
        await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/email/${email}`)
      const user = responseInvites.data;
      return user;
    } catch (error) {
      return Promise.reject(error);
    }
});
export const addInvite= createAsyncThunk('invite/add', async (data, { dispatch, getState }) => {
  const { cooperative } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/userCooperatives`,data);
  } catch (error) {
    dispatch(hasError(error));
  }
  await dispatch(getInvitesByCooperative(cooperative.id));
});
// Delete cooperative's invite to join organization
export const deleteCooperativeInvite = createAsyncThunk('userCooperatives/delete', async (id, { dispatch, getState }) => {
  const { cooperative } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/userCooperatives/${id}`);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getInvitesByCooperative(cooperative.id));
});

const slice = createSlice({
  name: 'invitesCooperativaSlice',
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
    getInvitesSuccess(state, action) {
      state.isLoading = false;
      state.invites = action.payload.invites;
      state.filteredInvites = action.payload.invites;
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
  getInvitesSuccess,
  handleChangeRowsPerPage,
  hasError,
  handleFilterByName,
  handleRequestSort,
  setPage,
} = slice.actions;
// -----------------------------------