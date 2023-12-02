// models/user.js
const pool = require('../utils/database');

class User {
  static findByEN(en, callback) {
    const query = 'SELECT * FROM theia_userauthorize WHERE EnUSER = ?';
    pool.query(query, [en], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results[0]);
    });
  }
}

module.exports = User;