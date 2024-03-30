import React from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

function RoomDetail(){
    const [room, setRoom] = React.useState({} as any);
    const {id} = useParams();
    
    React.useEffect(() => {
        
        async function fetchRoom() {
            const url = `api/rooms/${id}`;
            try {
                const response = await api.get(url, {});
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
            {/* {room.messages && <ChatInterface messages={room.messages} roomId={room.id}/>} */}
        </div>
    )
}

export default RoomDetail;
