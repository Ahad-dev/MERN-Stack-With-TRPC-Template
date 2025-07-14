// lib/mongodb.ts
import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = "mern-trpc";
if (!uri) {
  throw new Error("MONGO_URI is not defined in environment variables.");
}

let client: MongoClient;
let db: Db;

export const connectDB = async (): Promise<Db> => {
  if (db) return db; // Return existing connection

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("🟢 MongoDB connected");
  }

  db = client.db(dbName);
  return db;
};
