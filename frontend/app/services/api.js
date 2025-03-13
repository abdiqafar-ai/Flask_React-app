import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://flask-react-app-1-wk30.onrender.com/api" 
    : "http://127.0.0.1:5000/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
