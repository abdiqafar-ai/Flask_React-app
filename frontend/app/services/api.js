import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL + "/api"
  : "http://127.0.0.1:5000/api"; // Fallback if NEXT_PUBLIC_API_URL isn't defined

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
