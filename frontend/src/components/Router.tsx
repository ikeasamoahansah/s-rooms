import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import RoomListPage from "../pages/RoomsPage";
import RoomDetail from "../pages/RoomDetail";
import CreateRoom from "../pages/CreateRoom";
import JoinRoom from "../pages/JoinRoomPage";
import ProtectedRoute from "../context/ProtectedRoute";

const Router = () => {
    return (
        <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/rooms" 
                    element={
                        <ProtectedRoute>
                            <RoomListPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/rooms/create" 
                    element={
                        <ProtectedRoute>
                            <CreateRoom />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/rooms/:id" 
                    element={
                        <ProtectedRoute>
                            <RoomDetail />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/rooms/join" 
                    element={
                        <ProtectedRoute>
                            <JoinRoom />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </AuthProvider>
        </BrowserRouter>
    );
}

export default Router;