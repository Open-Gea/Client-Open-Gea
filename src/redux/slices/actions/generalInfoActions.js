import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleCurrentLots, hasError, startLoading } from '../records';
import axios from 'axios';
import { getFarmsRecords } from '../../../pages/user/records/utils/getFarmsRecords';

export const addGeneralInfo = createAsyncThunk('generalInfo/add', async ({ data, farmId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/generalInfo?farmId:${farmId}`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getFarmsRecords(user.id));
  dispatch(handleCurrentLots(farmId));
});
export const editGeneralInfo = createAsyncThunk('generalInfo/edit', async ({ data, farmId, gInfoId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/generalInfo/${gInfoId}`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getFarmsRecords(user.id));
  dispatch(handleCurrentLots(farmId));
});
export const deleteLotGeneralInfo = createAsyncThunk('generalInfo/delete', async ({ farmId, lotId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/generalInfo/${lotId}`);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getFarmsRecords(user.id));
  dispatch(handleCurrentLots(farmId));
});
