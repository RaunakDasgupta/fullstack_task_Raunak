import React from "react";
import { useTodosContext } from "../context/TodosContext.ts";

const TodoList: React.FC = () => {
  const { todos, loading, error } = useTodosContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <div className="grid grid-cols-5 gap-3">
        {todos.map((todo) => (
          <div key={todo.description} className="note">
            <span>{todo.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
