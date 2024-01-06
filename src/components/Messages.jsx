import React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Messages.module.css";

const Messages = ({ messages, name, time, socket }) => {
  const [messageRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);

  const messagesRef = useRef(null);
  useEffect(() => {
    socket.on("receive_message", (newMessages) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: newMessages.message,
          username: newMessages.username,
          time: newMessages.timedata,
        },
      ]);
    });
    return () => socket.off("receive_message");
  }, [socket]);
  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("last_100_messages", (last100Messages) => {
      last100Messages = JSON.parse(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off("last_100_messages");
  }, [socket]);

  const scrollBotDB = () => {
    messagesColumnRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollBotDB();
  }, [messageRecieved]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.messages}>
      {messageRecieved.map((message, i) => (
        <div key={i} className={`${styles.messages} ${styles.user}`}>
          <div>
            <span className={styles.user}>{message.username}</span>
            <div className={styles.text}>{message.message}</div>
            <span className={styles.time}>{message.timedata}</span>
            <div ref={messagesColumnRef} />
          </div>
        </div>
      ))}
      {messages.map(({ user, message, time }, i) => {
        const itsMe =
          user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? styles.me : styles.user;

        return (
          <div key={i} className={`${styles.message} ${className}`}>
            <div ref={messagesRef} />
            <span className={styles.user}>{user.name}</span>
            <div className={styles.text}>{message}</div>
            <span className={styles.time}>{time}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
