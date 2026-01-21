// client/scripts/app.js
import { validateGuess } from './api.js';

const image = document.getElementById('game-image');
const targetBox = document.getElementById('target-box');
const select = document.getElementById('character-select');

let lastClick = null;

// Handle image click
image.addEventListener('click', (e) => {
  const rect = image.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  lastClick = { x, y };

  // Position target box visually
  targetBox.style.left = `${x * rect.width}px`;
  targetBox.style.top = `${y * rect.height}px`;
  targetBox.classList.remove('hidden');

  console.log('Normalized click:', lastClick);
});

// Handle character selection
select.addEventListener('change', async (e) => {
  if (!lastClick || !e.target.value) return;

  const result = await validateGuess(
    e.target.value,
    lastClick.x,
    lastClick.y
  );

  if (result.correct) {
    alert('Correct!');
  } else {
    alert('Try again!');
  }

  targetBox.classList.add('hidden');
  select.value = '';
});

// Hide target box when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('#game-container')) {
    targetBox.classList.add('hidden');
  }
});
