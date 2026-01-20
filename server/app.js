// server/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Where’s Waldo API running');
});

// API routes
app.use('/api/game', gameRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
