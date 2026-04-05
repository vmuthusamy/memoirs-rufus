// ============================================
// LEVEL 1: "The Backyard"
// Rufus's first adventure! Learn to move, jump, and tail spin.
// ============================================

const LEVEL_1 = {
  // What's this level called?
  name: "The Backyard",

  // What chapter of Rufus's memoir is this?
  memoir: "Dear Diary, today I discovered the backyard is full of surprises! There are crates everywhere and treats hidden behind them. Time to put my tail to work!",

  // Background color (sky)
  skyColor: [135, 206, 235],

  // Ground color
  groundColor: [34, 139, 34],

  // How wide is the level? (in pixels)
  width: 3200,

  // Where does Rufus start?
  playerStart: { x: 100, y: 0 },

  // Where is the level exit? (the flag/door)
  exit: { x: 3050, y: 300 },

  // ---- PLATFORMS ----
  // Each platform: { x, y, width, height }
  // x,y = position, width/height = size
  platforms: [
    // Some stepping stones
    { x: 400, y: 450, width: 150, height: 30 },
    { x: 650, y: 380, width: 150, height: 30 },
    { x: 900, y: 320, width: 200, height: 30 },

    // A high ledge with treats
    { x: 1200, y: 250, width: 120, height: 30 },
    { x: 1400, y: 300, width: 180, height: 30 },

    // More platforms
    { x: 1700, y: 400, width: 200, height: 30 },
    { x: 2000, y: 350, width: 150, height: 30 },
    { x: 2200, y: 280, width: 180, height: 30 },

    // Final stretch
    { x: 2500, y: 350, width: 200, height: 30 },
    { x: 2800, y: 300, width: 200, height: 30 },
  ],

  // ---- TREATS ----
  // Things Rufus can collect! { x, y }
  treats: [
    // Ground treats leading the way
    { x: 200, y: 530 },
    { x: 250, y: 530 },
    { x: 300, y: 530 },

    // Treats on first platforms
    { x: 450, y: 410 },
    { x: 500, y: 410 },
    { x: 700, y: 340 },

    // Treats on high ledge (reward for exploring!)
    { x: 1220, y: 210 },
    { x: 1260, y: 210 },
    { x: 1300, y: 210 },

    // Trail of treats
    { x: 1500, y: 530 },
    { x: 1550, y: 530 },
    { x: 1600, y: 530 },
    { x: 1650, y: 530 },

    // Platform treats
    { x: 1750, y: 360 },
    { x: 2050, y: 310 },
    { x: 2260, y: 240 },

    // End treats
    { x: 2900, y: 260 },
    { x: 2950, y: 260 },
    { x: 3000, y: 260 },
  ],

  // ---- CRATES ----
  // Soft obstacles - tail spin destroys these! { x, y }
  crates: [
    { x: 550, y: 535 },
    { x: 1100, y: 535 },
    { x: 1450, y: 535 },
    { x: 1900, y: 535 },
    { x: 2400, y: 535 },
  ],

  // ---- ENEMIES ----
  // type: "walker" = walks back and forth (soft, tail spin works)
  // type: "armored" = need to jump on first, then tail spin
  enemies: [
    { type: "walker", x: 800, y: 535, patrol: 100 },
    { type: "walker", x: 1600, y: 535, patrol: 150 },
    { type: "walker", x: 2100, y: 535, patrol: 100 },
  ],
};
