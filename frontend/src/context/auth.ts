import axios, {AxiosResponse} from 'axios';

interface LoginResponse {
    token: string;
}

export async function loginUser(username: string, password: string): Promise<string | undefined> {
    try {
        const response: AxiosResponse<LoginResponse & { id: number }> = await axios.post(
            'http://127.0.0.1:8000/accounts/login/',
            {
                username,
                password
            }
        );
        const {token, id} = response.data;
        // Store token in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id.toString()); // Convert id to string
        return token;
        
    } catch (error) {
        console.error('Error logging in', error);
        return undefined;
    }
}

export async function logoutUser(): Promise<void> {
    try {
        await axios.post('http://127.0.0.1:8000/accounts/logout/');
        // Remove token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // Perform any additional logout logic here
    } catch (error) {
        console.error('Error logging out', error);
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

export function getUser(): number {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('No user id stored');
    return Number(userId);
}