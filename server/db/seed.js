// server/db/seed.js
const pool = require("./pool");

async function seed() {
  try {
    console.log("Seeding DB...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS characters (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS character_locations (
        id SERIAL PRIMARY KEY,
        image_id INT REFERENCES images(id),
        character_id INT REFERENCES characters(id),
        x FLOAT NOT NULL,
        y FLOAT NOT NULL,
        UNIQUE (image_id, character_id)
      );
    `);

    console.log("Tables created");

    // Seed data
    await pool.query(`
      INSERT INTO images (name)
      VALUES ('beach'), ('space'), ('waldo'), ('winter')
      ON CONFLICT DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO characters (name)
      VALUES ('waldo'), ('odlaw'), ('wilma'), ('wizard')
      ON CONFLICT DO NOTHING;
    `);

    console.log("Seed data inserted");

    await pool.end();
    console.log("Seeding complete!");
  } catch (err) {
    console.error("❌ Seed failed:", err);
    await pool.end();
    process.exit(1);
  }
}

seed();
