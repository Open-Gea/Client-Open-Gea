import axios from 'axios';
import { hasError } from '../../../../../redux/slices/auth';
import { getRequestsSuccess, startLoading } from '../../../../../redux/slices/requestsUser';
import { createAsyncThunk } from '@reduxjs/toolkit';


// Get all the members by user
export const getRequestsByUser = id => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Bringing the requests with the user id and the origin as user
      const responseRequests = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/userCooperatives/user/${id}/origin/user`);
      const requestsData = (responseRequests.data).map(obj => obj);
      const requestsFiltered = requestsData.filter((request) => request.origin === 'user');


      dispatch(
        getRequestsSuccess({
          requests: requestsFiltered,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};