import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: { type: String, required: false},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
  rating: { type: Number, required: false},
  createdAt: { type: Date, default: Date.now()},  
})

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema)
export default Review

