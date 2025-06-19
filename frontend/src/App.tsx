import React, { useEffect, useState } from "react";
import  logo from "../assets/icons8-notes-app 1.png"
import { AiOutlinePlus } from "react-icons/ai";
import "./App.css";
import TodoList from "./components/TodoList.tsx";
import io, { Socket } from "socket.io-client";
import { useTodosContext } from "./context/TodosContext.ts";

function App() {
  const [description, setDescription] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const { refreshTodos } = useTodosContext();

  

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      autoConnect: true,
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
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
      console.log("Note added:", description);
    } else {
      console.error("Socket not connected or description is empty");
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
