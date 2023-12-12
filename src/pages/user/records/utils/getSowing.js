import axios from 'axios';
import { startLoading, hasError, setSowing } from '../../../../redux/slices/records';

export const getSowing = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const sowingResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/sowing?userId=${id}`);
      dispatch(setSowing({ data: sowingResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
