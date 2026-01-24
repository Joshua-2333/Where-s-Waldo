// client/scripts/api.js
export async function validateGuess(character, x, y, imageName) {
  const response = await fetch("http://localhost:3000/api/game/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      character: character.toLowerCase(),
      x,
      y,
      imageName,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Server validation failed");
  return data;
}

//LEADERBOARD API
export async function postScore(name, scene, timeSeconds) {
  const response = await fetch("http://localhost:3000/api/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, scene, time: timeSeconds }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to post score");
  return data;
}

export async function getLeaderboard(scene) {
  const response = await fetch(`http://localhost:3000/api/scores/${scene}`);
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch leaderboard");
  return data;
}

export async function getGlobalLeaderboard() {
  const response = await fetch("http://localhost:3000/api/scores/global");
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch global leaderboard");
  return data;
}
