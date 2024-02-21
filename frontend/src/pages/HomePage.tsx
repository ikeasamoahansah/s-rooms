import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../context/auth';

const HomePage = () => {
  const [desiredRoute, setDesiredRoute] = useState('');

  useEffect(() => {
    const fetchDesiredRoute = async () => {
        var token:string|null = getToken();
        try {
            // Make a request to the backend to get the desired route
            const response = await axios.get('http://127.0.0.1:8000/rooms/home/', {
            headers: {
                Authorization: `Authorization ${token}`,
            },
            });
            setDesiredRoute(response.data.desired_route);
            console.log(response.data);
            
        } catch (error) {
            console.error('Error fetching desired route:', error);
        }
    };

    fetchDesiredRoute();
  }, []);

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      <p>Desired Route: {desiredRoute}</p>
    </div>
  );
};

export default HomePage;
