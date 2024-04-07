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
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    addresses: [
      {
        name: String,
        phone: String,
        city: String,
        district: String,
        ward: String,
        addressLine: String,
        default: Boolean,
      },
    ]
  },  
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;