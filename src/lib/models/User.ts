import mongoose from "mongoose";

export interface TUser extends mongoose.Document {
  name: string
  email: string
  password: string
}

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String }
})

export default mongoose.models.User || mongoose.model<TUser>("User", UserSchema) 