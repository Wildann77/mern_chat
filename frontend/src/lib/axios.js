import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? import.meta.env.VITE_API_URL + "/api" : "https://mern-chat-mlg4.vercel.app/api",

  withCredentials: true, // send cookies with every request
});
