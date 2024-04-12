// server/models/Weather.js
const db = require('../config/db');

class Weather {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM weather_data', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getByDistrict(district) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM weather_data WHERE district = ?', [district], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static create(weatherData) {
    const { district, temperature, humidity, air_pressure } = weatherData;
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO weather_data (district, temperature, humidity, air_pressure) VALUES (?, ?, ?, ?)', 
        [district, temperature, humidity, air_pressure], 
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
}

module.exports = Weather;
