// server/utils/helpers.js

// Correct positions (example values — you will tweak these)
const CHARACTER_LOCATIONS = {
  waldo: { x: 0.52, y: 0.39 },
  wilma: { x: 0.36, y: 0.48 },
  wizard: { x: 0.61, y: 0.47 },
};

// Allowed error radius
const TOLERANCE = 0.04;

function isWithinRange(click, target) {
  return (
    Math.abs(click.x - target.x) <= TOLERANCE &&
    Math.abs(click.y - target.y) <= TOLERANCE
  );
}

module.exports = {
  CHARACTER_LOCATIONS,
  isWithinRange,
};
