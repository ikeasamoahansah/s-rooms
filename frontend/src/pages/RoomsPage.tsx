import React, { useEffect, useState } from 'react';
import { getToken } from '../context/auth';
import axios from 'axios';
import Rooms from '../components/rooms/Rooms';

const RoomListPage: React.FC = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            var token:string | null = getToken();
            try {
                const response = await axios.get('http://127.0.0.1:8000/rooms/home/', {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });
                setRooms(response.data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchRooms();
    }, []);

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
            <div className="mx-auto max-w-md">
                <ul className="grid grid-cols-1 gap-4">
                    {rooms.map((room: { id: string, name: string }, index: number) => (
                        <div key={index} className="bg-gray-200 p-4 rounded-lg">
                            <Rooms room={room}/>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RoomListPage;