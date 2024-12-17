import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosInstance = axios.create({
  baseURL: 'https://assignment.stage.crafto.app',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    toast.error(error.response?.data?.message || 'Something went wrong!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
