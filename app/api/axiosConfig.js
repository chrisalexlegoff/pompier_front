import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:8000/api',
});

// Ajouter le token JWT à chaque requête si présent dans localStorage
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
