// ============================================
// LEVEL 15: "Snakes on the Moon" 🌙🚀🐍
// Made by Arvind (Venki's son)
//
// Rufus is on the MOON! He finds a rocket ship to get home... but then he's
// stuck in a pit of space snakes! Milk snake, rattlesnake, Russell's viper,
// spitting cobra, and the giant KING COBRA. The spitting cobras spit venom!
// ============================================

const LEVEL_15 = {

  name: "Snakes on the Moon",

  // Moon look (space backdrop + moon rocks) and floaty low gravity + moon music
  spaceTheme: true,
  music: "jungle",

  // No jetpack — there's no internet on the moon! (just like Level 14)
  noJetpack: true,

  memoir: "Dear Diary, I was floating around on the MOON when I found a rocket ship — my ride home! But before I could climb in... SNAKES! Space snakes everywhere! Milk snakes, rattlesnakes, a fast Russell's viper, spitting cobras that SPIT venom, and a giant KING COBRA. I'm stuck! I have to slither past them all to reach the rocket!",

  // Dark space sky + gray moon ground
  skyColor: [12, 10, 35],
  groundColor: [85, 85, 100],

  startLives: 6,

  width: 4300,

  playerStart: { x: 100, y: 0 },
  // The exit is a ROCKET SHIP on the ground (Rufus's escape!) instead of a flag
  exit: { x: 4180, y: 560 },
  rocketExit: true,

  // Story popup at the very start
  startCutscene: {
    line1: "Rufus is stuck on the MOON!",
    line2: "Reach the rocket ship to escape... but SPACE SNAKES are everywhere!",
  },

  // Golden paw guarded by the KING COBRA at the end
  secretPaw: { x: 3850, y: 470 },

  // Red gem up on a high ledge
  redGem: { x: 2050, y: 250 },

  checkpoints: [
    { x: 1400, y: 560 },
    { x: 2700, y: 560 },
  ],

  // Reachable platforms (Rufus jumps about 130px, ground is ~560)
  platforms: [
    { x: 700,  y: 450, width: 150, height: 30 },
    { x: 1050, y: 420, width: 140, height: 30 },
    { x: 1600, y: 440, width: 150, height: 30 },
    // stair up to the red gem
    { x: 1850, y: 440, width: 130, height: 30 },
    { x: 2050, y: 330, width: 140, height: 30 },
    { x: 2400, y: 450, width: 150, height: 30 },
    { x: 2950, y: 430, width: 150, height: 30 },
    { x: 3300, y: 450, width: 140, height: 30 },
    { x: 3700, y: 430, width: 160, height: 30 },
  ],

  treats: [
    { x: 700, y: 410 }, { x: 1050, y: 380 }, { x: 1600, y: 400 },
    { x: 2050, y: 290 }, { x: 2400, y: 410 }, { x: 2950, y: 390 },
    { x: 3300, y: 410 }, { x: 3700, y: 390 },
    // ground trail
    { x: 450, y: 530 }, { x: 900, y: 530 }, { x: 1300, y: 530 },
    { x: 1800, y: 530 }, { x: 2200, y: 530 }, { x: 2600, y: 530 },
    { x: 3100, y: 530 }, { x: 3500, y: 530 },
    // exit cluster
    { x: 4050, y: 530 }, { x: 4090, y: 530 }, { x: 4130, y: 530 },
  ],

  crates: [
    { x: 850, y: 535 },
    { x: 1500, y: 535 },
    { x: 2300, y: 535 },
    { x: 3150, y: 535 },
  ],

  bounceCrates: [
    { x: 2010, y: 560 },  // bounce up to the red gem ledge
    { x: 3550, y: 560 },
  ],

  // The snakes! Introduced one species at a time, building up to the KING COBRA.
  enemies: [
    // 1) Milk snake — slow and harmless-looking (easy intro)
    { type: "milk_snake", x: 600, y: 535, patrol: 90, speed: 40 },

    // 2) Rattlesnake — normal speed, rattles its tail
    { type: "rattlesnake", x: 1150, y: 535, patrol: 110, speed: 65 },

    // 3) Russell's viper — FAST!
    { type: "russells_viper", x: 1750, y: 535, patrol: 140, speed: 115 },

    // 4) Spitting cobra — spits venom across the ground! Dodge or rush it.
    { type: "spitting_cobra", x: 2350, y: 535, patrol: 60, speed: 45 },

    // 5) A mixed nest
    { type: "rattlesnake", x: 2850, y: 535, patrol: 100, speed: 70 },
    { type: "russells_viper", x: 3100, y: 535, patrol: 130, speed: 120 },
    { type: "spitting_cobra", x: 3450, y: 535, patrol: 50, speed: 45 },

    // 6) The giant KING COBRA guards the golden paw and the rocket exit!
    { type: "king_cobra", x: 3900, y: 535, patrol: 120, speed: 75 },
  ],
};
