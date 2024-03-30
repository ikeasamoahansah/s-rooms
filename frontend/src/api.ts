import axios from 'axios';
import {ACCESS_TOKEN} from './constants';

// Create an instance of axios
const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // Get the access token from wherever you have stored it
        const token = localStorage.getItem(ACCESS_TOKEN);

        // Add the authorization header to the request
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;