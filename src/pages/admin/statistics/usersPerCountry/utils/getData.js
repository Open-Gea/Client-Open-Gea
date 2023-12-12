/* eslint-disable no-case-declarations */
import axios from 'axios';
import authAdapter from '../../../../../adapters/authAdapter';
import { hasError } from '../../../../../redux/slices/auth';
import { getUsersPerCountrySuccess, startLoading } from '../../../../../redux/slices/systemUsers';

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

const colorPalette = [
  '#2FCAB1',
  '#E0C1AE',
  '#5379a3',
  '#2C613E',
  '#63B57B',
  '#AED185',
  '#db6e6e',
  '#d4bd92',
  '#86B8BA',
  '#667358',
  '#84A4BF',
  '#CDB6A6',
  '#88BF96',
  '#D66766',
  '#997551',
  '#D89A73',
  '#E5E399',
  '#B5AED7',
]

export const getCountriesList = async () => {
  try {
    const responseCountries= await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/countries`);
    return responseCountries.data;

  } catch (error) {
      // Return Provisional List of countries
    return countriesProvisionalist;
}
};

function determinateType(value){
  switch(value){
    case 'o':
      return 'organization';
    case 'f':
      return 'user';
    case 'p':
      return 'user';
    default:
      return 'all';
  }
}

// Get all the users by cooperative
export const getUsersPerCountry = (typeOfUser) => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Creating the list of countries
      const countriesDatabase = await getCountriesList();
      // List of countries with just the name
      const countries = countriesDatabase.map(country => country.name);

      // List of data containing the countries and their number of users
      const registeredUsersPerCountry = [];
      let id = 0;

      for (const country of countries) {
        let numberOfUsers = 0;

        switch(determinateType(typeOfUser[0]?.toLowerCase())){
          case 'user':
            // Bringing the list of users
            const responseUsers = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/users/${country}`);
            numberOfUsers = responseUsers.data.length;
          break;
          case 'organization':
            // Bringing the list of users
            const responseOrganizations = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/cooperatives/${country}`);
            numberOfUsers = responseOrganizations.data.length;
          break;
          default:
            // Bringing the list of users
            const responseUsers2 = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/users/${country}`);
            numberOfUsers = responseUsers2.data.length;
            // Bringing the list of organizations
            const responseOrganizations2 = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/cooperatives/${country}`);
            numberOfUsers += responseOrganizations2.data.length;
          break;
        }
     
        // If the number of users is 0 don't add the country in the graph
        if(numberOfUsers > 0) {
          const objectToInsert = {id, value: numberOfUsers, label: country, color: colorPalette[id]};
          registeredUsersPerCountry.push(objectToInsert);
          id+=1;
        }
      }

      dispatch(
        getUsersPerCountrySuccess({
          usersPerCountry: registeredUsersPerCountry,
          uniqueCountries: countries,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};