import React, { useEffect, useState } from 'react';
import { getToken } from '../../context/auth';
import axios from 'axios';

const RoomListPage: React.FC = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            var token:string | null = getToken();
            try {
                const response = await axios.get('http://127.0.0.1:8000/rooms/home/', {
                    headers: {
                        Authorization: `Authorization ${token}`,
                    },
                });
                setRooms(response.data);
                console.log(response.data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchRooms();
    }, []);

    return (
        <div>
            <h1>Available Rooms</h1>
            <ul>
                {rooms.map((room: { id: string, name: string }) => (
                    <a href={`/rooms/${room.id}/`}><li key={room.id}>{room.name}</li></a>
                ))}
            </ul>
        </div>
    );
};

export default RoomListPage;