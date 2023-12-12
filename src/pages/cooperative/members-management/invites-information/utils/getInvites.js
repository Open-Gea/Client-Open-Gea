import axios from 'axios';
import { hasError } from '../../../../../redux/slices/auth';
import { getInvitesSuccess, startLoading } from '../../../../../redux/slices/invitesCooperativa';
import { createAsyncThunk } from '@reduxjs/toolkit';


// Get all the members by cooperative
export const getInvitesByCooperative = id => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Bringing the invites with the cooperative id and the origin as cooperative
      const responseInvites = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/userCooperatives/user/${id}/origin/cooperative`);
      const invitesData = (responseInvites.data).map(obj => obj);
      const invitesFiltered = invitesData.filter((invite) => invite.origin === 'cooperative');

      dispatch(
        getInvitesSuccess({
          invites: invitesFiltered,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};