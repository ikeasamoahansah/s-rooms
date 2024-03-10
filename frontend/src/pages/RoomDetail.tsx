import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from '../context/auth';
import ChatInterface from '../components/rooms/ChatInterface';

function RoomDetail(){
    const [room, setRoom] = React.useState({} as any);
    const {id} = useParams();
    
    React.useEffect(() => {
        
        async function fetchRoom() {
            var token:string | null = getToken();
            const url = `http://127.0.0.1:8000/rooms/${id}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `token ${token}`
                    }
                });
                console.log(response.data);
                             
                setRoom(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRoom();
    }, []);

    return (
        <div>
            <h1>{room.name}</h1>
            {room.messages && <ChatInterface messages={room.messages} roomId={room.id}/>}
        </div>
    )
}

export default RoomDetail;
