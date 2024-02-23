import { Link } from "react-router-dom";

interface RoomsProps {
    room: {
        id: string,
        name: string
    }
}

function Rooms(props: RoomsProps) {

    const {room} = props;
    
    return (
        <div>
        <ul>
            <Link to={`${room.id}`}>
            <li>{room.name}</li>
            </Link>
        </ul>
        </div>
    );
}

export default Rooms;