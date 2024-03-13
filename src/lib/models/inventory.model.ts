import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
  orgPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  modifiedAt : { type: Date, default: Date.now },
})

const Inventory = mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema)

export default Inventory