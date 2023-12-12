import axios from 'axios';
import { startLoading, hasError, setFertilizations } from '../../../../redux/slices/records';

export const getFertilizations = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const fertilizationsResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/fertilizations?userId=${id}`);
      dispatch(setFertilizations({ data: fertilizationsResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
