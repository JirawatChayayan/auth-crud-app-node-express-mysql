// models/user.js
const pool = require('../utils/database');

class User {
  static findByEmail(email, callback) {
    const query = 'SELECT * FROM users WHERE email = ?';
    pool.query(query, [email], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results[0]);
    });
  }

  static findById(id, callback) {
    const query = 'SELECT * FROM users WHERE id = ?';
    pool.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results[0]);
    });
  }

  static createUser(user, callback) {
    const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    const { email, password, role } = user;
    pool.query(query, [email, password, role], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.insertId);
    });
  }

  static updateUserRole(userId, role, callback) {
    const query = 'UPDATE users SET role = ? WHERE id = ?';
    pool.query(query, [role, userId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows > 0);
    });
  }
}

module.exports = User;