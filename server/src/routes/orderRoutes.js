import express from "express";
import {
  createOrder,
  getOrderHistory,
} from "../controllers/orderController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               storeType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Failed to create order
 */
router.post("/", authMiddleware("customer"), createOrder);

/**
 * @swagger
 * /api/orders/history:
 *   get:
 *     summary: Get order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/history", authMiddleware("customer"), getOrderHistory);

export default router;
