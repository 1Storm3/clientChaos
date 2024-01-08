import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/Profile.module.css";
import axios from "axios";
const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const username = localStorage.getItem("username");

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onClickHandler = () => {
    const formData = new FormData();

    formData.append("photo", selectedFile);
    axios
      .post("https://chaoschat.onrender.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        params: { username },
      })
      .then((response) => {
        console.log(response);
        setFilePath(response.data.fileData.filepath);
      })
      .catch((error) => {
        console.error("error load file", error);
      });
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.user}></div>
        <Link to={"/sign"}>
          <div className={styles.linkToSign}>Назад</div>
        </Link>
        <input type="file" onChange={onChangeHandler}></input>
        <button className={styles.button} onClick={onClickHandler}>
          Загрузить фото
        </button>
        {filePath && (
          <div>
            <h2>Фото профиля</h2>
            <img
              src={`https://chaoschat.onrender.com/${filePath}`}
              alt="Загруженное изображение"
              style={{ width: "300px", height: "auto" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
