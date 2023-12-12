import { createAsyncThunk } from '@reduxjs/toolkit';
import { hasError, startLoading } from '../records';
import axios from 'axios';
import { getBioInputs } from '../../../pages/user/records/utils/getBioInputs';

export const addBioInputs = createAsyncThunk('bioInputs/add', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/bioInputs`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getBioInputs(user.id));
});
export const editBioInputs = createAsyncThunk('bioInputs/edit', async ({ data, bioInputsId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/bioInputs/${bioInputsId}`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getBioInputs(user.id));
});
export const deleteBioInputs = createAsyncThunk('bioInputs/delete', async (bioInputsId, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    console.log(bioInputsId);
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/bioInputs/${bioInputsId}`);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getBioInputs(user.id));
});
