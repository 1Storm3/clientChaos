import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sign from "./Sign";
import Chat from "./Chat";
import Login from "./Login";
import Start from "./Start";
import Register from "./Register";
import { useAuth } from "./useAuth";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route
        path="/sign"
        element={isAuthenticated ? <Navigate to="/login" /> : <Sign />}
      />
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
