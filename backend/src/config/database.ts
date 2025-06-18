import { MongoClient, Db, Collection } from "mongodb";
import { TodoItem } from "../types";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;




class Database {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  async connect(): Promise<void> {
    try {
      const conn = await mongoose.connect(MONGO_URI!, {
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
        bufferCommands: false,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.client) {
        await this.client.close();
        console.log(" Disconnected from MongoDB");
      }
    } catch (error) {
      console.error(" MongoDB disconnection error:", error);
    }
  }


}

export const database = new Database();
