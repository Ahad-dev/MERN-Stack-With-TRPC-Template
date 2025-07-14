// lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "../config/connectDB";

export const createAuth = async () => {
  const db = await connectDB();
  return betterAuth({
    trustedOrigins: ["http://localhost:5173"],
    socialProviders: {
        google: { 
            clientId: "199302201802-mmdd18mairb8hqh5si6t1k10q6kjfuab.apps.googleusercontent.com", 
            clientSecret: "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", 
        }, 
    },
    database: mongodbAdapter(db),

    emailAndPassword: { enabled: true },
  });
};
