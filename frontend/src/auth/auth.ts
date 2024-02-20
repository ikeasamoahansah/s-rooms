import axios, {AxiosResponse} from 'axios';

interface LoginResponse {
    token: string;
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
        // const {token} = response.data;
        // // Store token in local storage
        // localStorage.setItem('token', token);
        // return token;
        console.log(response.data);
        
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