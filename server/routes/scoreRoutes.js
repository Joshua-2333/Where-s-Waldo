// server/routes/scoreRoutes.js
const express = require("express");
const { postScore, getLeaderboard } = require("../controllers/scoreController");

const router = express.Router();

router.post("/", postScore);
router.get("/:scene", getLeaderboard);

module.exports = router;
