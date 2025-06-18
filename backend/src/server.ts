import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { Server } from "socket.io";

import { connectRedis, disconnectRedis } from "./config/redis";
import * as redisService from "./services/redisService";
import * as mongoService from "./services/mongoService";
import { database } from "./config/database";
import todoRoutes from "./routes/todoRoutes";
import { addService } from "./services/addService";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", todoRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Initialize connections and start server
async function startServer(): Promise<void> {
  try {
    // Connect to databases
    await connectRedis();
    await database.connect();

    const httpServer = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });

    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("add", async (item) => {
        console.log("Adding item:", item);
        console.log("Socket.IO add event received:", item);
        const redisKey = `FULLSTACK_TASK_Raunak`;
        await addService(redisKey, item);
        console.log(`Item added to Redis list with key: ${redisKey}`);
        const itemCount = await redisService.getItemCount(redisKey);
        console.log("Item count in Redis:", itemCount);

        // if (typeof itemCount === "number" && itemCount > 50) {
        //   console.log("Moving items to MongoDB");
        //   const items = await redisService.getAllItems(redisKey);
        //   await mongoService.addItems(items);
        //   await redisService.clearItems(redisKey);
        //   console.log("Items moved to MongoDB and Redis cleared");
        // }

        io.emit("update", redisService.getAllItems(redisKey));
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
      });

      console.log("Socket.IO connection established");
    });

    // Start HTTP server
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n Shutting down...");

  try {
    await disconnectRedis();
    await database.disconnect();
    console.log(" All connections closed");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});

process.on("SIGTERM", async () => {
  console.log(" SIGTERM received, shutting down...");
  await disconnectRedis();
  await database.disconnect();
  process.exit(0);
});

// Start the server
startServer();
