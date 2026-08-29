import express from "express";
import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();



// CREATE SALE


router.post("/", authMiddleware,  async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      items,
      discount = 0,
    } = req.body;

    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer and product are required",
      });
    }

    const saleItems = [];
    let subtotal = 0;

    // Check products and stock
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} has only ${product.stock} items in stock`,
        });
      }

      const total = product.price * item.quantity;

      subtotal += total;

      saleItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total: total,
      });

      // Reduce stock
      product.stock -= item.quantity;

      await product.save();
    }

    const grandTotal = subtotal - Number(discount);

    // Invoice number
    const invoiceNumber =
      "INV-" + Date.now();

    const sale = new Sale({
      invoiceNumber,
      customerName,
      customerPhone,
      items: saleItems,
      subtotal,
      discount: Number(discount),
      grandTotal,
    });

    const savedSale = await sale.save();

    res.status(201).json({
      success: true,
      message: "Product sold successfully",
      data: savedSale,
    });

  } catch (error) {

    console.log("SALE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



// GET ALL SALES


router.get("/", authMiddleware,  async (req, res) => {
  try {

    const sales = await Sale.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: sales,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});



// GET SINGLE SALE


router.get("/:id", authMiddleware, async (req, res) => {
  try {

    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    res.json({
      success: true,
      data: sale,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


export default router;