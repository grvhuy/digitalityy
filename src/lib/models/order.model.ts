import mongoose from "mongoose"

// const itemSchema = new mongoose.Schema({
//   id: {type: String},  
//   name: {type: String},  
//   category: {type: String},
//   price: {type: Number},               
//   quantity: {type: Number},
//   // imageUrl:{type: String},
//   // taxAmount: {type: Number}
// }) 
const orderSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
  items: {type: Array, required: true}, // {type: [itemSchema], required: true
  createdAt: {type: Date, default: Date.now},
  status: {type: String, required: true},
  subtotal: {type: Number, required: true},
  paymentMethod: {type: String, required: true},
  location: {type: String, required: false},
  // shippingStatus: {enum: ["prepare", "shipped", "delivered"], required: false},
  transactionId: {type: mongoose.Schema.Types.ObjectId, ref: "Transaction"},
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default Order