// ============================================
// LEVEL 16: "Felix's Piano Party" 🎹🦊🔊
// Made by Arvind (Venki's son)
//
// Rufus follows a path of giant PIANO KEYS to find his DAD, FELIX! There's NO
// background music at all — the ONLY sound is Rufus jumping the keys. Each key
// plays one note of our DUBSTEP song in piano form, so hopping across all the
// keys plays the whole dubstep riff yourself. It's a long piano solo to Dad!
// ============================================

const LEVEL_16 = {

  name: "Cool Music",

  // Piano-key platforms — each key plays a NOTE of our DUBSTEP SONG (in piano
  // form). There is NO background music; the only music is you jumping the keys!
  pianoTheme: true,
  // (no `music:` field on purpose — silence until YOU play the keys)

  // The exit IS Felix, Rufus's dad, on his music stage (instead of a flag)
  felixExit: true,

  // No jetpack — this is a hop-and-play music level
  noJetpack: true,

  startLives: 7,

  memoir: "Dear Diary, everything was SILENT until I stepped on the first key — WUB! The long path to my DAD, FELIX, was a giant piano, and every key played a note of our DUBSTEP song, but in piano sounds. When I hopped across all of them I played the whole dubstep riff myself! No background music at all — I made ALL of it with my feet. It was the longest, coolest piano solo ever. 🎹🔊",

  // Bright, colorful party sky + purple stage floor
  skyColor: [40, 20, 70],
  groundColor: [95, 55, 120],

  width: 5200,

  playerStart: { x: 100, y: 0 },
  // Reach Felix on his stage at the end!
  exit: { x: 4900, y: 560 },

  // (no start cutscene — jump right into the music!)

  // Golden paw guarded down low by two walkers, halfway through
  secretPaw: { x: 2760, y: 505 },

  checkpoints: [
    { x: 1300, y: 560 },
    { x: 2800, y: 560 },
    { x: 4200, y: 560 },
  ],

  // Each PIANO KEY plays one note of our DUBSTEP riff (in piano form!). The
  // pianoNote value is the exact note. Jump them left-to-right to play the whole
  // song. It's in E-minor (dark and driving, like dubstep). Higher notes = higher
  // keys, but the jumps are small and there's solid ground under everything, so
  // the level is always beatable.
  platforms: [
    { x: 350,  y: 472, width: 95, height: 26, pianoNote: 64 }, // E
    { x: 510,  y: 472, width: 95, height: 26, pianoNote: 64 }, // E
    { x: 670,  y: 409, width: 95, height: 26, pianoNote: 71 }, // B
    { x: 830,  y: 364, width: 95, height: 26, pianoNote: 76 }, // E (high)
    { x: 990,  y: 409, width: 95, height: 26, pianoNote: 71 }, // B
    { x: 1150, y: 445, width: 95, height: 26, pianoNote: 67 }, // G
    { x: 1310, y: 472, width: 95, height: 26, pianoNote: 64 }, // E
    { x: 1470, y: 445, width: 95, height: 26, pianoNote: 67 }, // G
    { x: 1630, y: 382, width: 95, height: 26, pianoNote: 74 }, // D (high)
    { x: 1790, y: 409, width: 95, height: 26, pianoNote: 71 }, // B
    { x: 1950, y: 445, width: 95, height: 26, pianoNote: 67 }, // G
    { x: 2110, y: 427, width: 95, height: 26, pianoNote: 69 }, // A
    { x: 2270, y: 409, width: 95, height: 26, pianoNote: 71 }, // B
    { x: 2430, y: 445, width: 95, height: 26, pianoNote: 67 }, // G
    { x: 2590, y: 472, width: 95, height: 26, pianoNote: 64 }, // E
    { x: 2750, y: 490, width: 95, height: 26, pianoNote: 62 }, // D (low)
    { x: 2910, y: 472, width: 95, height: 26, pianoNote: 64 }, // E
    { x: 3070, y: 445, width: 95, height: 26, pianoNote: 67 }, // G
    { x: 3230, y: 409, width: 95, height: 26, pianoNote: 71 }, // B
    { x: 3390, y: 364, width: 95, height: 26, pianoNote: 76 }, // E (high)
    { x: 3550, y: 382, width: 95, height: 26, pianoNote: 74 }, // D (high)
    { x: 3710, y: 409, width: 95, height: 26, pianoNote: 71 }, // B
    { x: 3870, y: 445, width: 95, height: 26, pianoNote: 67 }, // G
    { x: 4030, y: 409, width: 95, height: 26, pianoNote: 71 }, // B
    { x: 4190, y: 364, width: 95, height: 26, pianoNote: 76 }, // E (high)
    { x: 4350, y: 382, width: 95, height: 26, pianoNote: 74 }, // D (high)
    { x: 4510, y: 409, width: 95, height: 26, pianoNote: 71 }, // B
    { x: 4670, y: 364, width: 95, height: 26, pianoNote: 76 }, // E (high) — big finish!
  ],

  // A treat floating above each key (reward for playing the whole song) + ground trail
  treats: [
    { x: 350, y: 432 }, { x: 510, y: 432 }, { x: 670, y: 369 }, { x: 830, y: 324 },
    { x: 990, y: 369 }, { x: 1150, y: 405 }, { x: 1310, y: 432 }, { x: 1470, y: 405 },
    { x: 1630, y: 342 }, { x: 1790, y: 369 }, { x: 1950, y: 405 }, { x: 2110, y: 387 },
    { x: 2270, y: 369 }, { x: 2430, y: 405 }, { x: 2590, y: 432 }, { x: 2750, y: 450 },
    { x: 2910, y: 432 }, { x: 3070, y: 405 }, { x: 3230, y: 369 }, { x: 3390, y: 324 },
    { x: 3550, y: 342 }, { x: 3710, y: 369 }, { x: 3870, y: 405 }, { x: 4030, y: 369 },
    { x: 4190, y: 324 }, { x: 4350, y: 342 }, { x: 4510, y: 369 }, { x: 4670, y: 324 },
    // ground trail
    { x: 250, y: 530 }, { x: 1900, y: 530 }, { x: 3400, y: 530 }, { x: 4780, y: 530 },
  ],

  crates: [
    { x: 900, y: 535 },
    { x: 2200, y: 535 },
    { x: 3600, y: 535 },
    { x: 4450, y: 535 },
  ],

  // Bounce crates help spring up to the highest keys (the high E's)
  bounceCrates: [
    { x: 800, y: 560 },
    { x: 4160, y: 560 },
  ],

  // A few gentle bad guys to tail-spin. Two walkers guard the golden paw at x~2760.
  enemies: [
    { type: "walker", x: 700,  y: 535, patrol: 90 },
    { type: "wasp_patrol", x: 1500, y: 320, patrol: 110 },
    { type: "walker", x: 2680, y: 535, patrol: 70 },  // guards the golden paw
    { type: "walker", x: 2840, y: 535, patrol: 70 },  // guards the golden paw
    { type: "walker", x: 3600, y: 535, patrol: 90 },
    { type: "wasp_patrol", x: 3950, y: 330, patrol: 100 },
    { type: "walker", x: 4500, y: 535, patrol: 80 },
  ],
};
