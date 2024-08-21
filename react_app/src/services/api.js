import axios from "axios";
import config from './config.json';

const api = axios.create({
  baseURL: config.apiUrl,
});

export default api;