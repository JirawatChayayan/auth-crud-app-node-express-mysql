// controllers/productController.js
const Product = require('../models/product');

// Get all products
const getAllProducts = (req, res) => {
  Product.getAllProducts((error, products) => {
    if (error) {
      return res.status(500).json({ message: 'Error getting products' });
    }
    return res.json({ products });
  });
};

// Create a new product
const createProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = { name, price };
  Product.createProduct(newProduct, (error, productId) => {
    if (error) {
      return res.status(500).json({ message: 'Error creating product' });
    }
    return res.status(201).json({ productId });
  });
};

// Update a product
const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, price } = req.body;
  const updatedProduct = { name, price };
  Product.updateProduct(productId, updatedProduct, (error, success) => {
    if (error) {
      return res.status(500).json({ message: 'Error updating product' });
    }
    if (!success) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json({ success: true });
  });
};

// Delete a product
const deleteProduct = (req, res) => {
  const productId = req.params.id;
  Product.deleteProduct(productId, (error, success) => {
    if (error) {
      return res.status(500).json({ message: 'Error deleting product' });
    }
    if (!success) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json({ success: true });
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
