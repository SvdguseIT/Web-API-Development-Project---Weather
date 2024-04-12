const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Get all weather data
router.get('/', weatherController.getAllWeatherData);

// Get weather data by district
router.get('/district/:district', weatherController.getWeatherDataByDistrict);

module.exports = router;
