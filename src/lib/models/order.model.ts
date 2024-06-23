import mongoose from "mongoose";
import { MdOutlineWifiTetheringErrorRounded } from "react-icons/md";

// const shippingSchema = new mongoose.Schema({
//   status: {type: String, required: true}, // enum: ["prepare", "shipping", "delivered"],
//   location: {type: String, required: true},
//   updatedAt: {type: Date, default: Date.now},
// })

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  items: { type: Array, required: true }, // {type: [itemSchema], required: true
  createdAt: { type: Date, default: Date.now },
  status: { type: String, required: true },
  subtotal: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  location: { type: String, required: false },
  // shippingStatus: {enum: ["prepare", "shipped", "delivered"], required: false},
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  shippingInfo: { type: Array, required: true },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
