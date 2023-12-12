import { createAsyncThunk } from '@reduxjs/toolkit';
import { hasError, startLoading } from '../records';
import axios from 'axios';
import { getStaff } from '../../../pages/user/records/utils/getStaff';

export const addStaffInfo = createAsyncThunk('staffInfo/add', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/staff`, data, {headers: {
      'Content-Type': 'multipart/form-data'
    }});
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getStaff(user.id));
});
export const editStaffInfo = createAsyncThunk('staffInfo/edit', async ({ data, staffId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    console.log(data);
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/staff/${staffId}`, data, {headers: {
      'Content-Type': 'multipart/form-data'
    }});
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getStaff(user.id));
});
export const deleteStaffInfo = createAsyncThunk('staffInfo/delete', async (staffId, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/staff/${staffId}`);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getStaff(user.id));
});
