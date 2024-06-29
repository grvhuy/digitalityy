import mongoose from "mongoose";

const refundSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true},
  reason: { type: String, required: true},
  status: { type: String, required: true, default: "pending"},
  refundInfo: { type: Object, required: false},
  createdAt: { type: Date, default: Date.now()},
})

const Refund = mongoose.models.Refund || mongoose.model("Refund", refundSchema)
export default Refund

