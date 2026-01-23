// client/scripts/api.js
// client/scripts/api.js

export async function validateGuess(character, x, y, imageName) {
  const response = await fetch("http://localhost:3000/api/game/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      character: character.toLowerCase(),
      x,
      y,
      imageName, // ✅ MUST match images.name in DB
    }),
  });

  console.log("API STATUS:", response.status);

  const data = await response.json();
  console.log("API RESPONSE:", data);

  if (!response.ok) {
    throw new Error("Server validation failed");
  }

  return data;
}
