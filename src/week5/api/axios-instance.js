import axios from "axios";

const AxiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
  baseURL: import.meta.env.VITE_TMDB_API_URL,
});

export { AxiosInstance };

