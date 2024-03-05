import mongoose, { model, models } from "mongoose";

// export interface Tproduct extends mongoose.Document {
//   name: string,
//   description: string,
//   tags: string[],
//   productSpecs: {},
//   categoryId: 
// }
const variantValueSchema = new mongoose.Schema({
  attributeName: { type: String, required: true },
  attributeValue: { type: [String] },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  productSpecs: { type: Object, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  // brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand'},
  // variants: { type: [variantValueSchema], required: false },
  // tags: { type: [String], required: true },
  // inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'},
  // photos: { type: [String] },
})

const Product = mongoose.models.Product || model("Product",  productSchema)
export default Product