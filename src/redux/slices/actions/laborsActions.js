import { createAsyncThunk } from '@reduxjs/toolkit';
import { hasError, startLoading } from '../records';
import axios from 'axios';
import { getLabors } from '../../../pages/user/records/utils/getLabors';

export const addLabors = createAsyncThunk('labors/add', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/labors`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getLabors(user.id));
});
export const editLabors = createAsyncThunk('labors/edit', async ({ data, laborsId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/labors/${laborsId}`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getLabors(user.id));
});
export const deleteLabors = createAsyncThunk('labors/delete', async (laborsId, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/labors/${laborsId}`);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getLabors(user.id));
});
