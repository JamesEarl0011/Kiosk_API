import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {
  createCombo,
  updateCombo,
  deleteCombo,
  getCombos,
} from "../controllers/comboController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

//! Public routes (no auth needed)
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);

//! Retail Admin-only routes
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               storeType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Failed to create product
 */
router.post("/", authMiddleware("retail"), createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               storeType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/:id", authMiddleware("retail"), updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", authMiddleware("retail"), deleteProduct);

//! Fast-Food Admin-only routes
/**
 * @swagger
 * /api/products/fast-food:
 *   post:
 *     summary: Create a new fast-food product
 *     tags: [Fast-Food Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               storeType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fast-food product created successfully
 *       400:
 *         description: Failed to create fast-food product
 */
router.post("/fast-food", authMiddleware("fast-food"), createProduct);

/**
 * @swagger
 * /api/products/fast-food/{id}:
 *   put:
 *     summary: Update a fast-food product
 *     tags: [Fast-Food Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fast-food product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               storeType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fast-food product updated successfully
 *       404:
 *         description: Fast-food product not found
 */
router.put("/fast-food/:id", authMiddleware("fast-food"), updateProduct);

/**
 * @swagger
 * /api/products/fast-food/{id}:
 *   delete:
 *     summary: Delete a fast-food product
 *     tags: [Fast-Food Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fast-food product ID
 *     responses:
 *       200:
 *         description: Fast-food product deleted successfully
 *       404:
 *         description: Fast-food product not found
 */
router.delete("/fast-food/:id", authMiddleware("fast-food"), deleteProduct);

/**
 * @swagger
 * /api/products/fast-food/combos:
 *   post:
 *     summary: Create a new combo
 *     tags: [Combos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               components:
 *                 type: object
 *               discount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Combo created successfully
 *       400:
 *         description: Failed to create combo
 */
router.post("/fast-food/combos", authMiddleware("fast-food"), createCombo);

/**
 * @swagger
 * /api/products/fast-food/combos/{id}:
 *   put:
 *     summary: Update an existing combo
 *     tags: [Combos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Combo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               components:
 *                 type: object
 *               discount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Combo updated successfully
 *       404:
 *         description: Combo not found
 */
router.put("/fast-food/combos/:id", authMiddleware("fast-food"), updateCombo);

/**
 * @swagger
 * /api/products/fast-food/combos/{id}:
 *   delete:
 *     summary: Delete a combo
 *     tags: [Combos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Combo ID
 *     responses:
 *       200:
 *         description: Combo deleted successfully
 *       404:
 *         description: Combo not found
 */
router.delete(
  "/fast-food/combos/:id",
  authMiddleware("fast-food"),
  deleteCombo
);

/**
 * @swagger
 * /api/products/fast-food/combos:
 *   get:
 *     summary: Get all combos
 *     tags: [Combos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of combos
 */
router.get("/fast-food/combos", authMiddleware("fast-food"), getCombos);

export default router;
