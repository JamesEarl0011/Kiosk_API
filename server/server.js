import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import comboRoutes from "./src/routes/comboRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import setupSwagger from "./src/config/swagger.js";
import { connectDB } from "./src/config/db.js";
import User from "./src/models/User.js";
import errorHandler from "./src/utils/errorHandler.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB and create admin
connectDB().then(async () => {
  // Create admin if it doesn't exist
  const adminExists = await User.findOne({ username: "Admin" });
  if (!adminExists) {
    const admin = new User({
      username: "Admin",
      password: "admin",
      adminType: "retail",
    });
    await admin.save();
    console.log("Default admin created with hashed password");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("localhost:5000/api-docs");
});

// Routes
app.use(errorHandler);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/combos", comboRoutes);
app.use("/api/orders", orderRoutes);

// Setup Swagger
setupSwagger(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
