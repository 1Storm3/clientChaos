import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import styles from "../styles/Sign.module.css";
import { useAuth } from "./useAuth";
import axios from "axios";
const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

const Sign = () => {
  const username = localStorage.getItem("username");
  const { signOut } = useAuth();

  const { NAME, ROOM } = FIELDS;

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });
  const navigate = useNavigate();
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    signOut();
  };

  const handleClick = (e) => {
    e.preventDefault();
    const isAuthenticated = !!localStorage.getItem("access_token");

    if (!isAuthenticated) {
      navigate("/");
    } else {
      navigate(`/chat?name=${username}&room=${values[ROOM]}`);
    }
  };

  return (
    <div className={styles.wrap}>
      {isLoggedIn && <Logout onLogout={handleLogout} username={username} />}
      <div className={styles.container}>
        <h1 className={styles.heading}>
          <img
            src="https://i.imgur.com/XcdwWvj.png"
            width="120px"
            height="10px"
          />
        </h1>

        <form className={styles.form} onSubmit={handleClick}>
          <div className={styles.group}></div>
          <div className={styles.group}>
            <input
              type="number"
              name="room"
              placeholder="Номер комнаты"
              value={values[ROOM]}
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Вход
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign;
