export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
