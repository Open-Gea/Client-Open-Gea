import axios from 'axios';
import farmsAdapter from '../../../../../adapters/farmsAdapter';
import { getFarmsEvoSuccess, setProducts, startLoading, hasError, stopLoading } from '../../../../../redux/slices/evotranspiracionCooperativa';
import calcAdapter from '../../../../../adapters/calcAdapter';

export const getFarmsEvo = (id, finishLoad = true) => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      // Bringing the data from the cooperative
      const responseCooperatives = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/users/waterFootprint/${id}`);

      // Creating the adapted farms with the name of the owners
      let farmsByUser;
      let userId;
      let userName;
      let newAdaptedFarms;
      const finalFarms = [];
      for await (const userWithData of responseCooperatives.data){
        userId = userWithData.user.id;
        userName = userWithData.user.name+' '+userWithData.user.lastname;
        farmsByUser =  await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms/user/${userId}`);
        newAdaptedFarms = farmsByUser.data.map(el => farmsAdapter(el));
        newAdaptedFarms.forEach(farm => {
          farm.name = farm.name+' - '+userName;
          finalFarms.push(farm);
        });
      }

      const calcResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/evaluation/`);
      const calcData = calcResponse.data.map(el => calcAdapter(el));

      dispatch(
        getFarmsEvoSuccess({
          farms: finalFarms.map(el => {
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