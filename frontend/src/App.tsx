import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./redux/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { FaRegFileAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import "./App.css";
import TodoList from "./components/TodoList.tsx";

function App() {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      const newTodo = {
        id: uuidv4(),
        description,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(addTodo(newTodo));
      setDescription("");
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
              type="text"
              className="input"
              placeholder="New Note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="add-button">
              <AiOutlinePlus className="add-icon" />
              Add
            </button>
          </div>
        </form>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
