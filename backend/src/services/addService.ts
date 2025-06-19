import { redisService } from "./redisService";
import { mongoService } from "./mongoService";

export async function addService(redisKey: string, item: any): Promise<void> {
  try {
    // Check the number of items in Redis
    const cacheItems = await redisService.getAllItems(redisKey);


    if (cacheItems.length >= 50) {
      // Move all items from Redis to MongoDB
      
      await mongoService.addItems(cacheItems);
      // Flush the Redis cache for this key
      await redisService.clearItems(redisKey);
    }
    // Add item to Redis
    await redisService.addItem(redisKey, item);

    console.info(`[INFO]Item added to Redis with key: ${redisKey}`);
    if (cacheItems.length >= 50) {
      console.info(
        `[INFO] Redis cache reached 50 items. Moved ${cacheItems.length} items from Redis to MongoDB and cleared Redis cache for key: ${redisKey}`
      );
    }
  } catch (error) {
    console.error(`[ERROR] Error in addService: ${error}`);
    throw error;
  }
}
