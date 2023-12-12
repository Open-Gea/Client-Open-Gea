import axios from 'axios';
import farmsAdapter from '../../../../adapters/farmsAdapter';
import authAdapter from '../../../../adapters/authAdapter';
import { hasError } from '../../../../redux/slices/auth';
import {
  getFarmsSuccess,
  startLoading,
  getUsersCooperativeSuccess,
  userSelectedCooperative,
} from '../../../../redux/slices/farmsCooperativa';

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

// Get all the farms by cooperative
export const getFarmsByCooperative = id => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Creating the list of countries
      const countriesDatabase = await getCountriesList();
      // List of countries with just the name
      const countries = countriesDatabase.map(country => country.name);

      // Bringing the data from the cooperative
      const responseCooperatives = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/users/getUsers/${id}`);
      // Extracting the users from the response
      const usersToBeAdapted = responseCooperatives.data.map(obj => obj.user);

      // Creating the adapated farms with the users related to the cooperatives
      let farmsByUser;
      let userId;
      let userName;
      let newAdaptedFarms;
      const finalFarms = [];
      for await (const userWithData of usersToBeAdapted) {
        userId = userWithData.id;
        farmsByUser = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms/user/${userId}`);
        newAdaptedFarms = farmsByUser.data.map(el => farmsAdapter(el));
        newAdaptedFarms.forEach(farm => {
          // Setting up the name to provide more information about the owner :
          farm.owner = userWithData.name + ' ' + userWithData.lastname + ' - ' + userWithData.email;
          // Adding the user to the farm
          farm.userId = userId;
          finalFarms.push(farm);
        });
      }

      dispatch(
        getFarmsSuccess({
          farms: finalFarms,
          uniqueCountries: countries,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};

// Get all the users by cooperative
export const getUsersByCooperative = id => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Bringing the data from the cooperative
      const responseCooperatives = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/users/getUsers/${id}`);
      // Extracting the users from the response
      const usersToBeAdapted = responseCooperatives.data.map(obj => obj.user);
      // Creating the adapted users
      const adapatedUsers = usersToBeAdapted.map(user => authAdapter(user));

      // Dispatching the users
      dispatch(
        getUsersCooperativeSuccess({
          usersCooperative: adapatedUsers,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};

// Get specific user by id
export const getUserSelectedCooperative = id => {
  return async dispatch => {
    dispatch(startLoading);
    try {
      // Bringing the data
      const responseUser = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/users/${id}`);

      // Dispatching the users
      dispatch(
        userSelectedCooperative({
          userSelectedCooperative: responseUser.data,
        })
      );
    } catch (error) {
      dispatch(hasError(error));
      console.log(error);
    }
  };
};
