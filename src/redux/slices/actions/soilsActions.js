import { createAsyncThunk } from '@reduxjs/toolkit';
import { hasError, startLoading } from '../records';
import axios from 'axios';
import { getSoils } from '../../../pages/user/records/utils/getSoils';

export const addSoils = createAsyncThunk('soils/add', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/soils`, data, {headers: {
      'Content-Type': 'multipart/form-data'
    }});
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getSoils(user.id));
});
export const editSoils = createAsyncThunk('soils/edit', async ({ data, soilsId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/soils/${soilsId}`, data, {headers: {
      'Content-Type': 'multipart/form-data'
    }});
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getSoils(user.id));
});
export const deleteSoils = createAsyncThunk('soils/delete', async (soilsId, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/soils/${soilsId}`);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getSoils(user.id));
});
