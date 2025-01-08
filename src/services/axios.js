import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:44396/api", // Základní URL backendu
    timeout: 10000, // Timeout požadavků (volitelné)
    headers: {
        "Content-Type": "application/json", // Nastav typ obsahu
    },
});

export default axiosInstance;
