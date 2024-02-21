import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/rooms" element={<HomePage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default Router;