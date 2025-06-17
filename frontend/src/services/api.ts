import axios from "axios";
import { TodoItem, ApiResponse, TodoStats } from "../types";

const API_BASE_URL = "/api";

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
  async fetchAllTasks(): Promise<TodoItem[]> {
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

  async getStats(): Promise<TodoStats> {
    try {
      const response = await apiClient.get<ApiResponse<TodoStats>>("/stats");
      return (
        response.data.data || {
          totalTodos: 0,
          inRedis: 0,
          inMongoDB: 0,
          completed: 0,
          pending: 0,
        }
      );
    } catch (error) {
      console.error("Error fetching stats:", error);
      throw new Error("Failed to fetch stats");
    }
  },
};
