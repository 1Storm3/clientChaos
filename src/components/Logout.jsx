import React from "react";
import { useNavigate } from "react-router-dom";
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
            Authorization: ` ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        setProfilePic(response.data.fileData);
        console.log(response);
      })
      .catch((error) => {
        console.error(" error infi", error);
      });
  }, [username]);
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
        <button className={styles.profile} onClick={handleProfile}>
          Профиль
        </button>
        <div className={styles.profileUser}>
          <div className={styles.user}>
            {username}
            {profilePic && (
              <img
                id={styles.photo}
                src={`https://chaoschat.onrender.com/${profilePic}`}
                alt=""
              />
            )}
          </div>
          <button onClick={handleLogout} className={styles.logout}>
            Выход
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
