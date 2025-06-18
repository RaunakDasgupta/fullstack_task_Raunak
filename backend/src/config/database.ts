import { MongoClient, Db, Collection } from "mongodb";
import { TodoItem } from "../types";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "assignment";
const COLLECTION_NAME = "assignment_raunak";

class Database {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  async connect(): Promise<void> {
    try {
      if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in .env file");
      }
      this.client = new MongoClient(MONGO_URI);
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
      console.log(" Connected to MongoDB successfully");
    } catch (error) {
      console.error(" MongoDB connection error:", error);
      throw error;
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

  getCollection(): Collection<TodoItem> {
    if (!this.db) {
      throw new Error("Database not connected");
    }
    return this.db.collection<TodoItem>(COLLECTION_NAME);
  }

  async insertMany(todos: TodoItem[]): Promise<void> {
    const collection = this.getCollection();
    await collection.insertMany(todos);
  }

  async findAll(): Promise<TodoItem[]> {
    const collection = this.getCollection();
    return await collection.find({}).toArray();
  }
}

export const database = new Database();
