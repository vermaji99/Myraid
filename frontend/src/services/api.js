import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://taskmaster-backend-8nyw.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors globally
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      // Optional: window.location.href = '/login'; 
      // But we'll let the protected routes handle the redirection
    }

    const message = error.response?.data?.message || 'Something went wrong. Please try again.';
    return Promise.reject(message);
  }
);

export default api;
