import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; // Password hash karne ke liye
import User from "./models/User.js"; // Aapke User model ka correct path (file extension .js zaruri hai)

import saleRoutes from "./routes/saleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Lok Inventory Backend is running");
});

// Default Admin Auto-Create Function
const createDefaultAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await User.create({
        name: "Dummy Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isApproved: true,
      });

      console.log(`✅ Default Admin Created -> Email: ${adminEmail} | Password: admin123`);
    } else {
      console.log("ℹ️ Default Admin already exists in Database");
    }
  } catch (error) {
    console.log("❌ Error creating default admin:", error.message);
  }
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected successfully");

    // Connect hone ke turant baad admin check/create hoga
    await createDefaultAdmin();

    app.listen(4000, () => {
      console.log("Server running at http://localhost:4000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });