import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Login() {
    const history = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<string | null>('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/token/', {username, password});
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        } catch (error) {
            setError(error as string);
        } finally {
            console.log('Login successful');
            history('/rooms');
        }

    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="flex flex-col items-center">
                <div className="mb-4">
                    <label htmlFor="username" className="mr-2">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="mr-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-200 rounded px-2 py-1" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}

export default Login;