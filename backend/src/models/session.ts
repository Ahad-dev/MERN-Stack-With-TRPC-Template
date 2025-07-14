import mongoose, { Document, Schema, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ISession extends Document {
  id: string;
  userId: Types.ObjectId; // Reference to User
  token: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    id: { type: String, default: uuidv4, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    ipAddress: { type: String },
    userAgent: { type: String }
  },
  { timestamps: true }
);

export const Session = mongoose.model<ISession>('Session', sessionSchema);
