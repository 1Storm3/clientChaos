import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // Добавление access-токена к каждому запросу
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
        const refreshResponse = await axios.post("/refresh");

        // Если обновление токена успешно, повторный запрос с новым access-токеном
        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.acess_token;
          // Сохранение нового access-токена
          localStorage.setItem("accessToken", newAccessToken);
          // Повторный запрос с обновленным токеном
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Обработка ошибки при обновлении токена
        console.error("Ошибка при обновлении токена:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
