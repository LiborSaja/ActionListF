import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7021/api", // Základní URL backendu
    timeout: 10000, // Timeout požadavků (volitelné)
    headers: {
        "Content-Type": "application/json", // Nastav typ obsahu
    },
});

export default axiosInstance;
