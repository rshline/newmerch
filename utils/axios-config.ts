import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.HOST}/api`,
});

export default api;