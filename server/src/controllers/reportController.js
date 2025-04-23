import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getSalesReport = async (req, res) => {
  try {
    const { storeType } = req.query; // Get storeType from query parameters
    const filter = storeType ? { storeType } : {};

    // Aggregate total sales and order count
    const totalSales = await Order.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          orderCount: { $sum: 1 },
        },
      },
    ]);

    // Find popular items
    const popularItems = await Order.aggregate([
      { $match: filter },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.itemId",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 }, // Top 5 popular items
    ]);

    res.json({ totalSales, popularItems });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate sales report" });
  }
};

export const getLowStockAlerts = async (req, res) => {
  try {
    const { storeType } = req.query; // Get storeType from query parameters
    const filter = storeType ? { storeType } : {};

    // Find products below the low-stock threshold
    const lowStockProducts = await Product.find({
      ...filter,
      stock: { $lt: "$lowStockThreshold" },
    });

    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch low-stock alerts" });
  }
};
