import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      itemType: { type: String, enum: ["product", "combo"], required: true },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "items.itemType",
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  storeType: { type: String, enum: ["fast-food", "retail"], required: true },
  orderDate: { type: Date, default: Date.now },
  receiptNumber: { type: String, unique: true },
});

export default mongoose.model("Order", orderSchema);
