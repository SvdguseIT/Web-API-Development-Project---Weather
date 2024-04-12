// server/controllers/weatherController.js
const db = require('../config/db');

const weatherController = {
  getAllWeatherData: (req, res) => {
    db.query('SELECT * FROM weather_data', (err, results) => {
      if (err) {
        console.error('Error fetching weather data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  },

  getWeatherDataByDistrict: (req, res) => {
    const { district } = req.params;
    db.query('SELECT * FROM weather_data WHERE district = ?', [district], (err, results) => {
      if (err) {
        console.error('Error fetching weather data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Weather data not found' });
      }
      res.json(results[0]);
    });
  },

  createWeatherData: (req, res) => {
    const { district, temperature, humidity, airPressure } = req.body;
    db.query('INSERT INTO weather_data (district, temperature, humidity, air_pressure) VALUES (?, ?, ?, ?)', 
      [district, temperature, humidity, airPressure], 
      (err, result) => {
        if (err) {
          console.error('Error creating weather data:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ message: 'Weather data created successfully', id: result.insertId });
      });
  }
};

module.exports = weatherController;
