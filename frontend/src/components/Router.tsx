import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Rooms from "../components/rooms/Rooms";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<Rooms />} />
        </Routes>
        </BrowserRouter>
    );
}

export default Router;