import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
    headers: {}
});

axiosInstance.interceptors.request.use((request) => {
    if (request.url !== '/signup' && request.url !== '/login' && document.cookie) {
        const token = document.cookie.split('token=')[1];
        request.headers['Authorization'] = token;
    }
    return request;
});

axiosInstance.interceptors.response.use((response) => {
    console.log('In response interceptors', response);
    return response;
});

export default axiosInstance;