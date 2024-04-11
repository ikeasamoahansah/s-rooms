import React from "react";
import api from "../api";
import { AxiosResponse } from "axios";

const JoinRoom: React.FC = () => {


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const code = e.currentTarget.code.value;

        try {
            const res: AxiosResponse = await api.get(`/api/rooms/join/${code}`);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Join a room</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="code">Room code</label>
                    <input type="text" id="code" name="code" />
                    <button type="submit">Join room</button>
                </form>
            </div>
        </div>
    )
}

export default JoinRoom;