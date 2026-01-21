// server/controllers/gameController.js
const CHARACTERS = {
  waldo: { x: 0.52, y: 0.21 },
  wizard: { x: 0.31, y: 0.45 },
  wilma: { x: 0.68, y: 0.33 },
};

const TOLERANCE = 0.03;

exports.validateGuess = (req, res) => {
  const { character, x, y } = req.body;

  if (!CHARACTERS[character]) {
    return res.status(400).json({ correct: false, error: 'Invalid character' });
  }

  const target = CHARACTERS[character];

  const isCorrect =
    Math.abs(x - target.x) <= TOLERANCE &&
    Math.abs(y - target.y) <= TOLERANCE;

  res.json({ correct: isCorrect });
};
