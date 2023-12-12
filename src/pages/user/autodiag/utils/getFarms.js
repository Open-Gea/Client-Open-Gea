import axios from 'axios';


export const getFarmsById = async (userId)=> {
  try {
    const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/farms/user/${userId}`);
    return response;
  } catch (error) {
    return error;
}
};
