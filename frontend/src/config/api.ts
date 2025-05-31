const isDevelopment = import.meta.env.MODE === 'development';

export const API_BASE_URL = isDevelopment 
  ? import.meta.env.VITE_API_URL_DEV 
  : import.meta.env.VITE_API_URL_PROD;

export const API_BASE_URL_SAFE = API_BASE_URL || 'http://localhost:5000';