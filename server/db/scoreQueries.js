// server/db/scoreQueries.js
const pool = require("./pool");

exports.insertScore = async (name, scene, time) => {
  const result = await pool.query(
    `INSERT INTO scores (name, scene, time_seconds)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, scene, time]
  );
  return result.rows[0];
};

exports.getScoresByScene = async (scene) => {
  const result = await pool.query(
    `SELECT name, time_seconds, created_at
     FROM scores
     WHERE scene = $1
     ORDER BY time_seconds ASC
     LIMIT 10`,
    [scene]
  );
  return result.rows;
};
