import React, { createContext, useContext, useState } from "react";

// Создаем контекст для аутентификации
const AuthContext = createContext();

// Компонент-обертка для предоставления данных об аутентификации
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const signIn = (token, username) => {
    localStorage.setItem("access_token", token);
    setIsLoggedIn(true);
  };
  const signOut = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };
  const authData = {
    isLoggedIn,
    signIn,
    signOut,
    // Другие данные или функции для аутентификации
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

// Хук useAuth для использования информации об аутентификации
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
