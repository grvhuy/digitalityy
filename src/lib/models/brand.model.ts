import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  images: { type: String, require: false }
})
  
const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema)
export default Brand
