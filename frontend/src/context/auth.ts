import axios, {AxiosResponse} from 'axios';
import api from '../api';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';

interface LoginResponse {
    token: string;
}

export async function loginUser(route: string, username: string, password: string): Promise<string | undefined> {
    try {
        const response: AxiosResponse<LoginResponse & { access: string, refresh: string }> = await api.post(
            route,
            {
                username,
                password
            }
        );
        // Store token in local storage
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        return ACCESS_TOKEN;
        
    } catch (error) {
        alert(error);
        return undefined;
    }
}

export async function logoutUser(): Promise<void> {
    try {
        await axios.post('/api/accounts/logout/');
        // Remove token from local storage
        localStorage.clear();
        // Perform any additional logout logic here
    } catch (error) {
        alert(error);
    }
}

export async function refreshToken(route: string): Promise<string | undefined> {
    try {
        const token = localStorage.getItem(REFRESH_TOKEN);
        if (!token) throw new Error('No token stored');
        const response: AxiosResponse<LoginResponse & { access: string }> = await api.post(
            route,
            {token}
        );
        const newToken = response.data.access;
        // Store token in local storage
        localStorage.setItem(ACCESS_TOKEN, newToken);
        return newToken;
    }catch(error){
        alert('Error occured!');
        return undefined;
    }
}

export function getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
}

export function getUser(): number {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('No user id stored');
    return Number(userId);
}