import axios from 'axios';
import { hasError } from '../../../../../redux/slices/auth';
import {
  getOfficialCountriesSuccess,
  startLoading,
} from '../../../../../redux/slices/countriesAdmin';

// Get all the countries
export const getOfficialCountries = ()=> {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Bringing the data
      const officialCountries = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/countriesList`);
      

      dispatch(
        getOfficialCountriesSuccess({
          officialCountries: officialCountries.data,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};