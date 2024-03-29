import mongoose from "mongoose";
import Category from "./category.model";
import connectToDB from "../mongoose";

const propertySchema = new mongoose.Schema({
  attributeName: { type: String }, 
  attributeValue: { type: String },
});
 
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  productSpecs: { type: [propertySchema], required: false},
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  categoryName: { type: String },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand'},
  quantity: { type: Number, required: false },
  images: { type: [String], required: true },
})


// Lưu giá trị tên thuộc tính trong productSpecs từ props của Category
// productSchema.pre("save", async function (next) {
//   try {
//     connectToDB();
//     const category = await Category.findById(this.category)

//     if (category && category.properties && category.properties.length > 0) {
//       this.productSpecs = category.properties.map((property:any) => ({
//         attributeName: property,
//       }))

//       this.categoryName = category.name
//     }

//     next()
//   } catch (error:any) {
//     next(error)
//   }

// })


const Product = mongoose.models.Product || mongoose.model("Product",  productSchema)
export default Product