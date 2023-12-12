import axios from 'axios';
import { hasError } from '../../../../../redux/slices/auth';
import {
  getCountriesSuccess,
  startLoading,
} from '../../../../../redux/slices/countriesAdmin';

// Get all the countries
export const getListCountries = ()=> {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Bringing the data
      const responseCountries= await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/countries`);
      //const officialCountries = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/countriesList`);
      

      dispatch(
        getCountriesSuccess({
          countries: responseCountries.data,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};