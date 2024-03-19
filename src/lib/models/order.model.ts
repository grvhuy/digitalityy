import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
  id: {type: String},  
  name: {type: String},  
  description: {type: String},
  category: {type: String},
  price: {type: Number},               
  quantity: {type: Number},
  unit: {type: String},
  totalPrice: {type: Number},
  // imageUrl:{type: String},
  // manufacturer:{type: String},
  // taxAmount: {type: Number}
}) 
const orderSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
  items: {type: [itemSchema], required: true},
  status: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  subtotal: {type: Number, required: true},
  paymentMethod: {type: String, required: true},
  location: {type: String, required: true},
  transactionId: {type: mongoose.Schema.Types.ObjectId, ref: "Transaction"},
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default Order