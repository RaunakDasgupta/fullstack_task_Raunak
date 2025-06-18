import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../../.env` });

const redisConfig = {
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
  username: "default",
  password: process.env.REDIS_PASSWORD || "",
};

export const redisClient = createClient(redisConfig);

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    console.log(" Connected to Redis successfully");
  } catch (error) {
    console.error(" Redis connection error:", error);
    throw error;
  }
};

export const disconnectRedis = async (): Promise<void> => {
  try {
    await redisClient.disconnect();
    console.log(" Disconnected from Redis");
  } catch (error) {
    console.error(" Redis disconnection error:", error);
  }
};
