// server/db/pool.js
const { Pool } = require("pg");
require("dotenv").config();

const isLocal = process.env.NODE_ENV !== "production";

const pool = new Pool({
  connectionString: isLocal
    ? process.env.LOCAL_DATABASE_URL
    : process.env.DATABASE_URL,
  ssl: isLocal
    ? false
    : { rejectUnauthorized: false },
});

module.exports = pool;
