// server/controllers/scoreController.js
const { insertScore, getScoresByScene } = require("../db/scoreQueries");

exports.postScore = async (req, res, next) => {
  try {
    const { name, scene, time } = req.body;

    if (!name || !scene || !time) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const score = await insertScore(name, scene, time);
    res.status(201).json(score);
  } catch (err) {
    next(err);
  }
};

exports.getLeaderboard = async (req, res, next) => {
  try {
    const { scene } = req.params;
    const scores = await getScoresByScene(scene);
    res.json(scores);
  } catch (err) {
    next(err);
  }
};
