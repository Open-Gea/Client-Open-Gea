import axios from 'axios';
import { startLoading, hasError, setProdInfo } from '../../../../redux/slices/records';

export const getProdInfo = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const prodInfoResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/prodInfo?userId=${id}`);
      dispatch(setProdInfo({ data: prodInfoResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
