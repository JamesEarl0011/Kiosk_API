import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await User.findOne({ username });
    if (!admin) return res.status(401).json({ error: "Admin not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, adminType: admin.adminType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token and adminType
    res.json({ token, adminType: admin.adminType });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
