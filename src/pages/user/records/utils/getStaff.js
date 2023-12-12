import axios from 'axios';
import { startLoading, hasError, setStaffInfo } from '../../../../redux/slices/records';

export const getStaff = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const staffResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/staff?userId=${id}`);
      dispatch(setStaffInfo({ data: staffResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
