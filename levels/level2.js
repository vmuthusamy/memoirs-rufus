// ============================================
// LEVEL 2: "The Neighborhood"
// Armored enemies appear! Learn the jump-disarm combo.
// ============================================

const LEVEL_2 = {
  name: "The Neighborhood",

  memoir: "Dear Diary, I ventured past the fence today. The neighborhood squirrels have HELMETS now! I learned that if I jump on them first, their helmets pop off. Then my tail spin finishes the job. Clever fox, that's me!",

  skyColor: [180, 220, 255],
  groundColor: [80, 160, 50],
  width: 4000,

  playerStart: { x: 100, y: 0 },
  exit: { x: 3850, y: 300 },

  platforms: [
    { x: 300, y: 450, width: 200, height: 30 },
    { x: 600, y: 380, width: 150, height: 30 },
    { x: 850, y: 320, width: 200, height: 30 },
    { x: 1150, y: 400, width: 250, height: 30 },
    { x: 1500, y: 340, width: 150, height: 30 },
    { x: 1750, y: 280, width: 200, height: 30 },
    { x: 2100, y: 380, width: 180, height: 30 },
    { x: 2400, y: 320, width: 200, height: 30 },
    { x: 2700, y: 260, width: 150, height: 30 },
    { x: 2950, y: 350, width: 250, height: 30 },
    { x: 3300, y: 300, width: 200, height: 30 },
    { x: 3600, y: 350, width: 200, height: 30 },
  ],

  treats: [
    { x: 350, y: 410 }, { x: 400, y: 410 },
    { x: 650, y: 340 }, { x: 700, y: 340 },
    { x: 900, y: 280 }, { x: 950, y: 280 },
    { x: 1200, y: 360 }, { x: 1300, y: 360 },
    { x: 1550, y: 300 },
    { x: 1800, y: 240 }, { x: 1850, y: 240 },
    { x: 2150, y: 340 },
    { x: 2450, y: 280 }, { x: 2500, y: 280 },
    { x: 2750, y: 220 },
    { x: 3000, y: 310 }, { x: 3050, y: 310 },
    { x: 3350, y: 260 }, { x: 3400, y: 260 },
    { x: 3700, y: 310 },
  ],

  crates: [
    { x: 500, y: 535 },
    { x: 1050, y: 535 },
    { x: 1650, y: 535 },
    { x: 2300, y: 535 },
    { x: 2850, y: 535 },
    { x: 3200, y: 535 },
  ],

  enemies: [
    { type: "walker", x: 700, y: 535, patrol: 120 },
    { type: "walker", x: 1400, y: 535, patrol: 100 },
    // First armored enemy! Must jump on first, then tail spin
    { type: "armored", x: 2000, y: 535, patrol: 80 },
    { type: "walker", x: 2600, y: 535, patrol: 130 },
    { type: "armored", x: 3100, y: 535, patrol: 100 },
    { type: "walker", x: 3500, y: 535, patrol: 90 },
  ],
};
