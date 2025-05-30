import axios, { AxiosInstance } from "axios";

const baseURL: string = import.meta.env.VITE_BASE_URL ?? 'http://127.0.0.1:8000/api';

const http: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Authorization': 'Doonamis',
    'Content-Type': 'application/json',
  },
});

export { http };