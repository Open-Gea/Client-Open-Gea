import { createAsyncThunk } from '@reduxjs/toolkit';
import { hasError, startLoading } from '../records';
import axios from 'axios';
import { getProdInfo } from '../../../pages/user/records/utils/getProdInfo';

export const addProdInfo = createAsyncThunk('prodInfo/add', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/prodInfo`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getProdInfo(user.id));
});
export const editProdInfo = createAsyncThunk('prodInfo/edit', async ({ data, prodInfoId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/prodInfo/${prodInfoId}`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getProdInfo(user.id));
});
export const deleteProdInfo = createAsyncThunk('prodInfo/delete', async (prodInfoId, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/prodInfo/${prodInfoId}`);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getProdInfo(user.id));
});
