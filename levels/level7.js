// ============================================
// LEVEL 7: "Candy Kingdom"
// First level with the JETPACK! Fly high!
// ============================================

const LEVEL_7 = {
  name: "Jetpack Training",

  memoir: "Dear Diary, I took the King Clown's JETPACK! I strapped it to my back! Hold W to blast upward and arrow keys to steer! But the fuel runs out so I have to land to refuel! There are lollipops and chocolate spikes everywhere... time to fly over them!",

  // Cotton candy pink sky
  skyColor: [255, 180, 220],

  // Soft grass
  groundColor: [60, 160, 50],

  startLives: 3,

  width: 2000,

  playerStart: { x: 100, y: 0 },
  exit: { x: 1850, y: 300 },

  // Golden paw hidden RIGHT on top of the wasp — you can't see it!
  secretPaw: { x: 1100, y: 200 },

  // No platforms — just fly over the lollipops!
  platforms: [],

  treats: [
    // Treats on each platform as rewards
    { x: 350, y: 410 }, { x: 400, y: 410 }, { x: 450, y: 410 },
    { x: 650, y: 310 }, { x: 700, y: 310 }, { x: 750, y: 310 },
    { x: 1000, y: 210 }, { x: 1050, y: 210 }, { x: 1100, y: 210 },
    { x: 1350, y: 110 }, { x: 1400, y: 110 }, { x: 1450, y: 110 },
    // Sky treats — fly up to grab them!
    { x: 1350, y: 60 }, { x: 1400, y: 60 },
    // Ground treats
    { x: 200, y: 530 }, { x: 500, y: 530 }, { x: 800, y: 530 },
    // Exit treats
    { x: 1700, y: 360 }, { x: 1750, y: 360 }, { x: 1800, y: 360 },
  ],

  crates: [],

  bounceCrates: [],

  // Lollipop obstacles — tall candy sticks you have to fly OVER!
  lollipops: [
    { x: 450, y: 250 },
    { x: 800, y: 200 },
    { x: 1200, y: 150 },
    { x: 1550, y: 180 },
  ],

  // Chocolate spikes in the gaps between lollipops — don't land on them!
  spikes: [
    { x: 550, y: 545, width: 150 },
    { x: 900, y: 545, width: 200 },
    { x: 1300, y: 545, width: 150 },
    { x: 1650, y: 545, width: 150 },
  ],

  // Only a few easy enemies — this is a tutorial!
  enemies: [
    { type: "walker", x: 500, y: 535, patrol: 80 },
    { type: "walker", x: 900, y: 535, patrol: 80 },
    { type: "wasp_patrol", x: 1100, y: 200, patrol: 100 },
  ],
};
