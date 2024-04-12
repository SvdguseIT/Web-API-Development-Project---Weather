// server/models/User.js
const db = require('../config/db');

class User {
  static getByUsername(username, callback) {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('Error getting user by username:', err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  }

  static create(userData, callback) {
    db.query('INSERT INTO users SET ?', userData, (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  }

  // Add more methods for updating, deleting, or any other CRUD operations as needed
}

module.exports = User;
