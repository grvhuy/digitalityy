import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  receiverName: { type: String, required: true }, 
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
});

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address