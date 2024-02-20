import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        </BrowserRouter>
    );
}

export default Router;