import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sign from "./Sign";
import Chat from "./Chat";
import Login from "./Login";
import Start from "./Start";
import Register from "./Register";
import { useAuth } from "./useAuth";

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route
        path="/sign"
        element={isLoggedIn ? <Sign /> : <Navigate to="/login" />}
      />
      <Route
        path="/chat"
        element={isLoggedIn ? <Chat /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
