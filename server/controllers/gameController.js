// server/controllers/gameController.js
const pool = require("../db/pool");

const TOLERANCE = 0.03;

exports.validateGuess = async (req, res) => {
  const { character, x, y, imageName } = req.body;

  console.log("validateGuess:", req.body);

  if (!character || imageName == null || x == null || y == null) {
    return res.status(400).json({ correct: false, error: "Invalid request" });
  }

  try {
    const query = `
      SELECT cl.x, cl.y
      FROM character_locations cl
      JOIN characters c ON c.id = cl.character_id
      JOIN images i ON i.id = cl.image_id
      WHERE LOWER(c.name) = LOWER($1)
        AND (
          LOWER(i.name) = LOWER($2)
          OR LOWER(i.file_name) = LOWER($2)
        )
      LIMIT 1
    `;

    const result = await pool.query(query, [character, imageName]);

    console.log("DB result:", result.rows);

    if (!result.rows.length) {
      return res.status(404).json({
        correct: false,
        error: "Character not found for this image",
      });
    }

    const targetX = Number(result.rows[0].x);
    const targetY = Number(result.rows[0].y);
    const clickX = Number(x);
    const clickY = Number(y);

    const correct =
      Math.abs(clickX - targetX) <= TOLERANCE &&
      Math.abs(clickY - targetY) <= TOLERANCE;

    console.log("CHECK:", { clickX, clickY, targetX, targetY, correct });

    return res.json({ correct });
  } catch (err) {
    console.error("validateGuess error:", err);

    // 🔥 Return real error message so we can debug
    return res.status(500).json({ correct: false, error: err.message });
  }
};
