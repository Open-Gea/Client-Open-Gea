import axios from 'axios';

export const AxiosInterceptor = () => {
  axios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = document.cookie;
          return config;
      },
      error => {
          return Promise.reject(error);
    }
  );
};
