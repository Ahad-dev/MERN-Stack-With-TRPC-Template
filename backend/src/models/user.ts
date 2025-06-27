import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name:string,
    email:string,
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
})
const User = mongoose.model<IUser>('User', userSchema);
export default User;
