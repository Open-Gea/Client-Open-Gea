import axios from 'axios';
import { startLoading, hasError, setRevenuesExpenses } from '../../../../redux/slices/records';

export const getRevenuesExpenses = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const revenuesExpensesResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/revenuesExpenses?userId=${id}`);
      dispatch(setRevenuesExpenses({ data: revenuesExpensesResponse.data }));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
