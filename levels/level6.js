// ============================================
// LEVEL 6: "The Big Top Showdown"
// BOSS FIGHT! The King Clown has a JETPACK!
// ============================================

const LEVEL_6 = {
  name: "King Clown",

  memoir: "Dear Diary, I made it to the center ring of the circus tent... and there HE is. The KING CLOWN. He's HUGE, he's got a JETPACK, and he's wearing a golden crown! He's laughing at me and flying around shooting fire from his jetpack! The only way to beat him is to dodge when he dives at me, then JUMP ON HIS HEAD when he crashes! But he keeps getting faster and summoning his little clown minions! This is the ultimate showdown... it's me vs the King Clown! LET'S GO!",

  // Inside the circus center ring — dark dramatic tent
  skyColor: [60, 20, 30],

  // Circus ring floor (sandy/sawdust)
  groundColor: [180, 160, 120],

  // Boss arena — not too wide, enclosed feeling
  width: 1200,

  startLives: 5,

  playerStart: { x: 100, y: 0 },

  // Exit only appears AFTER the boss is defeated!
  exit: { x: 600, y: 300 },

  // No golden paw — the jetpack IS the reward!
  // No checkpoints — it's a boss fight!

  // Boss fight flag — the game engine uses this
  isBossFight: true,
  bossType: "kingClown",

  // Platforms — circus ring with some escape platforms
  platforms: [
    // Left raised platform (escape spot)
    { x: 100, y: 380, width: 150, height: 30 },
    // Center high platform
    { x: 450, y: 300, width: 200, height: 30 },
    // Right raised platform (escape spot)
    { x: 900, y: 380, width: 150, height: 30 },
    // Extra high perch (risky but safe from ground attacks)
    { x: 500, y: 180, width: 120, height: 30 },
  ],

  // Treats scattered around the arena
  treats: [
    { x: 150, y: 340 }, { x: 200, y: 340 },
    { x: 500, y: 260 }, { x: 550, y: 260 },
    { x: 950, y: 340 }, { x: 1000, y: 340 },
    { x: 300, y: 530 }, { x: 500, y: 530 }, { x: 700, y: 530 }, { x: 900, y: 530 },
    // Secret treat cluster on the high perch
    { x: 530, y: 140 }, { x: 560, y: 140 },
  ],

  crates: [
    { x: 250, y: 535 },
    { x: 750, y: 535 },
  ],

  bounceCrates: [
    { x: 350, y: 560 },
    { x: 800, y: 560 },
  ],

  // No regular enemies — the BOSS is the enemy!
  enemies: [],
};
