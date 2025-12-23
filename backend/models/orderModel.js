import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  paymentMethod: {
    type: String,
    default: "COD"
  },
  payment: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: "Order Placed"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;

