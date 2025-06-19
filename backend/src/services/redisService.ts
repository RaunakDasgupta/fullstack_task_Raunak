import { redisClient } from "../config/redis";
import { TodoItem } from "../types";

const REDIS_KEY = "FULLSTACK_TASK_CLAUDE"; // Replace CLAUDE with your first name

export class RedisService {
  async addTodo(todo: TodoItem): Promise<void> {
    try {
      const existingTodos = await this.getAllTodos();
      existingTodos.push(todo);
      await redisClient.set(REDIS_KEY, JSON.stringify(existingTodos));
      console.info(`[INFO] Todo added to Redis cache with key: ${REDIS_KEY}`);
    } catch (error) {
      console.error(`[ERROR] Error adding todo to Redis:`, error);
      throw error;
    }
  }

  async getAllTodos(): Promise<TodoItem[]> {
    try {
      const todosString = await redisClient.get(REDIS_KEY);
      return todosString ? JSON.parse(todosString) : [];
    } catch (error) {
      console.error(`[ERROR] Error getting todos from Redis:`, error);
      return [];
    }
  }

  async clearTodos(): Promise<void> {
    try {
      await redisClient.del(REDIS_KEY);
    } catch (error) {
      console.error(`[ERROR] Error clearing todos from Redis:`, error);
      throw error;
    }
  }

  async getTodoCount(): Promise<number> {
    const todos = await this.getAllTodos();
    return todos.length;
  }

  async addItem(key: string, item: any): Promise<void> {
    try {
      await redisClient.rPush(key, JSON.stringify(item));
      console.info(`[INFO] Item added to Redis cache with key: ${key}`);
    } catch (error) {
      console.error(`[ERROR] Error adding item to Redis:`, error);
      throw error;
    }
  }

  async getItemCount(key: string): Promise<number> {
    try {
      const itemsString = await redisClient.lLen(key);
      return itemsString;
    } catch (error) {
      console.error(`[ERROR] Error getting item count from Redis:`, error);
      return 0;
    }
  }

  async getAllItems(key: string): Promise<any[]> {
    try {
      const itemsString = await redisClient.lRange(key, 0, -1);
      return itemsString.map((item) => JSON.parse(item));
    } catch (error) {
      console.error(`[ERROR] Error getting all items from Redis:`, error);
      return [];
    }
  }

  async clearItems(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (error) {
      console.error(`[ERROR] Error clearing items from Redis:`, error);
      throw error;
    }
  }
}

export const redisService = new RedisService();
export async function addItem(redisKey: string, item: any) {
  const tasks = await redisService.addItem(redisKey, item);
  return tasks;
}

export async function getItemCount(redisKey: string) {
  const count = await redisService.getItemCount(redisKey);
  return count;
}

export async function getAllItems(redisKey: string) {
  const items = await redisService.getAllItems(redisKey);
  return items;
}

export function clearItems(redisKey: string) {
  return redisService.clearItems(redisKey);
}
