import { useState, useEffect, useCallback } from "react";
import { todoApi } from "../services/api";
import { TodoItem } from "../types";

export interface UseTodosReturn {
  todos: TodoItem[];
  loading: boolean;
  error: string | null;
  refreshTodos: () => Promise<void>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTodos = useCallback(async () => {
    try {
      setError(null);
      const fetchedTodos = await todoApi.fetchAllTasks();
      setTodos(fetchedTodos);
      setLoading(false);
      console.info("[INFO] Todos fetched successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  }, []);

  // const fetchData = useCallback(async () => {
  //   setLoading(true);
  //   await Promise.all([refreshTodos()]);
  //   setLoading(false);
  // }, [refreshTodos]);
  useEffect(() => {
    refreshTodos();
  }, [refreshTodos]);

  return {
    todos,
    loading,
    error,
    refreshTodos,
  };
};
