import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    id: { type: String, default: uuidv4, unique: true },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const User = mongoose.model<IUser>("User", userSchema);
export default User;
