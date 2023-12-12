import axios from 'axios';
import { startLoading, hasError, setSuppliers } from '../../../../redux/slices/records';

export const getSuppliers = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const suppliersResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/suppliers?userId=${id}`);
      dispatch(setSuppliers({ data: suppliersResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
