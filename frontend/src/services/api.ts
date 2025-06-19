import axios from "axios";
import { TodoItem, ApiResponse } from "../types";

const API_BASE_URL = "http://backend:3001/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const todoApi = {
  async fetchAllTasks() {
    try {
      const response = await apiClient.get<ApiResponse<TodoItem[]>>(
        "/fetchAllTasks"
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw new Error("Failed to fetch todos");
    }
  },
};
