import mongoose from "mongoose";
import Cart from "./cart.model";
import { any } from "zod";

const userSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  defaultAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  checkoutSession: {
    type: Object,
    required: false,
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
