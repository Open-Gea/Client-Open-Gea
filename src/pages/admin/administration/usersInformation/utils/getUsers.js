import axios from 'axios';
import authAdapter from '../../../../../adapters/authAdapter';
import cooperativeAdapter from '../../../../../adapters/cooperativeAdapter';
import { hasError } from '../../../../../redux/slices/auth';
import { getUsersSuccess, startLoading } from '../../../../../redux/slices/systemUsers';



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

// Get all the users 
export const getAllUsers = (value) => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      let adapatedUsers;
      let responseUsers;

      // Creating the list of countries
      const countriesDatabase = await getCountriesList();
      // List of countries with just the name
      const countries = countriesDatabase.map(country => country.name);

      if(isOrganization(value)) {
        // Bringing the data 
        responseUsers = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/cooperatives`);
        // Adapted the cooperatives from the response
        adapatedUsers = responseUsers.data.map(cooperative => cooperativeAdapter(cooperative));
      }else{
        // Bringing the data 
        responseUsers = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/users`);
        // Adapted the users from the response
        adapatedUsers = responseUsers.data.map(user => authAdapter(user));
      }

      // Dispatching the users
      dispatch(
        getUsersSuccess({
          users: adapatedUsers,
          uniqueCountries: countries,
        })
      );

    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};

// Check if it is an organization
function isOrganization(element){
  return (element[0]?.toLowerCase() === 'o');
}