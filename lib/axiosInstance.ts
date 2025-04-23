import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.48.231:5500/api",
  withCredentials: true, // optional depending on backend CORS setup
});

export default api;
