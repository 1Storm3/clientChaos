import styles from "../styles/Register.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [existUser, setExistUser] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://chaoschat.onrender.com/register",
        // "http://localhost:81/register",
        {
          username,
          password,
          email,
        }
      );
      console.log(response.data, response.status);
      if (response.status === 200) {
        setRegistrationSuccess(true);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setExistUser(
          "Пользователь с таким именем уже существует или почта занята!"
        );
        setUsername("");
        setEmail("");
      } else {
        console.error("eror registration", error);
        setErrorMessage("Ошибка при регистрации,пожалуйста попробуйте ещё");
      }
    }
  };
  const closeSuccessMessage = () => {
    setRegistrationSuccess(false);
    setRedirectToLogin(true);
  };
  if (redirectToLogin) {
    navigate("/login");
  }
  return (
    <div>
      <h1 className={styles.heading}>
        <img
          alt="drop"
          src="https://i.imgur.com/XcdwWvj.png"
          width="120px"
          height="10px"
        />
      </h1>
      <form className={styles.form} onSubmit={handleRegistration}>
        <div className={styles.group}>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="password"
            placeholder="Пароль"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="text"
            placeholder="Электронный адрес"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
            value={email}
          />
        </div>

        <button type="submit" className={styles.button}>
          Регистрация
        </button>
        <Link to={"/"}>
          <button className={styles.button}>Назад</button>
        </Link>
      </form>
      {registrationSuccess && (
        <div classname={styles.sucсessReg}>
          <p className={styles.register}>
            Регистрация успешна, подтвердите почту
          </p>
          <button onClick={closeSuccessMessage} className={styles.login}>
            Перейти на вход
          </button>
        </div>
      )}
      {existUser && (
        <p
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
          {existUser}
        </p>
      )}
      {errorMessage && (
        <p
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
        </p>
      )}
    </div>
  );
};

export default Register;
