export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface TodoStats {
  totalTodos: number;
  inRedis: number;
  inMongoDB: number;
  completed: number;
  pending: number;
}
