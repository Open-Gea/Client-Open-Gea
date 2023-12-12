import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleCurrentLots, hasError, startLoading } from '../records';
import axios from 'axios';
import { getFarmsRecords } from '../../../pages/user/records/utils/getFarmsRecords';

export const addLot = createAsyncThunk('lots/add', async ({ data, farmId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/lots?farmId:${farmId}`, data);
  } catch (error) {
    dispatch(hasError(error));
  }
  await dispatch(getFarmsRecords(user.id));
  dispatch(handleCurrentLots(farmId));
});
export const editLot = createAsyncThunk('lots/edit', async ({ data, farmId, lotId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/lots/${lotId}`, data);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getFarmsRecords(user.id));
  dispatch(handleCurrentLots(farmId));
});
export const deleteLot = createAsyncThunk('lots/delete', async ({ farmId, lotId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/lots/${lotId}`);
  } catch (error) {
    dispatch(hasError(error.code));
  }
  await dispatch(getFarmsRecords(user.id));
  dispatch(handleCurrentLots(farmId));
});
