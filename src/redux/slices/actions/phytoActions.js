import { createAsyncThunk } from '@reduxjs/toolkit';
import { hasError, startLoading } from '../records';
import axios from 'axios';
import { getPhyto } from '../../../pages/user/records/utils/getPhyto';

export const addPhyto = createAsyncThunk('phyto/add', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/phyto`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getPhyto(user.id));
});
export const editPhyto = createAsyncThunk('phyto/edit', async ({ data, phytoId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/phyto/${phytoId}`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getPhyto(user.id));
});
export const deletePhyto = createAsyncThunk('phyto/delete', async (phytoId, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/phyto/${phytoId}`);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getPhyto(user.id));
});
