import axios from 'axios';
import { startLoading, hasError, setAgrochemical } from '../../../../redux/slices/records';

export const getAgrochemical = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const agrochemicalResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/agrochemicals?userId=${id}`);
      dispatch(setAgrochemical({ data: agrochemicalResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
