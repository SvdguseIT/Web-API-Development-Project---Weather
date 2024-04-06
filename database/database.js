// database.js

const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'amazingP22#',
    database: 'weatherdatabase'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Function to update weather data for a district
function updateWeatherData(district, temperature, humidity, airPressure) {
    const query = 'INSERT INTO weather_data (district, temperature, humidity, air_pressure) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE temperature = VALUES(temperature), humidity = VALUES(humidity), air_pressure = VALUES(air_pressure)';
    connection.query(query, [district, temperature, humidity, airPressure], (error, results) => {
        if (error) {
            console.error('Error updating weather data:', error);
        } else {
            console.log(`Weather data updated for district: ${district}`);
        }
    });
}

// Example usage:
updateWeatherData('Colombo', 25, 80, 1010);
updateWeatherData('Kandy', 22, 85, 1005);
// Add more districts and weather data as needed
