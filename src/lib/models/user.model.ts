import mongoose from "mongoose";
import Cart from "./cart.model";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },  
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;