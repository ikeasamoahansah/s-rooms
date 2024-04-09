import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import RoomListPage from "../pages/RoomsPage";
import RoomDetail from "../pages/RoomDetail";
import CreateRoom from "../pages/CreateRoom";
import JoinRoom from "../pages/JoinRoomPage";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomListPage />} />
            <Route path="/rooms/create" element={<CreateRoom />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/rooms/join" element={<JoinRoom/>}/>
        </Routes>
        </BrowserRouter>
    );
}

export default Router;