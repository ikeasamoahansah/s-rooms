import React, {useState, useEffect} from "react";
import { AxiosResponse } from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import api from "../api";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

interface RefreshResponse {
    access: string,
    refresh: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        authCheck().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async (): Promise<void> => {
        try {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            const response: AxiosResponse<RefreshResponse & { access: string }> = await api.post(
                '/api/token/refresh/',
                {refresh: refreshToken}
            );
            if (response.status === 200){
                const newToken = response.data.access;
                // Store token in local storage
                localStorage.setItem(ACCESS_TOKEN, newToken);
            }else{
                setIsAuthorized(false);
            }
        }catch(error){
            alert('Error refreshing access token');
            setIsAuthorized(false);
        }
    };

    const authCheck = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = (decoded as { exp: number }).exp;
        const now = Date.now()/1000;

        if(tokenExpiration < now){
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    };

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;