import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import { generateReceiptPDF } from "../utils/receiptGenerator.js";

export const createOrder = async (req, res) => {
  const { items, storeType } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let totalPrice = 0;
    const orderItems = [];

    // Validate stock and calculate total
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product || product.stock < item.quantity) {
        throw new Error(`${product.name} is out of stock`);
      }

      totalPrice += product.price * item.quantity;
      orderItems.push({
        itemType: "product",
        itemId: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      product.stock -= item.quantity;
      await product.save({ session });
    }

    // Create order
    const order = new Order({
      items: orderItems,
      totalPrice,
      storeType,
      receiptNumber: `REC-${Date.now()}`,
    });

    await order.save({ session });
    await session.commitTransaction();

    // Generate receipt PDF
    const receiptPdf = generateReceiptPDF(order);
    res.status(201).json({
      ...order.toObject(),
      receiptUrl: `/api/orders/${order._id}/receipt`,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};
export const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order history" });
  }
};
