import axios from 'axios';
import { startLoading, hasError, setBioInputs } from '../../../../redux/slices/records';

export const getBioInputs = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const bioResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/bioInputs?userId=${id}`);
      dispatch(setBioInputs({ data: bioResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
