import { createClient } from "redis";

const redisConfig = {
  socket: {
    host: "redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 12675,
  },
  username: "default",
  password: "dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB",
};

export const redisClient = createClient(redisConfig);

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    console.log("✅ Connected to Redis successfully");
  } catch (error) {
    console.error("❌ Redis connection error:", error);
    throw error;
  }
};

export const disconnectRedis = async (): Promise<void> => {
  try {
    await redisClient.disconnect();
    console.log("✅ Disconnected from Redis");
  } catch (error) {
    console.error("❌ Redis disconnection error:", error);
  }
};
