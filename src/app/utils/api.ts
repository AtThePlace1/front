import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:10010',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = token;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
