import axios from 'axios';
import { startLoading, hasError, setPhyto } from '../../../../redux/slices/records';

export const getPhyto = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const phytoResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/phyto?userId=${id}`);
      dispatch(setPhyto({ data: phytoResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
