import axios from 'axios';
import { startLoading, hasError, setSoils } from '../../../../redux/slices/records';

export const getSoils = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const soilsResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/soils?userId=${id}`);
      dispatch(setSoils({ data: soilsResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
