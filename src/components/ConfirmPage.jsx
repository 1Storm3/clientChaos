import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    console.log(token);
    if (token) {
      axios
        .post("https://chaoschat.onrender.com/confirm", { token })
        .then((response) => {
          console.log("Подтверждение выполнено:", response.data);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Ошибка подтверждения:", error);
        });
    }
  }, [location.search]);

  return (
    <div>
      <p>Эта страница используется для подтверждения регистрации.</p>
    </div>
  );
};

export default ConfirmPage;
