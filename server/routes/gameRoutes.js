// server/routes/gameRoutes.js

const express = require('express');
const router = express.Router();
const { validateGuess } = require('../controllers/gameController');

// POST /api/game/validate
router.post('/validate', validateGuess);

module.exports = router;
