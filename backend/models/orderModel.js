import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  
  userId: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  amount: { type: Number, required: true },
  address: {type : Object, required: true},
  status: { type: String, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, default: false },
  date: { type: Number, required: true },
});


// address: {
//   street: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   zipcode: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
// },
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
