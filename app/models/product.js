// models/product.js
const pool = require('../utils/database');

class Product {
  static getAllProducts(callback) {
    const query = 'SELECT * FROM products';
    pool.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }

  static createProduct(product, callback) {
    const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
    const { name, price } = product;
    pool.query(query, [name, price], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.insertId);
    });
  }

  static updateProduct(productId, product, callback) {
    const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    const { name, price } = product;
    pool.query(query, [name, price, productId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows > 0);
    });
  }

  static deleteProduct(productId, callback) {
    const query = 'DELETE FROM products WHERE id = ?';
    pool.query(query, [productId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows > 0);
    });
  }
}

module.exports = Product;
