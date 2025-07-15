import mongoose from "mongoose";

//create schemaa for our peoject

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  bestSeller: { type: Boolean, required: true },
  sizes: { type: Array, required: true },
  date: { type: Number, required: true },
  specifications: {
    sunlight: { type: String, required: true }, // Sunlight requirement
    water: { type: String, required: true }, // Watering frequency
    soil: { type: String, required: true }, // Soil type
    height: { type: String, required: true }, // Height range
    lifespan: { type: String, required: true }, // Lifespan of the plant
  },
});

//if model is availabe no need to create it again and again that's why or operator
const productModel =
  mongoose.models.product || mongoose.model("products", productSchema);

export default productModel;
