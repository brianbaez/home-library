import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://stunning-gecko-4a513a.netlify.app"
});

export default axiosInstance;