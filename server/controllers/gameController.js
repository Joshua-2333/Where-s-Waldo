// server/controllers/gameController.js
const pool = require("../db/pool");

const TOLERANCE = 0.03;

exports.validateGuess = async (req, res) => {
  const { character, x, y, imageFile } = req.body;

  if (
    !character ||
    typeof x !== "number" ||
    typeof y !== "number" ||
    !imageFile
  ) {
    return res.status(400).json({
      correct: false,
      error: "Invalid request data",
    });
  }

  try {
    const query = `
      SELECT cl.x AS target_x, cl.y AS target_y
      FROM character_locations cl
      JOIN characters c ON c.id = cl.character_id
      JOIN images i ON i.id = cl.image_id
      WHERE c.name = $1
      AND i.file_name = $2
      LIMIT 1
    `;

    const result = await pool.query(query, [
      character,
      imageFile,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        correct: false,
        error: "Character not found for this image",
      });
    }

    const { target_x, target_y } = result.rows[0];

    const isCorrect =
      Math.abs(x - target_x) <= TOLERANCE &&
      Math.abs(y - target_y) <= TOLERANCE;

    return res.json({ correct: isCorrect });
  } catch (err) {
    console.error("validateGuess error:", err);
    return res.status(500).json({
      correct: false,
      error: "Server error",
    });
  }
};
