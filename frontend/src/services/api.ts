import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use(
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't auto-logout if it's just a permissions check failing
      // Only logout if it's an actual auth failure on login/me endpoints
      const url = error.config?.url || '';
      if (!url.includes('/permissions/')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Dashboard APIs
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentOrders: (limit = 10) => api.get(`/dashboard/recent-orders?limit=${limit}`),
};

export default api;
