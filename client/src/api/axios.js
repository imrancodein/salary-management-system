import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach JWT Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Create full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // Already a complete URL
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const backendUrl = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

  const cleanPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;

  return `${backendUrl}${cleanPath}`;
};

export default API;