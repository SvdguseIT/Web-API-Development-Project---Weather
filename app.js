// server/app.js
const express = require('express');
const app = express();

// Middleware and route setup

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
