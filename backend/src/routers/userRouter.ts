import {publicProcedure,router} from "../trpc/init"

export const userRouter = router({
    // ? Define your user-related procedures here
    getUser: publicProcedure.query(() => {
        return { id: 1, name: "John Doe" }; // Example user data
    }),
    
})