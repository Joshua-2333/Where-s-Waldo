// client/config.js

// Use Render backend when deployed, otherwise use localhost
export const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://wheres-waldo-backend-fe40.onrender.com";
