import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Admin",
    unique: true,
  },
  password: {
    type: String,
    default: "admin",
  },
  role: {
    type: String,
    default: "admin",
  },
  adminType: {
    type: String,
    enum: ["retail", "fast-food"],
    required: true,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);
