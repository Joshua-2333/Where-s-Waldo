// server/routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/validate', gameController.validateGuess);

module.exports = router;
