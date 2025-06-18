import { Request, Response } from "express";
import { ApiResponse, TodoItem } from "../types";
import * as redisService from "../services/redisService";
import * as mongoService from "../services/mongoService";
import { listService } from "../services/listService";

const redisKey = `FULLSTACK_TASK_Raunak`;

export class TodoController {
  async fetchAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const todos = await listService(redisKey);
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
}

export const todoController = new TodoController();
