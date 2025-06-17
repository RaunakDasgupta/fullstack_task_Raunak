import { useState, useEffect, useCallback } from "react";
import { todoApi } from "../services/api";
import { TodoItem, TodoStats } from "../types";

interface UseTodosReturn {
  todos: TodoItem[];
  stats: TodoStats | null;
  loading: boolean;
  error: string | null;
  refreshTodos: () => Promise<void>;
  refreshStats: () => Promise<void>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [stats, setStats] = useState<TodoStats | null>(null);
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

  const refreshStats = useCallback(async () => {
    try {
      const fetchedStats = await todoApi.getStats();
      setStats(fetchedStats);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    await Promise.all([refreshTodos(), refreshStats()]);
    setLoading(false);
  }, [refreshTodos, refreshStats]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    todos,
    stats,
    loading,
    error,
    refreshTodos,
    refreshStats,
  };
};
