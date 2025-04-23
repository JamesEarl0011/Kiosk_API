import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js"; // Adjust the path if necessary

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

const populateAdmins = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Define admin users
    const admins = [
      {
        username: "RetailAdmin",
        password: await bcrypt.hash("retail123", 10),
        role: "admin",
        adminType: "retail",
      },
      {
        username: "FastFoodAdmin",
        password: await bcrypt.hash("fastfood123", 10),
        role: "admin",
        adminType: "fast-food",
      },
    ];

    // Insert admin users into the database
    await User.insertMany(admins);
    console.log("Admin users populated successfully");

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating admin users:", error);
    process.exit(1);
  }
};

// Run the script
populateAdmins();
