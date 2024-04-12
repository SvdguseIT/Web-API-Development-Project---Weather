const express = require('express');
const path = require('path');
const app = express();

// Import routes for weather data and user management
const weatherRoutes = require('./routes/weatherRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the 'client/build' directory
app.use(express.static(path.join( 'client', 'build')));

// Define routes for weather data and user management
app.use('/api/weather', weatherRoutes);
app.use('/api/user', userRoutes);

// Route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join( 'client', 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

