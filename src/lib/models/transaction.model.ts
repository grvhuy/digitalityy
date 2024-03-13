import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    id: {type: String},  
    name: {type: String},  
    description: {type: String},
    category: {type: String},
    imageUrl:{type: String},
    manufacturer:{type: String},
    price: {type: Number},               
    quantity: {type: Number},
    unit: {type: String},
    totalPrice: {type: Number},
    taxAmount: {type: Number}
}) 

const refundInfoSchema = new mongoose.Schema({
  partnerCode: {type: String},
  orderId: {type: String},
  requestId: {type: String},
  amount: {type: Number},
  transId: {type: Number},
  resultCode: {type: Number},
  message: {type: String},
  responseTime: {type: String}
})

const transactionSchema = new mongoose.Schema({
  orderId: {type: String},
  transId: {type: Number}, //TID do momo tạo ra
  userInfo: {type: Object}, //{type: mongoose.Types.ObjectId, ref: 'User'}
  deliveryInfo: {type: Object},  //{type: mongoose.Types.ObjectId, ref: '???'}
  items: {type: [itemSchema]},
  amount: {type: Number},
  status: {type: String, default: "pending"},
  createdAt: {type: Date, default: Date.now()},
  transactionInfo: {type: Object},
  refundInfo: {type: [refundInfoSchema]},
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema)

export default Transaction