// lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "../config/connectDB";
import dotenv from "dotenv";
dotenv.config();

export const createAuth = async () => {
  const db = await connectDB();
  return betterAuth({
    trustedOrigins: [process.env.CLIENT_URL],
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
    database: mongodbAdapter(db),

    emailAndPassword: { enabled: true },
  });
};
