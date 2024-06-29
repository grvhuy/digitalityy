import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  receiverName: { type: String, required: true }, 
  phoneNumber: { type: String, required: true },
  city: { type: String, required: true }, //or province
  district: { type: String, required: true }, //or municipality
  ward: { type: String, required: true }, //or tole
  addressLine: { type: String, required: true },
  userCreated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address