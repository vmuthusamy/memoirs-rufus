// ============================================
// LEVEL 11: "Fiery's Fire Quest" 🌋
// Made by Venki's son
//
// VOLCANO CLIMB! You play as FIERY. Hop up the rocks to the top
// before the RISING LAVA catches you — and SPIT FIRE (Space) at
// the enemies in your way!
// ============================================

const LEVEL_11 = {

  name: "Fiery's Fire Quest",

  // FIRE HERO! You play as Fiery, and Space spits FIRE instead of a tail spin!
  fireHero: true,

  // No jetpack — you climb the rocks with jumps!
  noJetpack: true,

  // Lots of lives — this level is meant to be fun, not frustrating!
  startLives: 6,

  // Play the 8-bit VOLCANO music (with the epic beat drop) while you climb! 🌋
  music: "volcano",

  memoir: "Dear Diary, the volcano is ERUPTING! I'm FIERY and I have to CLIMB the rocks all the way to the top before the LAVA rises and catches me! Bad guys are blocking the way — good thing I can SPIT FIRE! RAWR! Let's GO!",

  // Bright fiery red sky
  skyColor: [255, 70, 50],

  // Dark lava rock ground
  groundColor: [60, 25, 20],

  width: 800,

  // Start on the open ground to the right (no rocks overhead), then climb up-left
  playerStart: { x: 650, y: 0 },

  // Exit is at the TOP of the climb!
  exit: { x: 230, y: -480 },

  // RISING LAVA! Starts below the ground and creeps upward — nice and SLOW
  // so there's plenty of time to climb.
  // startY = where the lava top begins, speed = how fast it rises (px/sec)
  risingLava: { startY: 720, speed: 9 },

  // Checkpoints partway up — if the lava gets you, you restart here
  // (and the lava resets to the bottom so you get another shot!)
  checkpoints: [
    { x: 300, y: 160 },
    { x: 300, y: -200 },
  ],

  // ROCKS to climb — a TIGHT zig-zag that goes almost straight up. Each rock
  // is only a tiny 70px hop to the side and 90px up, and the rocks are nice and
  // WIDE, so every jump is an easy little hop.
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
    { x: 150, y: -430, width: 230, height: 26 }, // top resting rock (with the exit!)
  ],

  // Berries to grab on the way up
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
    // ground start
    { x: 300, y: 530 }, { x: 500, y: 530 },
  ],

  // Smashable crates on the ground
  crates: [
    { x: 380, y: 535 },
    { x: 550, y: 535 },
  ],

  // (No bounce crates — just hop up the rock staircase)
  bounceCrates: [],

  // ENEMIES to fight with fire! (walkers perched on rocks + a couple wasps)
  enemies: [
    { type: "walker", x: 240, y: 265, patrol: 35 },   // on rock 3
    { type: "walker", x: 300, y: -5,  patrol: 35 },   // on rock 6
    { type: "wasp_patrol", x: 280, y: -110, patrol: 90 },
    { type: "walker", x: 240, y: -275, patrol: 35 },  // on rock 9
  ],
};
