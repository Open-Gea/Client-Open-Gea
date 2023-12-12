import axios from 'axios';
import { hasError } from '../../../../../redux/slices/auth';
import { startLoading, getOrganizationsSuccessUser } from '../../../../../redux/slices/organizationsUser';
import { createAsyncThunk } from '@reduxjs/toolkit';


// Get all the requests by user but from the cooperative id
export const getOrganizationsByUser = id => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Bringing the requests with the user id and the origin as user
      const responseRequests = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/users/getCooperatives/${id}`);
      const requestsData = (responseRequests.data).map(obj => obj);

      dispatch(
        getOrganizationsSuccessUser({
          organizations: requestsData,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};