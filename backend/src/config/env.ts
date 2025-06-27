// get all environment variables and export them as an object
import dotenv from "dotenv";
dotenv.config();


export const env = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/mern-trpc",
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
}