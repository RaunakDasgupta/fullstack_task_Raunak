import { Router } from "express";
import { todoController } from "../controllers/todoController";

const router = Router();

// GET /api/fetchAllTasks - Retrieve all todos
router.get("/fetchAllTasks", todoController.fetchAllTasks.bind(todoController));

// GET /api/stats - Get statistics
router.get("/stats", todoController.getStats.bind(todoController));

export default router;
