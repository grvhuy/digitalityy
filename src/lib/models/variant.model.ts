import mongoose from "mongoose";

const variantValueSchema = new mongoose.Schema({
  attributeName: { type: String, required: true }, 
  attributeValue: [String],
});

const productVariantSchema = new mongoose.Schema({
  variantName: { type: String, required: true },
  variantValues: [variantValueSchema],
});

// productVariant.variantValues.map((variantvl) => {
//     return {
//       <h1>{variantvl.attributeName}</h1>
//       select 
//         variantvl.attributeValue.map((value) => {
//           return <option value={value}>{value}</option>
//         })
//     }
//   })
