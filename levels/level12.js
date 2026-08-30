// ============================================
// LEVEL 12: "Lava Dash" 🌋
// Made by Venki's son
//
// A RUFUS level! Run and LEAP across the bubbling LAVA PITS.
// Hop on floating volcano rocks, tail-spin the bad guys, and don't
// fall in the lava!
// ============================================

const LEVEL_12 = {

  name: "Lava Dash",

  // Volcano LOOK (rock platforms + erupting volcano backdrop), but you play
  // as RUFUS with the normal tail spin (no fire hero here).
  lavaTheme: true,

  // Play the 8-bit volcano music with the two beat drops! 🌋
  music: "underground",

  memoir: "Dear Diary, the floor is LAVA! For real this time! I have to RUN and JUMP across the bubbling lava pits and hop on the floating volcano rocks. One slip and it's HOT HOT HOT! Tail spin the bad guys and DASH to the end!",

  // Fiery red sky + dark lava rock ground
  skyColor: [255, 70, 50],
  groundColor: [60, 25, 20],

  startLives: 5,

  width: 3800,

  playerStart: { x: 100, y: 0 },
  exit: { x: 3650, y: 300 },

  // Secret GREEN GEM! It stays HIDDEN until you find the secret button behind
  // the flag and click it. Then you head BACK across the level (away from the
  // flag) all the way to the START, where the gem is waiting floating in the air.
  greenGem: { x: 200, y: 330 },

  // The secret button, tucked behind the exit flag. Click it to reveal the gem
  // at the start and begin the reverse run!
  reverseButton: { x: 3730, y: 500 },

  // LAVA PITS — gaps in the ground filled with lava. Jump over them!
  // (Fall in and you lose a life.) { x: left edge, width: how wide }
  lavaPits: [
    { x: 550,  width: 140 },
    { x: 1050, width: 160 },
    { x: 1550, width: 170 }, // wide — has a floating rock in the middle
    { x: 2150, width: 150 },
    { x: 2650, width: 190 }, // wide — has a floating rock in the middle
    { x: 3150, width: 160 },
  ],

  // Restart points so you don't go all the way back (on solid ground!)
  checkpoints: [
    { x: 1350, y: 560 },
    { x: 2450, y: 560 },
  ],

  // Floating volcano rocks — stepping stones over the wide pits + treat perches
  platforms: [
    { x: 300,  y: 420, width: 140, height: 26 },
    { x: 850,  y: 400, width: 140, height: 26 },
    { x: 1580, y: 485, width: 120, height: 26 }, // stepping stone over pit 3
    { x: 1350, y: 430, width: 140, height: 26 },
    { x: 1950, y: 410, width: 140, height: 26 },
    { x: 2400, y: 420, width: 140, height: 26 },
    { x: 2690, y: 475, width: 120, height: 26 }, // stepping stone over pit 5
    { x: 3000, y: 410, width: 140, height: 26 },
  ],

  treats: [
    // On the elevated rocks
    { x: 360, y: 385 },
    { x: 910, y: 365 },
    { x: 1410, y: 395 },
    { x: 2010, y: 375 },
    { x: 2460, y: 385 },
    { x: 3060, y: 375 },
    // Floating over the pits (grab them mid-jump!)
    { x: 620, y: 500 },
    { x: 1130, y: 500 },
    { x: 1635, y: 450 },
    { x: 2740, y: 440 },
    // On the ground
    { x: 200, y: 530 }, { x: 800, y: 530 }, { x: 1900, y: 530 },
    { x: 2900, y: 530 },
    // Finish party
    { x: 3500, y: 530 }, { x: 3550, y: 530 }, { x: 3600, y: 530 },
  ],

  crates: [
    { x: 450, y: 535 },
    { x: 1400, y: 535 },
    { x: 2900, y: 535 },
  ],

  bounceCrates: [],

  // Bad guys to tail-spin (all on solid ground, never over a pit)
  enemies: [
    { type: "walker", x: 350,  y: 535, patrol: 60 },
    { type: "walker", x: 900,  y: 535, patrol: 60 },
    { type: "wasp_patrol", x: 1300, y: 300, patrol: 120 },
    { type: "armored", x: 1900, y: 535, patrol: 70 },
    { type: "wasp_patrol", x: 2400, y: 280, patrol: 100 },
    { type: "walker", x: 2950, y: 535, patrol: 60 },
  ],
};
