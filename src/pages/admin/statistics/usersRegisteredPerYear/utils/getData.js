/* eslint-disable no-case-declarations */
import axios from 'axios';
import authAdapter from '../../../../../adapters/authAdapter';
import { hasError } from '../../../../../redux/slices/auth';
import { getGraphData, startLoading } from '../../../../../redux/slices/systemUsers';

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


// Methods for to obtain the data
function determinateType(value){
  return (value.includes('All') || value.includes('Todos')) ?  'All' : 'Other';
}
function getYearsArray(){
  // Starting year for the graph
  const startNumber = 2021;
  // Ending year for the graph, actual year 
  const endNumber = (new Date().getFullYear())+3;

  return Array.from({ length: endNumber - startNumber + 1 }, (_, index) => startNumber + index);
}
function countUsersByYear(users, years) {
  const userCounts = years.map(year => {
    const count = users.filter(user => {
      const userYear = new Date(user.created_at).getFullYear();
      return userYear.toString() === year.toString();
    }).length;

    return count;
  });

  return userCounts;
}
function countUsersByYearForCountries(users, years) {
  const userCounts = years.map(year => {
    const count = users.filter(user => {
      const userYear = new Date(user.createdAt).getFullYear();
      return userYear.toString() === year.toString();
    }).length;

    return count;
  });

  return userCounts;
}

// Get all the users by cooperative
export const getUsersPerCountry = (typeOfUser) => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      const years = getYearsArray();

      // -- Check if all users or specific country

      if(determinateType(typeOfUser)==='Other'){
          // -- If specific country is selected

          // Users
          const responseUsers = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/users/${typeOfUser}`);
          const usersData = countUsersByYearForCountries(responseUsers.data, years);


          // Organizations
          const responseOrganizations = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/cooperatives/${typeOfUser}`);
          const organizationsData = countUsersByYearForCountries(responseOrganizations.data, years);

          dispatch(
            getGraphData({
              years: years,
              usersData,
              organizationsData,
              totalUsers: responseUsers?.data.length+responseOrganizations?.data.length
              })
          ); 

      }else{ 
          // -- If all countries are selected

           // Users
           const responseUsers = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/users/`);
           const usersData = countUsersByYear(responseUsers.data, years);
 
           // Organizations
           const responseOrganizations = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/cooperatives/`);
           const organizationsData = countUsersByYear(responseOrganizations.data, years);

          dispatch(
            getGraphData({
              years: years,
              usersData,
              organizationsData,
              totalUsers: responseUsers?.data.length+responseOrganizations?.data.length
              })
          ); 
      }

    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};