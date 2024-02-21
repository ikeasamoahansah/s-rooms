const createRoom = async (authorizationToken: string): Promise<void> => {
  try {
    const response = await fetch('https://your-backend-url/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
      body: JSON.stringify({ /* room data */ }),
    });

    if (response.ok) {
      console.log('Room created successfully!');
    } else {
      console.error('Failed to create room');
    }
  } catch (error) {
    console.error('An error occurred while creating the room:', error);
  }
};

// Usage
const authorizationToken = 'your-authorization-token';
createRoom(authorizationToken);
