import axios from 'axios';
import farmsAdapter from '../../../../adapters/farmsAdapter';
import { hasError } from '../../../../redux/slices/auth';
import { getFarmsSuccess, startLoading } from '../../../../redux/slices/farms';

// Backup list in case the actual list is having issues being loaded
const countriesProvisionalist  = [
  { id: '1', name: 'Argentina', code: 'AR'},
  { id: '2', name: 'Belice', code: 'BZ'},
  { id: '3', name: 'Bolivia', code: 'BO'},
  { id: '4', name: 'Costa Rica', code: 'CR'},
  { id: '5', name: 'Colombia', code: 'CO'},
  { id: '6', name: 'Chile', code: 'CL'},
  { id: '7', name: 'Ecuador', code: 'EC'},
  { id: '8', name: 'El Salvador', code: 'SV'},
  { id: '9', name: 'Guatemala', code: 'GT'},
  { id: '10', name: 'Honduras', code: 'HN'},
  { id: '11', name: 'México', code: 'MX'},
];

export const getCountriesList = async () => {
  try {
    const responseCountries= await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/countries`);
    return responseCountries.data;

  } catch (error) {
      // Return Provisional List of countries
    return countriesProvisionalist;
  }
};

export const getFarms = id => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Creating the list of countries
      const countriesDatabase = await getCountriesList();
      // List of countries with just the name
      const countries = countriesDatabase.map(country => country.name);

      const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms/user/${id}`);
      const adaptedFarms = response.data.map(el => farmsAdapter(el));
      dispatch(
        getFarmsSuccess({
          farms: adaptedFarms,
          uniqueCountries: countries,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
