import { createAsyncThunk } from '@reduxjs/toolkit';
import { hasError, startLoading } from '../records';
import axios from 'axios';
import { getAgrochemical } from '../../../pages/user/records/utils/getAgrochemical';

export const addAgrochemical = createAsyncThunk('agrochemicals/add', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/agrochemicals`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getAgrochemical(user.id));
});
export const editAgrochemical = createAsyncThunk('agrochemicals/edit', async ({ data, agrochemicalId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/agrochemicals/${agrochemicalId}`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getAgrochemical(user.id));
});
export const deleteAgrochemical = createAsyncThunk('agrochemicals/delete', async (agrochemicalId, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/agrochemicals/${agrochemicalId}`);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getAgrochemical(user.id));
});
