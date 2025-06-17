import { Request, Response } from "express";
import { ApiResponse, TodoItem } from "../types";
import * as redisService from "../services/redisService";
import * as mongoService from "../services/mongoService";

const redisKey = `FULLSTACK_TASK_Raunak`;

export class TodoController {
  async fetchAllTasks(req: Request, res: Response): Promise<void> {
    try {
      let todos: TodoItem[] | [] = await mongoService.getAllTodos();

      if (!todos || todos?.length === 0) {
        const items: any[] = Array.isArray(redisService.getAllItems(redisKey))
          ? (redisService.getAllItems(redisKey) as unknown as any[])
          : [];
        todos = items
          ? items?.map((item: any) => ({
              id: item.id,
              text: item.text,
              completed: item.completed,
              createdAt: item.createdAt ?? new Date().toISOString(),
              updatedAt: item.updatedAt ?? new Date().toISOString(),
            }))
          : [];
      }

      const response: ApiResponse<TodoItem[]> = {
        success: true,
        data: todos,
        message: `Retrieved ${todos.length} todos`,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching todos:", error);
      const response: ApiResponse<never> = {
        success: false,
        error: "Failed to fetch todos",
      };
      res.status(500).json(response);
    }
  }

  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = {
        totalTodos: 0,
        inRedis: 0,
        inMongoDB: 0,
        completed: 0,
        pending: 0,
      };

      const response: ApiResponse<typeof stats> = {
        success: true,
        data: stats,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching stats:", error);
      const response: ApiResponse<never> = {
        success: false,
        error: "Failed to fetch stats",
      };
      res.status(500).json(response);
    }
  }
}

export const todoController = new TodoController();
