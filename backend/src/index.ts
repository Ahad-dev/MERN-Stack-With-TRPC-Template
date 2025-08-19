import express, { Request, Response } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/app";
import cors from "cors";
import { createAuth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// app.use(express.json());

(async () => {
  try {
    const auth = await createAuth(); // ✅ Wait for auth to resolve
    app.all("/api/auth/{*any}", (req, res, next) => {
      try {
        // safely invoke better-auth handler
        toNodeHandler(auth)(req, res);
      } catch (err) {
        console.error("🔴 Error in auth handler:", err);
        res.status(500).json({ message: "Internal server error" });
      } finally {
        // res.redirect('http://localhost:5173/');
      }
    });
    console.log("🔵 Auth initialized successfully");

    app.use(
      "/trpc",
      trpcExpress.createExpressMiddleware({ router: appRouter })
    );

    app.get("/", (_req: Request, res: Response) => {
      res.send("🟢 Server is running!");
    });

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("🔴 Failed to initialize auth:", err);
    process.exit(1); // Optional: stop the app if auth fails
  }
})();
