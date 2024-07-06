// src/models/user.ts
import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  role: 'reader' | 'writer' | 'admin';
  is_active: boolean;
  last_login: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  last_login: { type: Date, default: Date.now },
  role: { type: String, enum: ['reader', 'writer', 'admin'], default: 'reader' }
});


export const User = model<IUser>('User', userSchema);

