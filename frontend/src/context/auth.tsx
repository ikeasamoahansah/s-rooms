import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';
import { jwtDecode } from 'jwt-decode';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from 'axios';

interface User {
    id: number;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    refreshToken: (route: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const decodeUser = jwtDecode(token) as User;
            setUser(decodeUser);
        }
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
        try {
            const response: AxiosResponse<LoginResponse> = await api.post('/api/token/', {username, password});
            const { access, refresh } = response.data;
            // Store token in local storage
            localStorage.setItem(ACCESS_TOKEN, access);
            localStorage.setItem(REFRESH_TOKEN, refresh);
            const decodedUser = jwtDecode(access) as User;
            setUser(decodedUser);
            history('/rooms');
        } catch (error) {
            alert('Login failed, Please try again');
        }
    }

    const logout = async (): Promise<void> => {
        try {
            await api.post('/api/accounts/logout/');
            // Remove token from local storage
            localStorage.clear();
            // Perform any additional logout logic here
            setUser(null);
            history('/login');
        } catch (error) {
            alert('Logout failed, Please try again');
        }
    }

    const refreshToken = async (): Promise<string | undefined> => {
        try {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            if (!refreshToken) throw new Error('No token stored');
            const response: AxiosResponse<LoginResponse & { access: string }> = await api.post(
                '/api/token/refresh/',
                {refreshToken}
            );
            const newToken = response.data.access;
            // Store token in local storage
            localStorage.setItem(ACCESS_TOKEN, newToken);

            const decodedUser = jwtDecode(newToken) as User;
            setUser(decodedUser);
            return newToken;
        }catch(error){
            alert('Error refreshing access token');
            return undefined;
        }
    };

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, refreshToken}}>
            {children}
        </AuthContext.Provider>
    )

}

interface LoginResponse {
    access: string;
    refresh: string;
}

export default AuthContext;