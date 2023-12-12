import axios from 'axios';
import { startLoading, hasError, setLabors } from '../../../../redux/slices/records';

export const getLabors = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const laborsResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/labors?userId=${id}`);
      dispatch(setLabors({ data: laborsResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
