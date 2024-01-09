import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Logout.module.css";

import { useEffect, useState } from "react";
import axios from "axios";

const Logout = ({ onLogout, username }) => {
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(
        "https://chaoschat.onrender.com/load",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        setProfilePic(response.data.fileData);
      })
      .catch((error) => {
        console.error(" error infi", error);
      });
  }, []);
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
        <div className={styles.user}>
          {username}
          {profilePic && (
            <img
              id={styles.photo}
              src={`https://chaoschat.onrender.com/${profilePic}`}
              alt="Фотография профиля"
              // style={{ width: "200px", height: "auto", borderRadius: "100px" }}
            />
          )}
        </div>

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
