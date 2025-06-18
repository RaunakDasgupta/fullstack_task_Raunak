import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import io, { Socket } from "socket.io-client";
import { useTodos } from "../hooks/useTodos";

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, loading, error, refreshTodos } = useTodos();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    refreshTodos();
  }, [refreshTodos]);

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

    // Listen for new todo items from the server
    newSocket.on("add", (data) => {
      // Assuming data is a todo object
      dispatch(addTodo(data));
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [dispatch]);

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
        {todos
          .map((todo) => (
            <div key={todo.description} className="note">
              <span>{todo.description}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoList;
