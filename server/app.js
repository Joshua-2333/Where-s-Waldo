// server/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const debugRoutes = require('./routes/debug');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Where’s Waldo API running');
});

// Debug routes
app.use('/debug', debugRoutes);

// API routes
app.use('/api/game', gameRoutes);
app.use('/api/scores', scoreRoutes);

module.exports = app;
