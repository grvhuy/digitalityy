import mongoose from "mongoose";
import Category from "./category.model";
import connectToDB from "../mongoose";

const propertySchema = new mongoose.Schema({
  attributeName: { type: String, required: true }, 
  attributeValue: { type: String },
});
 
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  productSpecs: { type: [propertySchema], required: false},
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  // brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand'},
  // variants: { type: [variantValueSchema], required: false },
  // inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'},
  // photos: { type: [String] },
  // tags: { type: [String], required: true },
})


//Lưu giá trị tên thuộc tính trong productSpecs từ props của Category
productSchema.pre("save", async function (next) {
  try {
    connectToDB();
    const category = await Category.findById(this.category)
    if (category && category.properties && category.properties.length > 0) {
      this.productSpecs = category.properties.map((property:any) => ({
        attributeName: property,
        attributeValue: "",
      }))
    }
    next()
  } catch (error:any) {
    next(error)
  }

})

const Product = mongoose.models.Product || mongoose.model("Product",  productSchema)
export default Product