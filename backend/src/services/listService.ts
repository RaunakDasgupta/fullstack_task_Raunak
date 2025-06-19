import { redisService } from "./redisService";
import { mongoService } from "./mongoService";

import { TodoItem } from "../types";

export async function listService(redisKey: string): Promise<TodoItem[]> {
  try {
    // Get items from Redis
    const redisItems = await redisService.getAllItems(redisKey);
    const taskArray = redisItems.map(item => ({ description: item })).reverse();
    
    if (redisItems.length > 0) {
      console.info(`[INFO] Items retrieved from Redis with key: ${redisKey}`);
    }

    // If no items in Redis, get from MongoDB
    const mongoItems = await mongoService.getAllItems();
    
    console.info(`[INFO] Items retrieved from MongoDB`);
    const allItems = [...taskArray, ...mongoItems];
    const items = <TodoItem[]>[];
    allItems.forEach((item) => {
      const todoItem: TodoItem = {
        description: item.description,
      };
      items.push(todoItem);
    });

    return items;
  } catch (error) {
    console.error(`[ERROR] Error adding item to Redis or MongoDB:`, error);
    throw error;
  }
}
