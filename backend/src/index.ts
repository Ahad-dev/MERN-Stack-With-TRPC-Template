import express, { Request, Response } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/app'; // Adjust the import path as necessary
import cors from 'cors';
import { env } from './config/env';
import connectDB from './config/connectDB';

const app = express();
const PORT = process.env.PORT || 4000;

// connect to the database
connectDB();

// middleware
app.use(cors({
    origin: env.CLIENT_URL, // allow requests from the client URL
    credentials: true, // allow cookies to be sent
}))
app.use(express.json());


app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router:appRouter,
    })
)

// simple healthcheck
app.get('/', (_req: Request, res: Response) => {
  res.send('🟢 Server is running!');
});


app.listen(env.PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
