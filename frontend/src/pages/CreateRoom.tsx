import React from "react";
import { useNavigate } from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import { getToken, getUser } from "../context/auth";

interface data {
  name: string;
  user: number;
}

const CreateRoom: React.FC = () => {
  const history = useNavigate();
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState<string | null>('');

  const handleCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var token:string | null = getToken();
    const url = 'http://127.0.0.1:8000/rooms/create/';

    const postData: object = {
      name: name,
      user: (await getUser())?.id
    };

    try {
      const response: AxiosResponse<data> = await axios.post(url, postData, {
        headers: {
          Authorization: `token ${token}`
        }
      });
      console.log(response.data);
      history('/rooms');
    } catch (error) {
      console.error('Error creating room', error);
      setError('Error creating room');
    }

  }

  return (
    <form onSubmit={handleCreateRoom}>
      <div>
        <label htmlFor="name">Room Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)} />
      </div>
      <button type="submit">Create Room</button>
      {error && <p>{error}</p>}
    </form>
  );
    
};

export default CreateRoom;