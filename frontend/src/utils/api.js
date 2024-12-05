import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);
export const getDropSpots = () => API.get('/dropspot');
export const scheduleMeetup = (data) => API.post('/meetup/schedule', data);npm