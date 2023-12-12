import axios from 'axios';
import { startLoading, hasError, setSales } from '../../../../redux/slices/records';

export const getSales = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const staffResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/sales?userId=${id}`);
      dispatch(setSales({ data: staffResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
