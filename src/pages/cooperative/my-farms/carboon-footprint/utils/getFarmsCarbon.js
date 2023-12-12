import axios from 'axios';
import farmsAdapter from '../../../../../adapters/farmsAdapter';
import { getFarmsEvoSuccess, setEmissions, startLoading, hasError, stopLoading } from '../../../../../redux/slices/huellasCarbonoCooperativa';

import calcCarbonAdapter from '../../../../../adapters/carbonoAdapter';

export const getFarmsCarbon = (id,year, finishLoad = true) => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms/user/${id}`);
      const adaptedFarms = response.data.map(el => farmsAdapter(el));
      const calcResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/carbonFootPrint/`);
      const calcData = calcResponse.data.map(el => calcCarbonAdapter(el));
         
      dispatch(
        getFarmsEvoSuccess({
          farms: adaptedFarms.map(el => {
            const calc = calcData.filter(calc => calc.farm === el.id);
            if (calc.length) return { ...el, calc };
            else return { ...el, calc: [] };
          }),
        })
      );
 
      const factorResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/emissionFactor/`);
      const factorData = factorResponse.data;
      dispatch(setEmissions(factorData));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    } finally {
      if (finishLoad) dispatch(stopLoading());
    }
  };
};


export const getFarmsByCooperative = (id, finishLoad = true) => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      // Bringing the data from the cooperative
      const responseCooperatives = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/users/carbonFootprint/${id}`);

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

      const calcResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/carbonFootPrint/`);
      const calcData = calcResponse.data.map(el => calcCarbonAdapter(el));
      dispatch(
        getFarmsEvoSuccess({
          farms: finalFarms.map(el => {
            const calc = calcData.filter(calc => calc.farm === el.id);
            if (calc.length) return { ...el, calc };
            else return { ...el, calc: [] };
          }),
        })
      );
      const factorResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/emissionFactor/`);
      const factorData = factorResponse.data;
      dispatch(setEmissions(factorData));
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    } finally {
      if (finishLoad) dispatch(stopLoading());
    }
  };
};