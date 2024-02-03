import axios from "axios";
const axiosInstance = axios.create({
  // "http://localhost:81"

  baseURL: "https://chaoschat.onrender.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Добавление access-токена к каждому запросу
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехватчик ответов
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // Проверка на код ошибки "Unauthorized" (401)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Запрос на обновление access-токена при ошибке "Unauthorized"
        const accessToken = localStorage.getItem("access_token");
        const refreshResponse = await axios.post(
          "https://chaoschat.onrender.com/refresh",
          {
            accessToken,
          },
          { withCredentials: true }
        );

        // Если обновление токена успешно, повторный запрос с новым access-токеном
        const newAccessToken = refreshResponse.data.access_token;
        // Сохранение нового access-токена
        localStorage.setItem("access_token", newAccessToken);
        // Повторный запрос с обновленным токеном
        originalRequest.headers.Authorization = ` ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Обработка ошибки при обновлении токена
        console.error("Ошибка при обновлении токена:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
