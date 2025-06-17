import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./redux/todoSlice";
import { RootState } from "./redux/store";
import { v4 as uuidv4 } from "uuid";
import { FaRegFileAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      const newTodo = {
        id: uuidv4(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(addTodo(newTodo));
      setText(() => "");
    }
  };

  return (
    <div className="app">
      <div className="note-app">
        <div className="header">
          <FaRegFileAlt className="icon" />
          <h1>Note App</h1>
        </div>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="input-container">
            <input
              key={todos.length}
              type="text"
              className="input"
              placeholder="New Note..."
              defaultValue={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="add-button">
              <AiOutlinePlus className="add-icon" />
              Add
            </button>
          </div>
        </form>
        <div className="notes-container">
          <h2>Notes</h2>
          <div className="grid grid-cols-5 gap-3">
            {todos.map((todo) => (
              <div key={todo.id} className="note">
                <span>{todo.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
