/* eslint-disable no-param-reassign */
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1/',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    console.log(token);
    
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
