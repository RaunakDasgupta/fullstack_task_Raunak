import { database } from "../config/database";
import { TodoItem } from "../types";

import Task from "../schema/tasks";
export class MongoService {
  async addItems(todos: String[]): Promise<void> {

    try {
      var items = <any>[];
      todos.map((todo) => {
        const todoItem = new Task({ description: todo});
        items.push(todoItem);
      });

      await Task.insertMany(items);
      console.info(`[INFO] Saved ${items.length} todos to MongoDB`);
    } catch (error) {
      console.error(`[ERROR] Error saving todos to MongoDB:`, error);
      throw error;
    }
  }

  async getAllItems(): Promise<TodoItem[] | []> {
    try {
      return await Task.find({});
    } catch (error) {
      console.error(`[ERROR] Error getting items from MongoDB:`, error);
      return [];
    }
  }
}

export const mongoService = new MongoService();
export function addItems(items: any) {
  return mongoService.addItems(items);
}
export function getAllItems(): TodoItem[] | PromiseLike<TodoItem[]> {
  return mongoService.getAllItems();
}
