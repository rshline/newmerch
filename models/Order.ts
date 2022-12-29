import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customer_email: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    total_shipping: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);