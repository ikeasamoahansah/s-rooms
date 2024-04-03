import React, { useEffect, useState } from 'react';
import api from '../api';
import Rooms from '../components/rooms/Rooms';

const RoomListPage: React.FC = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = () => {
        api
            .get("/api/rooms/home")
            .then((res) => res.data)
            .then((data) => { setRooms(data); console.log(data)})
            .catch((err) => alert(err));
    };

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
            <div className="mx-auto max-w-md">
                <ul className="grid grid-cols-1 gap-4">
                    {rooms.length === 0 ? (
                        <p>No rooms available</p>
                    ) : (
                        rooms.map((room: { id: string, name: string }, index: number) => (
                            <div key={index} className="bg-gray-200 p-4 rounded-lg">
                                <Rooms room={room}/>
                            </div>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default RoomListPage;