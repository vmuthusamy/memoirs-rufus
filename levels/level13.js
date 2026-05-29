// ============================================
// LEVEL 13: "Volcano Escape!" 🌋🚀
// Made by Venki's son
//
// The LAST volcano level! The lava is CHASING Rufus up the rocks.
// Climb to the top, reach the ROCKET SHIP, and BLAST OFF into space!
// (Next stop: Level 14 — outer space!)
// ============================================

const LEVEL_13 = {

  name: "Volcano Escape!",

  // Volcano look (jagged lava rocks + erupting volcano) and volcano music
  lavaTheme: true,
  music: "volcano",

  // Reaching the exit plays the ROCKET LAUNCH cutscene -> into space!
  launchCutscene: true,

  // No jetpack — you climb with jumps, racing the lava
  noJetpack: true,

  startLives: 6,

  memoir: "Dear Diary, I'm back where FIERY was — the volcano! But this time there's a ROCKET SHIP on top! The lava is chasing me up the rocks, so I have to climb fast, get in the rocket... and then I went to SPACE! Climb, Rufus, CLIMB!",

  skyColor: [255, 70, 50],
  groundColor: [60, 25, 20],

  width: 800,

  // Start on the open ground to the right, then climb up-left to the rocket
  playerStart: { x: 650, y: 0 },

  // The ROCKET is at the very top!
  exit: { x: 250, y: -430 },

  // Lava chases you up — a bit faster than before since it's the big escape!
  risingLava: { startY: 720, speed: 11 },

  checkpoints: [
    { x: 200, y: 150 },
    { x: 200, y: -130 },
  ],

  // Tight zig-zag rock staircase (easy little hops up and over)
  platforms: [
    { x: 150, y: 470, width: 210, height: 26 },
    { x: 220, y: 380, width: 210, height: 26 },
    { x: 150, y: 290, width: 210, height: 26 },
    { x: 220, y: 200, width: 210, height: 26 },
    { x: 150, y: 110, width: 210, height: 26 },
    { x: 220, y: 20,  width: 210, height: 26 },
    { x: 150, y: -70, width: 210, height: 26 },
    { x: 220, y: -160, width: 210, height: 26 },
    { x: 150, y: -250, width: 210, height: 26 },
    { x: 220, y: -340, width: 210, height: 26 },
    { x: 150, y: -430, width: 230, height: 26 }, // top rock — the rocket is here!
  ],

  treats: [
    { x: 240, y: 430 },
    { x: 300, y: 340 },
    { x: 240, y: 250 },
    { x: 300, y: 160 },
    { x: 240, y: 70 },
    { x: 300, y: -20 },
    { x: 240, y: -110 },
    { x: 300, y: -200 },
    { x: 240, y: -290 },
    { x: 300, y: -470 },
    { x: 300, y: 530 }, { x: 500, y: 530 },
  ],

  crates: [
    { x: 380, y: 535 },
    { x: 550, y: 535 },
  ],

  bounceCrates: [],

  // A few bad guys to tail-spin on the way up
  enemies: [
    { type: "walker", x: 240, y: 265, patrol: 35 },
    { type: "walker", x: 300, y: -5,  patrol: 35 },
    { type: "wasp_patrol", x: 280, y: -110, patrol: 90 },
    { type: "walker", x: 240, y: -275, patrol: 35 },
  ],
};
