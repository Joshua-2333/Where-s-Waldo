// server/db/seed.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  try {
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        file_name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS characters (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS character_locations (
        id SERIAL PRIMARY KEY,
        image_id INTEGER REFERENCES images(id),
        character_id INTEGER REFERENCES characters(id),
        x FLOAT NOT NULL,
        y FLOAT NOT NULL,
        UNIQUE(image_id, character_id)
      );
    `);

    // Insert seed data
    await pool.query(`
      INSERT INTO images (name, file_name)
      VALUES ('Waldo Level 1', 'waldo.jpg')
      ON CONFLICT (file_name) DO NOTHING;

      INSERT INTO characters (name)
      VALUES ('waldo'), ('wizard'), ('wilma')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Get IDs
    const imageRes = await pool.query(`
      SELECT id FROM images WHERE file_name = 'waldo.jpg' LIMIT 1
    `);
    const imageId = imageRes.rows[0].id;

    const charRes = await pool.query(`SELECT id, name FROM characters`);
    const charMap = {};
    charRes.rows.forEach((row) => {
      charMap[row.name] = row.id;
    });

    // Insert locations
    await pool.query(`
      INSERT INTO character_locations (image_id, character_id, x, y)
      VALUES
        ($1, $2, 0.52, 0.21),
        ($1, $3, 0.31, 0.45),
        ($1, $4, 0.68, 0.33)
      ON CONFLICT (image_id, character_id) DO NOTHING;
    `, [imageId, charMap.waldo, charMap.wizard, charMap.wilma]);

    console.log("✅ Seed complete!");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await pool.end();
  }
}

seed();
