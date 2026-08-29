import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // Aapka backend URL
});

//  REQUEST INTERCEPTOR (Isse Token Har Request Me Automatic Jayega)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;