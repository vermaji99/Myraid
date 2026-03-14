import axios from 'axios';

let baseUrl = import.meta.env.VITE_API_URL || 'https://taskmaster-backend-8nyw.onrender.com/api/';

// Ensure the baseURL always ends with /api/
if (!baseUrl.endsWith('/api/')) {
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl + 'api/';
  } else {
    baseUrl = baseUrl + '/api/';
  }
}

const api = axios.create({
  baseURL: baseUrl,
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
