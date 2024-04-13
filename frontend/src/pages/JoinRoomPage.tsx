import React, {useState} from "react";
import api from "../api";
import { AxiosResponse } from "axios";

const JoinRoom: React.FC = () => {

    const [error, setError] = useState<String>("");
    const [room, setRoom] = useState<object>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const code = e.currentTarget.code.value;

        try {
            const res: AxiosResponse = await api.get(`/api/rooms/join/${code}`);
            console.log(res.data);
            setRoom(res.data);
        } catch (err) {
            setError(err as string);
        }
    }

    const joinRoom = async (e: React.FormEventHandler<HTMLButtonElement>) => {
        try {
            if (room) {
                const { code } = room as { code: string }; // Add type annotation to extract 'code' property
                api.post(`/api/rooms/join/${code}/`);
            }
        } catch (err) {
            setError(err as string);
        }
    }


    return (
        <div className="flex items-center justify-center h-screen">
            {room ? (
                <div className="flex flex-col bg-gray-300 rounded-md items-center justify-center p-8">
                    <h2 className="text-2xl">{(room as { name: string }).name}</h2>
                    <div className="bg-blue-500 p-2 rounded text-white">
                        <button onClick={joinRoom} type="submit">Join room</button>
                    </div>
                </div>
            ) : (
                <div className="flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-4">Enter a room code</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="code">Room code</label>
                        <input type="text" id="code" name="code" />
                        <button type="submit">Join room</button>
                    </form>
                </div>
            )}
            <h6 className="text-red">{error}</h6>
        </div>
    )
}

export default JoinRoom;