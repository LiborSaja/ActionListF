import axios from "axios";

// instance axios, nastavuje url backendu, čas čekání a hlavičky - typ obsahu, který bude poslán na server(lokální)
// const axiosInstance = axios.create({
//     baseURL: "https://localhost:7021/api",
//     timeout: 10000,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// url pro docker
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
export default axiosInstance;
