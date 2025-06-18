
import { TodoItem } from "./TodoItem";
import { TodoItem as TodoItemType } from "../types";
import { Package, AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

interface TodoListProps {
  todos: TodoItemType[];
  loading: boolean;
  error: string | null;
  redisCount: number;
}

interface TodoListProps {
  // No longer need todos, loading, error, redisCount as props
}

export const TodoList: React.FC<TodoListProps> = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [redisCount, setRedisCount] = useState<number>(0);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:3001/api/fetchAllTasks");
        if (!res.ok) throw new Error("Failed to fetch todos");
        const data = await res.json();
        setTodos(data.data);
        setRedisCount(data.redisCount ?? 0);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-muted">Loading your todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto mb-4 text-danger" size={48} />
        <h3 className="text-lg mb-2 text-danger">Error Loading Todos</h3>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto mb-4 text-muted" size={48} />
        <h3 className="text-lg mb-2">No Todos Yet</h3>
        <p className="text-muted">
          Send a message to the{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">/add</code> topic to
          create your first todo!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl mb-4">Your Todos ({todos.length})</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="card p-4 text-center">
            <div className="text-2xl mb-2">🗄️</div>
            <div className="text-sm text-muted">In Redis Cache</div>
            <div className="text-lg font-semibold text-primary">
              {redisCount}
            </div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl mb-2">🗃️</div>
            <div className="text-sm text-muted">In MongoDB</div>
            <div className="text-lg font-semibold text-primary">
              {todos.length - redisCount}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isFromRedis={index < redisCount}
          />
        ))}
      </div>
    </div>
  );
};
