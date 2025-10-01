import axios from "axios";

const api = axios.create({
    baseURL: "https://codsoft-jobportal.onrender.com/api",
    withCredentials: true,
});

export default api;
