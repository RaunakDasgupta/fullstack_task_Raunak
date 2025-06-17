import { useState, useEffect, useCallback } from "react";
import { todoApi } from "../services/api";
import { TodoItem } from "../types";

interface UseTodosReturn {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    await Promise.all([refreshTodos()]);
    setLoading(false);
  }, [refreshTodos]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    todos,
    loading,
    error,
    refreshTodos,
  };
};
