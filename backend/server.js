import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

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

// Dynamic Port setup for Render deployment
const PORT = process.env.PORT || 4000;

// Connect Database and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected Successfully ✅");

    // Connect hone ke baad default admin check & create hoga
    await createDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });