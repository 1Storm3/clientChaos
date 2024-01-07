import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logout from "./Logout";
import styles from "../styles/Sign.module.css";
import { useAuth } from "./useAuth";
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
    // const isDisabled = Object.values(values).some((v) => !v);
    // if (isDisabled) {
    //   e.preventDefault();
    // }
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
      <div className={styles.container}>
        {isLoggedIn && <Logout onLogout={handleLogout} username={username} />}
        <h1 className={styles.heading}>
          <img
            src="https://i.imgur.com/XcdwWvj.png"
            width="120px"
            height="10px"
          />
        </h1>

        <form className={styles.form} onSubmit={handleClick}>
          <div className={styles.group}>
            {/* <input
              type="text"
              name="name"
              value={username}
              placeholder="Имя пользователя"
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              readOnly
              required
            /> */}
          </div>
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
        {/* <Link to={"/login"}>
          <button type="submit" className={styles.login}>
            Авторизация
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default Sign;
