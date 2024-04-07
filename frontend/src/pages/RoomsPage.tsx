import React, { useEffect, useState } from 'react';

const RoomListPage: React.FC = () => {

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Join a room or create one</h1>
                <div className="flex space-x-4 items-center justify-center">
                    <div className="bg-blue-500 p-2 rounded text-white">
                    <a href="/rooms/join"><button type="button">Join room</button></a>
                    </div>
                    <div className="bg-red-600 p-2 rounded text-white">
                        <a href="/rooms/create"><button type="button">Create room</button></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomListPage;