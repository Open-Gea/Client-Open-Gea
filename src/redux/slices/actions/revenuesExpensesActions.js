import { createAsyncThunk } from '@reduxjs/toolkit';
import { hasError, startLoading } from '../records';
import axios from 'axios';
import { getRevenuesExpenses } from '../../../pages/user/records/utils/getRevenuesExpenses';

export const addRevenuesExpenses = createAsyncThunk('revenuesExpenses/add', async (data, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/revenuesExpenses`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getRevenuesExpenses(user.id));
});
export const editRevenuesExpenses = createAsyncThunk('revenuesExpenses/edit', async ({ data, revenuesExpensesId }, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.patch(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/revenuesExpenses/${revenuesExpensesId}`, data);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getRevenuesExpenses(user.id));
});
export const deleteRevenuesExpenses = createAsyncThunk('revenuesExpenses/delete', async (revenuesExpensesId, { dispatch, getState }) => {
  const { user } = getState().authSlice;
  dispatch(startLoading());
  try {
    await axios.delete(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/revenuesExpenses/${revenuesExpensesId}`);
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getRevenuesExpenses(user.id));
});
