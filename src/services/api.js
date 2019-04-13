import axios from "axios";

const api = axios.create({
  baseURL: "https://rastreamento-backend.herokuapp.com"
});

export default api;
