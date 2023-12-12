import axios from 'axios';

export const getCooperative = async id => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/${id}`);
      return response;
    } catch (error) {
      return error;
  }
};
