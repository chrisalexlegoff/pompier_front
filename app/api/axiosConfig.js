import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Ajouter le token JWT à chaque requête si présent dans localStorage
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
