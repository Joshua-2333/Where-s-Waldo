// server/routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/status', gameController.getGameStatus);

module.exports = router;
