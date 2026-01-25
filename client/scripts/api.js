// client/scripts/api.js
import { BASE_URL } from "../config.js";

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error || data?.message || "Server request failed";
    throw new Error(message);
  }

  return data;
}

export async function validateGuess(character, x, y, imageName) {
  const response = await fetch(`${BASE_URL}/api/game/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      character: character.toLowerCase(),
      x,
      y,
      imageName,
    }),
  });

  return handleResponse(response);
}

// LEADERBOARD API
export async function postScore(name, scene, timeSeconds) {
  const response = await fetch(`${BASE_URL}/api/scores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, scene, time: timeSeconds }),
  });

  return handleResponse(response);
}

export async function getLeaderboard(scene) {
  const response = await fetch(`${BASE_URL}/api/scores/${scene}`);
  return handleResponse(response);
}
