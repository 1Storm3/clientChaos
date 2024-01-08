import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/Profile.module.css";
const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.user}></div>
        <Link to={"/sign"}>
          <div className={styles.linkToSign}>Вход в чат</div>
        </Link>
        <div className={styles.loadPhoto}>Загрузка фото</div>
        <input type="file"></input>
      </div>
    </div>
  );
};

export default Profile;
