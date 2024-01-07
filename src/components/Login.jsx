import React from "react";
import styles from "../styles/Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./configAxios";
import { useAuth } from "./useAuth";

const Login = () => {
  const { signIn } = useAuth();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(
        "https://chaoschat.onrender.com/login",
        // "http://localhost:81/login",
        {
          password,
          username,
        }
      );
      if (response.data.message === "true") {
        const token = response.data.access_token;
        signIn(token, username);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("username", response.data.username);
        navigate("/sign");
      } else {
        setErrorMessage("Пароль неверный");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrorMessage("Неверные данные или почта не подтверждена!");
        setPassword("");
      } else {
        console.error("error", error);
      }
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          <img
            src="https://i.imgur.com/XcdwWvj.png"
            width="120px"
            height="10px"
          />
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Логин"
            className={styles.input}
            autoComplete="off"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={styles.input}
            autoComplete="off"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.submit}>
            Войти
          </button>
        </form>
        <Link to={"/"}>
          <button className={styles.button}>Назад</button>
        </Link>
        {errorMessage && (
          <div
            style={{
              color: "black",
              backgroundColor: "#ffe6e6",
              padding: "10px",
              border: "1px solid #ff4d4d",
              borderRadius: "10px",
              margin: "10px 0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
