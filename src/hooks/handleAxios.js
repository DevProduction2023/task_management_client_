import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
  withCredentials: true, // if you're sending cookies
});

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error?.response && error?.response?.status === 401) {
      // Handle 401 error: e.g., redirect to login page
      window.location.href = '/login'; // or use navigate() in a hook
    }
    return Promise.reject(error);
  }
);

export default api;
