// server/controllers/gameController.js
exports.getGameStatus = (req, res) => {
  res.json({
    message: 'Game API working',
    status: 'OK',
  });
};
