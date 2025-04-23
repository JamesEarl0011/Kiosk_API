import express from "express";
import {
  getSalesReport,
  getLowStockAlerts,
} from "../controllers/reportController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/reports/sales:
 *   get:
 *     summary: Get sales report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sales report
 */
router.get("/sales", authMiddleware("admin"), getSalesReport);

/**
 * @swagger
 * /api/reports/low-stock:
 *   get:
 *     summary: Get low-stock alerts
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Low-stock alerts
 */
router.get("/low-stock", authMiddleware("admin"), getLowStockAlerts);

export default router;
