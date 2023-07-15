// models/customer.js
const pool = require('../utils/database');

class Customer {
  static getAllCustomers(callback) {
    const query = 'SELECT * FROM customers';
    pool.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }

  static createCustomer(customer, callback) {
    const query = 'INSERT INTO customers (name, email) VALUES (?, ?)';
    const { name, email } = customer;
    pool.query(query, [name, email], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.insertId);
    });
  }

  static updateCustomer(customerId, customer, callback) {
    const query = 'UPDATE customers SET name = ?, email = ? WHERE id = ?';
    const { name, email } = customer;
    pool.query(query, [name, email, customerId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows > 0);
    });
  }

  static deleteCustomer(customerId, callback) {
    const query = 'DELETE FROM customers WHERE id = ?';
    pool.query(query, [customerId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows > 0);
    });
  }
}

module.exports = Customer;
