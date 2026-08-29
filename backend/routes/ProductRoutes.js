import express from "express";
import multer from "multer";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});



// GET ALL PRODUCTS


router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});



// ADD PRODUCT + IMAGE


router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      description: req.body.description || "",

      image: req.file
        ? `/uploads/${req.file.filename}`
        : "",
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });

  } catch (error) {

    console.log("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});



// DELETE PRODUCT


router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

// {edit products}
// PUT (Update) product by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, stock, description } = req.body;
    
    // Check if new image is uploaded
    const updateData = {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      description,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



export default router;