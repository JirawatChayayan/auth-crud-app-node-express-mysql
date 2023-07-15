// controllers/customerController.js
const Customer = require('../models/customer');

// Get all customers
const getAllCustomers = (req, res) => {
  Customer.getAllCustomers((error, customers) => {
    if (error) {
      return res.status(500).json({ message: 'Error getting customers' });
    }
    return res.json({ customers });
  });
};

// Create a new customer
const createCustomer = (req, res) => {
  const { name, email } = req.body;
  const newCustomer = { name, email };
  Customer.createCustomer(newCustomer, (error, customerId) => {
    if (error) {
      return res.status(500).json({ message: 'Error creating customer' });
    }
    return res.status(201).json({ customerId });
  });
};

// Update a customer
const updateCustomer = (req, res) => {
  const customerId = req.params.id;
  const { name, email } = req.body;
  const updatedCustomer = { name, email };
  Customer.updateCustomer(customerId, updatedCustomer, (error, success) => {
    if (error) {
      return res.status(500).json({ message: 'Error updating customer' });
    }
    if (!success) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.json({ success: true });
  });
};

// Delete a customer
const deleteCustomer = (req, res) => {
  const customerId = req.params.id;
  Customer.deleteCustomer(customerId, (error, success) => {
    if (error) {
      return res.status(500).json({ message: 'Error deleting customer' });
    }
    if (!success) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.json({ success: true });
  });
};

module.exports = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
