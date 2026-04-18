import axios from "axios";
import { API_URL } from "./constants";

// Tạo axios instance đơn giản cho web công cộng
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  // Vẫn giữ withCredentials nếu backend cần đọc cookies khác
  withCredentials: true,
});

// Response Interceptor - Chỉ gỡ dữ liệu data nếu thành công
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Xử lý các lỗi khác
    const errorMessage = error.response?.data || error.message || "Đã xảy ra lỗi";
    return Promise.reject(errorMessage);
  }
);

export default api;
