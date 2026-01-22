import { validateGuess } from "./api.js";

const image = document.getElementById("game-image");
const targetBox = document.getElementById("target-box");
const select = document.getElementById("character-select");
const gameContainer = document.getElementById("game-container");

let lastClick = null;
let clickLocked = false;
const foundCharacters = new Set();

/**
 * Draw permanent marker
 */
function drawMarker(x, y) {
  const rect = image.getBoundingClientRect();

  const marker = document.createElement("div");
  marker.classList.add("marker");

  marker.style.left = `${x * rect.width}px`;
  marker.style.top = `${y * rect.height}px`;

  gameContainer.appendChild(marker);
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

  console.log("Normalized click:", lastClick);
});

/**
 * Handle character selection
 */
select.addEventListener("change", async (e) => {
  if (!lastClick || !e.target.value) return;

  const character = e.target.value;

  if (foundCharacters.has(character)) {
    alert("Already found!");
    return;
  }

  try {
    const result = await validateGuess(
      character,
      lastClick.x,
      lastClick.y
    );

    console.log("Validation result:", result);

    if (result.correct) {
      drawMarker(lastClick.x, lastClick.y);
      foundCharacters.add(character);

      // Disable dropdown option
      const option = select.querySelector(
        `option[value="${character}"]`
      );
      option.disabled = true;
      option.textContent += " ✓";

      // Grey out character image
      const characterCard = document.querySelector(
        `.character[data-character="${character}"]`
      );
      if (characterCard) {
        characterCard.classList.add("found");
      }

      alert(`${character.toUpperCase()} found!`);
    } else {
      alert("Try again!");
    }
  } catch (err) {
    console.error("Validation failed:", err);
    alert("Server error");
  }

  // Reset state
  targetBox.classList.add("hidden");
  select.value = "";
  lastClick = null;
  clickLocked = false;
});

/**
 * Hide target box when clicking outside game
 */
document.addEventListener("click", (e) => {
  if (!e.target.closest("#game-container")) {
    targetBox.classList.add("hidden");
    select.value = "";
    lastClick = null;
    clickLocked = false;
  }
});
