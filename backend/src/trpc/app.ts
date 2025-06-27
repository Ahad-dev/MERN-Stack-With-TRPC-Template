import { router } from './init';
import { userRouter } from '../routers/userRouter';


// Initialize tRPC router
export const appRouter = router({
    user: userRouter,
})

export type AppRouter = typeof appRouter;


