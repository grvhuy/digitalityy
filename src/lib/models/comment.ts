import mongoose from "mongoose";


const Comment = new mongoose.Schema({
  content: { type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
  rating: { type: Number, required: true},
  createdAt: { type: Date, default: Date.now()},  
})

export default mongoose.models.Comment || mongoose.model("Comment", Comment)