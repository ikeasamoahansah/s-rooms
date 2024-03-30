import React, { useEffect, useState } from 'react';
import api from '../api';
import Rooms from '../components/rooms/Rooms';

const RoomListPage: React.FC = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            var route = "/api/rooms/";
            try {
                const response = await api.get(route, {});
                setRooms(response.data);
            } catch(error) {
                alert("An error occured!");
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