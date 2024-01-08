import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Logout.module.css";
const Logout = ({ onLogout, username }) => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.user}>{username}</div>
        <button className={styles.profile} onClick={handleProfile}>
          Профиль
        </button>
        <button onClick={handleLogout} className={styles.logout}>
          Выход
        </button>
      </div>
    </div>
  );
};

export default Logout;
