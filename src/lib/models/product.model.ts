import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  attributeName: { type: String }, 
  attributeValue: { type: String },
});
 
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number, required: false },
  productSpecs: { type: [propertySchema], required: false},
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  categoryName: { type: String },
  brand: { type: String},
  quantity: { type: Number, required: false }, //stock
  images: { type: [String], required: true },
  variant: { type: Array, required: false },
  discount: { type: Number, required: false },
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