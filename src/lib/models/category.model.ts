import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: false},
  // properties: { type: [String] },
})


const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)
export default Category