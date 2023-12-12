import axios from "axios";

export const contactUs =  async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/auth/contact-us`, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };