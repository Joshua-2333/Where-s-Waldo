// client/scripts/api.js
export async function validateGuess(character, x, y, imageFile) {
  const response = await fetch("http://localhost:3000/api/game/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      character: character.toLowerCase(),
      x,
      y,
      imageFile,
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
