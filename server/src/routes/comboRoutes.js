import express from "express";
import {
  createCombo,
  updateCombo,
  deleteCombo,
  getCombos,
} from "../controllers/comboController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/combos:
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
router.post("/", authMiddleware("fast-food"), createCombo);

/**
 * @swagger
 * /api/combos/{id}:
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
router.put("/:id", authMiddleware("fast-food"), updateCombo);

/**
 * @swagger
 * /api/combos/{id}:
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
router.delete("/:id", authMiddleware("fast-food"), deleteCombo);

/**
 * @swagger
 * /api/combos:
 *   get:
 *     summary: Get all combos
 *     tags: [Combos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of combos
 */
router.get("/", authMiddleware("fast-food"), getCombos);

export default router;
