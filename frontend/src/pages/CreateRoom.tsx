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
      user:getUser()
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
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create Room</h2>
      <form onSubmit={handleCreateRoom}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Room Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Create Room</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
    
};

export default CreateRoom;