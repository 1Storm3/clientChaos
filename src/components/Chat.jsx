import React from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useAuth } from "./useAuth";
import icon from "../images/emoji.svg";
import styles from "../styles/Chat.module.css";
import Messages from "./Messages";
import axios from "axios";

const socket = io.connect("https://chat-online-kjxa.onrender.com");
// const socket = io.connect("http://localhost:81");

const Chat = () => {
  const { username } = useAuth();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState({ room: "", name: "" });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);
  useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit("leftRoom", { params });

    navigate("/sign", { state: { username } });
  };

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };
  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  return (
    <div className={styles.wrap}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>
      <div className={styles.header}>
        <div className={styles.title}>Комната: {params.room}</div>
        <div className={styles.users}> Участников: {users}</div>
        <button className={styles.left} onClick={leftRoom}>
          Покинуть комнату
        </button>
      </div>

      <div className={styles.messages}>
        <Messages
          messages={state}
          name={params.name}
          time={state}
          socket={socket}
        />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="Напишите сообщение"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.emoji}>
          <img src={icon} alt="" onClick={() => setOpen(!isOpen)} />

          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className={styles.button}>
          <input
            id="response"
            type="image"
            width="24"
            height="24"
            src="https://img.icons8.com/material-sharp/24/sent.png"
            alt="sent"
            onSubmit={handleSubmit}
            value="Отправить сообщение"
          />
        </div>
      </form>
    </div>
  );
};

export default Chat;
