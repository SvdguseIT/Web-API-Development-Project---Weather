// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

// Dummy user credentials (replace with secure authentication method in production)
const users = [
    { username: 'admin', password: 'password123', role: 'admin' },
    { username: 'user', password: 'password456', role: 'user' }
];

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = users.find(u => u.username === credentials[0] && u.password === credentials[1]);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
};

// Middleware to authorize user
const authorizeUser = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

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

app.use(bodyParser.json());

// Endpoint to fetch weather data for all districts
app.get('/api/weather', authenticateUser, (req, res) => {
    const query = 'SELECT * FROM weather_data';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving weather data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Endpoint to fetch weather data for a specific district
app.get('/api/weather/:district', authenticateUser, (req, res) => {
    const district = req.params.district;
    const query = 'SELECT * FROM weather_data WHERE district = ?';
    connection.query(query, [district], (error, results) => {
        if (error) {
            console.error('Error retrieving weather data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'District not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
