import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Adjust path if needed

const router = express.Router();

// 🔴 1. SIGNUP / REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists!",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create New User (isApproved: false by default)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isApproved: false, // 👈 Admin approval approval state
    });

    res.status(201).json({
      success: true,
      message: "Registration successful! Waiting for admin approval.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 🔴 2. LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials!" });
    }

    // Check if Admin approved the user
    if (!user.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Your account is pending Admin approval. Please wait for confirmation.",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey123",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 🔴 3. PENDING USERS FETCH (ADMIN ONLY)
router.get("/pending-users", async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false }).select("-password");
    res.status(200).json({ success: true, data: pendingUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 🔴 4. APPROVE USER (ADMIN ONLY)
router.put("/approve-user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    res.status(200).json({ success: true, message: "User approved successfully!", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 🔴 5. REJECT USER (ADMIN ONLY)
router.delete("/reject-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User request rejected!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;