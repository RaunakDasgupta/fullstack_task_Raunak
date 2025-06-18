import React from "react";
import { CheckCircle, Circle, Clock, Database, Server } from "lucide-react";
import { TodoItem as TodoItemType } from "../types";
import { clsx } from "clsx";

interface TodoItemProps {
  todo: TodoItemType;
  isFromRedis?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isFromRedis = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={clsx(
        "card p-4 fade-in",
        "border-l-4",
        todo.completed ? "border-l-green-500" : "border-l-blue-500"
      )}
    >
      <div className="flex flex--between flex--center">
        <div className="flex flex--center flex--gap-4 flex-1">
          <div className="flex-shrink-0">
            {todo.completed ? (
              <CheckCircle className="text--success" size={20} />
            ) : (
              <Circle className="text--muted" size={20} />
            )}
          </div>

          <div className="flex-1">
            <p
              className={clsx(
                "text--base mb-2",
                todo.completed && "line-through text--muted"
              )}
            >
              {todo.description}
            </p>

            <div className="flex flex--center flex--gap-4 text--xs text--muted">
              <div className="flex flex--center flex--gap-2">
                <Clock size={12} />
                <span>Created {formatDate(todo.createdAt)}</span>
              </div>

              <div className="flex flex--center flex--gap-2">
                {isFromRedis ? (
                  <>
                    <Server size={12} />
                    <span>Redis Cache</span>
                  </>
                ) : (
                  <>
                    <Database size={12} />
                    <span>MongoDB</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div
            className={clsx(
              "px-2 py-1 rounded-full text--xs font-semibold",
              todo.completed
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            )}
          >
            {todo.completed ? "Completed" : "Pending"}
          </div>
        </div>
      </div>
    </div>
  );
};
