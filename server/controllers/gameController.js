// server/controllers/gameController.js

// Normalized coordinates for characters on THIS image
const CHARACTERS = {
  waldo: { x: 0.52, y: 0.21 },
  wizard: { x: 0.31, y: 0.45 },
  wilma: { x: 0.68, y: 0.33 },
};

// How close the click must be (normalized distance)
const TOLERANCE = 0.03;

exports.validateGuess = (req, res) => {
  const { character, x, y } = req.body;

  // Basic validation
  if (
    !character ||
    typeof x !== "number" ||
    typeof y !== "number"
  ) {
    return res.status(400).json({
      correct: false,
      error: "Invalid request data",
    });
  }

  const target = CHARACTERS[character];

  if (!target) {
    return res.status(400).json({
      correct: false,
      error: "Invalid character",
    });
  }

  const isCorrect =
    Math.abs(x - target.x) <= TOLERANCE &&
    Math.abs(y - target.y) <= TOLERANCE;

  return res.json({ correct: isCorrect });
};
