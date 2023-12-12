import axios from 'axios';
import farmsAdapter from '../../../../adapters/farmsAdapter';
import { getFarmsEvoSuccess, setProducts, startLoading, hasError, stopLoading } from '../../../../redux/slices/evotranspiracion';
import calcAdapter from '../../../../adapters/calcAdapter';

export const getFarmsEvo = (id, finishLoad = true) => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms/user/${id}`);
      const adaptedFarms = response.data.map(el => farmsAdapter(el));
      const calcResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/evaluation/`);
      const calcData = calcResponse.data.map(el => calcAdapter(el));

      dispatch(
        getFarmsEvoSuccess({
          farms: adaptedFarms.map(el => {
            const calc = calcData.filter(calc => calc.farm === el.id);
            if (calc.length) return { ...el, calc };
            else return { ...el, calc: [] };
          }),
        })
      );
      const prodResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/products/`);
      const prodData = prodResponse.data;
      dispatch(setProducts(prodData));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    } finally {
      if (finishLoad) dispatch(stopLoading());
    }
  };
};
