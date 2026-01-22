// server/app.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Where’s Waldo API running');
});

// API routes
app.use('/api/game', gameRoutes);

module.exports = app;
