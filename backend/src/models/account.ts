import mongoose, { Document, Schema, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IAccount extends Document {
  id: string;
  userId: Types.ObjectId; // Reference to User
  accountId: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  scope?: string;
  idToken?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema = new Schema<IAccount>(
  {
    id: { type: String, default: uuidv4, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    accountId: { type: String, required: true },
    providerId: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
    accessTokenExpiresAt: { type: Date },
    refreshTokenExpiresAt: { type: Date },
    scope: { type: String },
    idToken: { type: String },
    password: { type: String }
  },
  { timestamps: true }
);

export const Account = mongoose.model<IAccount>('Account', accountSchema);
