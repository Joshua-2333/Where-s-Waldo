// server/db/pool.js
const { Pool } = require("pg");
require("dotenv").config();

// Render Postgres requires SSL.
// Detect Render by checking if DATABASE_URL includes "render.com"
const isRender = process.env.DATABASE_URL?.includes("render.com");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isRender
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

module.exports = pool;
