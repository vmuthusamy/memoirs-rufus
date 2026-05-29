// ============================================
// LEVEL 14: "Blast Off to Space!" 🚀⭐
// Made by Venki's son
//
// The FIRST space level! After escaping the volcano in the rocket,
// Rufus lands among the stars. Gravity is LOW here, so jumps are
// big and floaty. Hop across the floating space rocks!
// ============================================

const LEVEL_14 = {

  name: "Blast Off to Space!",

  // Space look: starry background, a planet + moon, and LOW gravity (floaty!)
  spaceTheme: true,

  // 8-bit MOON music: dreamy floaty intro that SUDDENLY drops into a hard beat
  music: "moon",

  // No jetpack in space — there's no internet up here! (start cutscene explains it)
  noJetpack: true,
  startCutscene: {
    line1: "Whoa... I'm in SPACE!",
    line2: "No internet up here... so NO jetpack! I'll have to jump!",
  },

  memoir: "Dear Diary, I MADE IT! The rocket blasted me out of the volcano and now I'm floating in SPACE! Everything is so light here — I can jump SUPER high and float! Time to bounce across the space rocks among the stars. Whoa... space is AMAZING!",

  // Deep space sky (stars get drawn on top)
  skyColor: [10, 10, 35],

  // Pale moon-rock ground
  groundColor: [45, 45, 65],

  width: 3600,

  playerStart: { x: 100, y: 0 },
  exit: { x: 3460, y: 300 },

  checkpoints: [
    { x: 1300, y: 560 },
    { x: 2450, y: 560 },
  ],

  // Floating space rocks — spaced out because low gravity = big floaty jumps!
  platforms: [
    { x: 250,  y: 430, width: 140, height: 28 },
    { x: 520,  y: 330, width: 130, height: 28 },
    { x: 780,  y: 420, width: 130, height: 28 },
    { x: 1040, y: 310, width: 130, height: 28 },
    { x: 1300, y: 400, width: 150, height: 28 },
    { x: 1570, y: 300, width: 130, height: 28 },
    { x: 1840, y: 380, width: 130, height: 28 },
    { x: 2100, y: 290, width: 130, height: 28 },
    { x: 2360, y: 400, width: 150, height: 28 },
    { x: 2630, y: 320, width: 130, height: 28 },
    { x: 2900, y: 400, width: 140, height: 28 },
    { x: 3170, y: 330, width: 150, height: 28 },
  ],

  treats: [
    { x: 300, y: 390 }, { x: 560, y: 290 }, { x: 820, y: 380 },
    { x: 1080, y: 270 }, { x: 1340, y: 360 }, { x: 1610, y: 260 },
    { x: 1880, y: 340 }, { x: 2140, y: 250 }, { x: 2400, y: 360 },
    { x: 2670, y: 280 }, { x: 2940, y: 360 }, { x: 3210, y: 290 },
    // floaty high-up star treats
    { x: 700, y: 150 }, { x: 1500, y: 130 }, { x: 2300, y: 140 },
    // ground
    { x: 200, y: 530 }, { x: 1200, y: 530 }, { x: 2200, y: 530 },
    { x: 3350, y: 530 }, { x: 3400, y: 530 },
  ],

  crates: [
    { x: 600, y: 535 },
    { x: 1700, y: 535 },
    { x: 2800, y: 535 },
  ],

  bounceCrates: [
    { x: 1000, y: 560 },
    { x: 2500, y: 560 },
  ],

  // Space bugs & little aliens to bonk
  enemies: [
    { type: "wasp_patrol", x: 500,  y: 250, patrol: 120 },
    { type: "walker", x: 900, y: 535, patrol: 70 },
    { type: "wasp_dive", x: 1400, y: 220, patrol: 60 },
    { type: "walker", x: 1900, y: 535, patrol: 70 },
    { type: "wasp_patrol", x: 2400, y: 240, patrol: 110 },
    { type: "walker", x: 3000, y: 535, patrol: 70 },
  ],
};
