import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify JWT and check admin role
const authMiddleware = (requiredRole) => async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin" || user.adminType !== requiredRole) {
      return res.status(401).json({ error: "Access denied" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleware;
