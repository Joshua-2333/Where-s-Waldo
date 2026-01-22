// client/scripts/app.js
import { validateGuess } from "./api.js";

const image = document.getElementById("game-image");
const targetBox = document.getElementById("target-box");
const select = document.getElementById("character-select");
const gameContainer = document.getElementById("game-container");

const IMAGE_FILE = "winter.jpg";

let lastClick = null;
let clickLocked = false;
const foundCharacters = new Set();

/**
 * Draw marker
 */
function drawMarker(x, y, color = "green", temporary = false) {
  const rect = image.getBoundingClientRect();
  const size = 36;

  const marker = document.createElement("div");
  marker.classList.add("marker");
  marker.style.borderColor = color;

  // Correct positioning with transform
  marker.style.left = `${x * rect.width}px`;
  marker.style.top = `${y * rect.height}px`;

  gameContainer.appendChild(marker);

  if (temporary) {
    setTimeout(() => marker.remove(), 800);
  }
}

/**
 * Handle image click
 */
image.addEventListener("click", (e) => {
  if (clickLocked) return;

  const rect = image.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  lastClick = { x, y };

  targetBox.style.left = `${x * rect.width}px`;
  targetBox.style.top = `${y * rect.height}px`;
  targetBox.classList.remove("hidden");

  clickLocked = true;

  console.log("CLICK:", lastClick);
});

/**
 * Handle character selection
 */
select.addEventListener("change", async (e) => {
  if (!lastClick || !e.target.value) return;

  const character = e.target.value.toLowerCase();

  if (foundCharacters.has(character)) {
    alert("Already found!");
    return;
  }

  // 🔴 Show red marker immediately
  drawMarker(lastClick.x, lastClick.y, "red", true);

  try {
    const result = await validateGuess(
      character,
      lastClick.x,
      lastClick.y,
      IMAGE_FILE
    );

    console.log("SERVER RESULT:", result);

    if (result.correct) {
      drawMarker(lastClick.x, lastClick.y, "lime");
      foundCharacters.add(character);

      const option = select.querySelector(
        `option[value="${character}"]`
      );
      if (option) {
        option.disabled = true;
        option.textContent += " ✓";
      }

      const card = document.querySelector(
        `.character[data-character="${character}"]`
      );
      if (card) card.classList.add("found");

      alert(`${character.toUpperCase()} FOUND 🎉`);
    } else {
      alert("Close, but not quite 👀");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }

  targetBox.classList.add("hidden");
  select.value = "";
  lastClick = null;
  clickLocked = false;
});

/**
 * Cancel on outside click
 */
document.addEventListener("click", (e) => {
  if (!e.target.closest("#game-container")) {
    targetBox.classList.add("hidden");
    select.value = "";
    lastClick = null;
    clickLocked = false;
  }
});
