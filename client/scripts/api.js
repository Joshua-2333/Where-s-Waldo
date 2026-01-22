// client/scripts/api.js

export async function validateGuess(character, x, y) {
  const response = await fetch(
    "http://localhost:3000/api/game/validate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ character, x, y }),
    }
  );

  if (!response.ok) {
    throw new Error("Server validation failed");
  }

  return response.json();
}
