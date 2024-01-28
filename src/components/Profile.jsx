import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/Profile.module.css";
import axios from "axios";
const Profile = () => {
  const username = localStorage.getItem("username");

  const [selectedFile, setSelectedFile] = useState(null);

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
        alert("Фото обновлено");
      })
      .catch((error) => {
        console.error("error load file", error);
      });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.user}></div>
        <Link to={"/sign"}>
          <div className={styles.linkToSign}>Назад</div>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.profilePhoto}>
          <label className={styles.inputFile}>
            <input type="file" onChange={onChangeHandler}></input>
            <span>Выберите файл</span>
          </label>
          <button className={styles.button} onClick={onClickHandler}>
            Загрузить фото
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
