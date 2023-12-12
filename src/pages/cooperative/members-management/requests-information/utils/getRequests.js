import axios from 'axios';
import { hasError } from '../../../../../redux/slices/auth';
import { startLoading, getRequestsCooperativeSuccess } from '../../../../../redux/slices/requestsCooperativa';
import { createAsyncThunk } from '@reduxjs/toolkit';


// Get all the requests by user but from the cooperative id
export const getRequestsByCooperative = id => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Bringing the requests with the user id and the origin as user
      const responseRequests = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/userCooperatives/user/${id}/origin/cooperative`);
      const requestsData = (responseRequests.data).map(obj => obj);
      const requestsFiltered = requestsData.filter((request) => request.origin === 'user');

      dispatch(
        getRequestsCooperativeSuccess({
          requestsCooperative: requestsFiltered,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};