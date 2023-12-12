import axios from 'axios';
import farmsAdapter from '../../../../adapters/farmsAdapter';
import { getFarmsSuccess, startLoading, hasError } from '../../../../redux/slices/records';

export const getFarmsRecords = id => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms/user/${id}`);
      const lotsResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/records/lots?userId=${id}`);
      const adaptedFarms = response.data.map(el => farmsAdapter(el));
      dispatch(
        getFarmsSuccess(
          adaptedFarms.map(farm => {
            const elementLot = lotsResponse.data.filter(el => el.farmId.id === farm.id);
            if (elementLot) return { ...farm, lots: elementLot};
            return { ...farm, lots: []};
          })
        )
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
