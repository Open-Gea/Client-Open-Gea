import axios from 'axios';
import { startLoading, hasError, setPerformance } from '../../../../redux/slices/records';

export const getPerformance = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const performanceResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/performance?userId=${id}`);
      dispatch(setPerformance({ data: performanceResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
