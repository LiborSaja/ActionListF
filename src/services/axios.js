import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7021/api", // Základní URL backendu
    timeout: 10000, // Timeout požadavků (volitelné)
    headers: {
        "Content-Type": "application/json", // Nastav typ obsahu
    },
});

axiosInstance.interceptors.request.use((config) => {
    console.log("Request:", config);
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Response:", response);
        return response;
    },
    (error) => {
        console.error("Error in response:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
