import { useAuth } from '../context/auth';

const HomePage = () => {

  const {logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
