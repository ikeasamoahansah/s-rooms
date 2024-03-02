import axios, {AxiosResponse} from 'axios';
import "core-js/stable/atob";
import { JwtPayload, jwtDecode } from 'jwt-decode';

interface LoginResponse {
    token: string;
}

interface User {
    username: string;
    id: number;
}

export async function loginUser(username: string, password: string): Promise<string | undefined> {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
            'http://127.0.0.1:8000/accounts/login/',
            {
                username,
                password
            }
        );
        const {token} = response.data;
        // Store token in local storage
        localStorage.setItem('token', token);
        return token;
        
    } catch (error) {
        console.error('Error logging in', error);
        return undefined;
    }
}

export async function refreshToken(): Promise<string | undefined> {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token stored');
        const response: AxiosResponse<LoginResponse> = await axios.post(
            'http://127.0.0.1/accounts/token-refresh/',
            {token}
        );
        const newToken = response.data.token;
        // Store token in local storage
        localStorage.setItem('token', newToken);
        return newToken;
    }catch(error){
        console.error('Error refreshing token', error);
        return undefined;
    }
}

export function getToken(): string | null {
    return localStorage.getItem('token');
}

export async function getUser(): Promise<User | undefined> {
    try {
        const token = getToken();
        if (!token) throw new Error('You must be logged in!');
        const decoded = jwtDecode<JwtPayload>(token);
        const response: AxiosResponse<User> = await axios.get(
            `http://127.0.0.1:8000/accounts/user/${decoded.id}/`,
            {
                headers: {
                    Authorization: `token ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting user', error);
        return undefined;
    }
}