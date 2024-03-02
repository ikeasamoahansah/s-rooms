import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import RoomDetail from './pages/RoomDetail';
import CreateRoom from './pages/CreateRoom';


function App() {

  return (
    <>
      <Signup/>
      <Login/>
      <HomePage/>
      <RoomDetail/>
      <CreateRoom/>
    </>
  )
}

export default App
