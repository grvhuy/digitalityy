import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  modifiedAt : { type: Date, default: Date.now },
})

const Inventory = mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema)

export default Inventory