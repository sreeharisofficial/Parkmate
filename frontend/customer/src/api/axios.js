import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Your backend URL
  timeout: 10000,
});

// Add a request interceptor to include the token if available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;