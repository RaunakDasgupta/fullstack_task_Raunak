import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { AiOutlinePlus } from "react-icons/ai";
import "./App.css";
import TodoList from "./components/TodoList.tsx";
import io, { Socket } from "socket.io-client";
import { useTodosContext } from "./context/TodosContext.ts";

function App() {
  const [description, setDescription] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { refreshTodos } = useTodosContext();

  useEffect(() => {
    const newSocket = io("http://35.154.65.190:3001", {
      autoConnect: true,
    });

    newSocket.on("connect", () => {
      console.info("[INFO] Connected to server");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.info("[INFO] Disconnected from server");
      setIsConnected(false);
    });

    newSocket.on("update", async () => {
      console.info("[INFO] Update received from server");
      await refreshTodos();
    });

    newSocket.on("connect_error", (error) => {
      console.error("[ERROR] Connection error:", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && socket && isConnected) {
      socket.emit("add", description);
      setDescription("");
      await refreshTodos();
      console.info("[INFO] Note added:", description);
    } else {
      console.error("[ERROR] Socket not connected or description is empty");
    }
  };

  return (
    <div className="app">
      <div className="note-app">
        <div className="header">
          <img src={logo} alt="Note App Logo" className="icon" />
          <h1>Note App</h1>
        </div>
        <form onSubmit={handleSubmit} className="add-form">
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
        </form>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
