import axios from 'axios';
import {ACCESS_TOKEN} from './constants';
import { useAuth } from './context/auth';
// console.log("API Base URL:", import.meta.env.VITE_API_URL);

// Create an instance of axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 500) {
            try {
                const auth = useAuth();
                const refreshToken = await auth.refreshToken();
                // const logout = await auth.logout();

                error.config.headers.Authorization = `Bearer ${refreshToken}`;
                return api.request(error.config);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                // logout();
            }
        }
        return Promise.reject(error);
    }
)

export default api;