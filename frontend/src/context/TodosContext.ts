import React, { createContext, useContext } from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "../types";

interface TodosContextType {
  todos: TodoItem[];
  loading: boolean;
  error: string | null;
  refreshTodos: () => Promise<void>;
}

const TodosCtx = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const todosHook = useTodos(); // <-- Call the hook inside the component
  return React.createElement(
    TodosCtx.Provider,
    { value: todosHook },
    children
  );
};

export const useTodosContext = () => {
  const ctx = useContext(TodosCtx);
  if (!ctx)
    throw new Error("useTodosContext must be used within TodosProvider");
  return ctx;
};
