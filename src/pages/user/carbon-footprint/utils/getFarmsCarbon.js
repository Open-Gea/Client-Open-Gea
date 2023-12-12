import axios from 'axios';
import farmsAdapter from '../../../../adapters/farmsAdapter';
import { getFarmsEvoSuccess, setEmissions, startLoading, hasError, stopLoading } from '../../../../redux/slices/huellaCarbono';
import calcCarbonAdapter from '../../../../adapters/carbonoAdapter';

export const getFarmsCarbon = (id,finishLoad = true) => {
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

export const getFactorsCarbon = async (id,farms,year) => {
  try{
    const año = parseInt(year)
    const emisionsResponse = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/emissionFactor/`);
    const emisionsData = emisionsResponse.data;
    const country = farms.find(farm => farm.id === id).country;
    //Filtramos por pais
    const filteredEmissionsCountry = emisionsData.filter((emission) =>emission.countries.includes(country));
    //Filtramos por Año
    const filteredEmissions = filteredEmissionsCountry.filter((filtradas) =>filtradas.years.includes(año));

    const uniqueCategories = [...new Set(filteredEmissions.map(emission => emission.category))];;
    return {categorias: uniqueCategories,
    factores: filteredEmissions};
  } catch(e){
    console.log(e);
  }

};