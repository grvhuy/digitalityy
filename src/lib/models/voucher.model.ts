import mongoose from "mongoose";


const voucherSchema = new mongoose.Schema({
  minimumOrderValue: { type: Number, required: true },
  discount: { type: Number, required: true },
  code: { type: String, required: true },
  description: { type: String, required: false },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  usageLimit: { type: Number, required: true },
  usageCount: { type: Number, required: true },
  products: { type: [mongoose.Schema.Types.ObjectId], ref: "Product", required: false },
  appliedAll: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now() },  
})

const Voucher = mongoose.models.Voucher || mongoose.model("Voucher", voucherSchema)
export default Voucher