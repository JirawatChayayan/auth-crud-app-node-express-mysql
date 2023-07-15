// utils/database.js
const mysql = require('mysql2');
const dbConfig = require('../../config/db.config');

// Create a connection pool
const pool = mysql.createPool(dbConfig);

module.exports = pool;