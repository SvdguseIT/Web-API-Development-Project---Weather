const Weather = require('../models/weather');

const weatherService = {
  getAllWeatherData: async () => {
    try {
      const allWeatherData = await Weather.getAll();
      return allWeatherData;
    } catch (error) {
      throw error;
    }
  },

  getWeatherDataByDistrict: async (district) => {
    try {
      const weatherData = await Weather.getByDistrict(district);
      return weatherData;
    } catch (error) {
      throw error;
    }
  },

  createWeatherData: async (weatherData) => {
    try {
      const createdWeatherData = await Weather.create(weatherData);
      return createdWeatherData;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = weatherService;
