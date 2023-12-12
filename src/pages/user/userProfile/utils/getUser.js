import axios from 'axios';

export const getUser = async id => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/users/${id}`);
      return response;
    } catch (error) {
      return error;
  }
};

export const isUserActive = async id => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/admin/users/${id}/status`);
    return response.data.isActive;
  } catch (error) {
    return error;
}
};

export const isCooperativeActive = async id => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/${id}`);
    return response.data.status==='ACTIVE'
  } catch (error) {
    return error;
}
};