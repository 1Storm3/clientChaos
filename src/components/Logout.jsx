import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Logout.module.css";
const Logout = ({ onLogout, username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div>
      <div className={styles.user}>{username}</div>
      <button onClick={handleLogout} className={styles.logout}>
        Выход
      </button>
    </div>
  );
};

export default Logout;
