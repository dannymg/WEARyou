import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token') || '';
    if (token) {
      config.headers['x-access-token'] = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
