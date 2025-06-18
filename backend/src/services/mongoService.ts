import { database } from "../config/database";
import { TodoItem } from "../types";

export class MongoService {
  async saveTodos(todos: TodoItem[]): Promise<void> {
    try {
      await database.insertMany(todos);
      console.log(` Saved ${todos.length} todos to MongoDB`);
    } catch (error) {
      console.error("Error saving todos to MongoDB:", error);
      throw error;
    }
  }

  async getAllTodos(): Promise<TodoItem[] | []> {
    try {
      return await database.findAll();
    } catch (error) {
      console.error("Error getting todos from MongoDB:", error);
      return [];
    }
  }

  async addItems(items: any[]): Promise<void> {
    try {
      await database.insertMany(items);
    } catch (error) {
      console.error("Error adding items to MongoDB:", error);
      throw error;
    }
  }
}

export const mongoService = new MongoService();
export function addItems(items: any) {
  throw new Error("Function not implemented.");
}
export function getAllTodos(): TodoItem[] | PromiseLike<TodoItem[]> {
  throw new Error("Function not implemented.");
}
