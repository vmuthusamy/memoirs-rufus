// ============================================
// LEVEL 2: "The Neighborhood"
// Armored enemies appear! Learn the jump-disarm combo.
// HARDER: More enemies, tighter gaps, enemies on platforms!
// ============================================

const LEVEL_2 = {
  name: "The Neighborhood",

  memoir: "Dear Diary, I ventured past the fence today. The neighborhood squirrels have HELMETS now! And they're EVERYWHERE - on the ground, on platforms, even guarding the treats! I learned that if I jump on them first, their helmets pop off. Then my tail spin finishes the job. This is going to be tough!",

  skyColor: [180, 220, 255],
  groundColor: [80, 160, 50],
  width: 4800,

  playerStart: { x: 100, y: 0 },
  exit: { x: 4650, y: 300 },

  // Hidden golden paw! Floating in the gap between staircase top and high road
  // You have to jump from the staircase (x:2450 y:240) and aim LEFT of the high road
  secretPaw: { x: 2600, y: 150 },

  platforms: [
    // Opening section - teaches jump-disarm with space to breathe
    { x: 300, y: 450, width: 180, height: 30 },
    { x: 550, y: 380, width: 130, height: 30 },
    { x: 800, y: 320, width: 160, height: 30 },

    // Gauntlet section - tighter platforms, enemies patrolling
    { x: 1100, y: 420, width: 120, height: 30 },
    { x: 1300, y: 350, width: 100, height: 30 },
    { x: 1500, y: 280, width: 130, height: 30 },
    { x: 1700, y: 350, width: 100, height: 30 },

    // Staircase of danger
    { x: 2000, y: 450, width: 120, height: 30 },
    { x: 2150, y: 380, width: 100, height: 30 },
    { x: 2300, y: 310, width: 100, height: 30 },
    { x: 2450, y: 240, width: 120, height: 30 },

    // High road or low road (choice!)
    { x: 2750, y: 200, width: 200, height: 30 },  // High (harder, more treats)
    { x: 2750, y: 420, width: 200, height: 30 },  // Low (easier)

    // Final gauntlet
    { x: 3100, y: 350, width: 130, height: 30 },
    { x: 3350, y: 280, width: 100, height: 30 },
    { x: 3550, y: 350, width: 120, height: 30 },
    { x: 3800, y: 300, width: 150, height: 30 },
    { x: 4100, y: 380, width: 130, height: 30 },
    { x: 4350, y: 320, width: 200, height: 30 },
  ],

  treats: [
    // Opening
    { x: 350, y: 410 }, { x: 400, y: 410 },
    { x: 600, y: 340 },
    { x: 850, y: 280 }, { x: 900, y: 280 },

    // Gauntlet treats (risk/reward!)
    { x: 1150, y: 380 },
    { x: 1350, y: 310 },
    { x: 1550, y: 240 }, { x: 1580, y: 240 },
    { x: 1750, y: 310 },

    // Staircase
    { x: 2050, y: 410 },
    { x: 2200, y: 340 },
    { x: 2350, y: 270 },
    { x: 2500, y: 200 }, { x: 2530, y: 200 },

    // High road bonus treats (reward for taking the hard path!)
    { x: 2780, y: 160 }, { x: 2820, y: 160 }, { x: 2860, y: 160 },
    { x: 2900, y: 160 }, { x: 2940, y: 160 },

    // Low road (just one)
    { x: 2850, y: 380 },

    // Final stretch
    { x: 3150, y: 310 },
    { x: 3400, y: 240 },
    { x: 3600, y: 310 },
    { x: 3850, y: 260 }, { x: 3900, y: 260 },
    { x: 4150, y: 340 },
    { x: 4400, y: 280 }, { x: 4450, y: 280 },

    // End celebration
    { x: 4550, y: 530 }, { x: 4580, y: 530 }, { x: 4610, y: 530 },
  ],

  crates: [
    { x: 450, y: 535 },
    { x: 950, y: 535 },
    { x: 1600, y: 535 },
    { x: 1900, y: 535 },
    { x: 2650, y: 535 },
    { x: 3000, y: 535 },
    { x: 3700, y: 535 },
    { x: 4200, y: 535 },
  ],

  // Bounce crates to help get back up after falling
  bounceCrates: [
    { x: 700, y: 560 },    // After first set of platforms
    { x: 1450, y: 560 },   // Middle of gauntlet
    { x: 2100, y: 560 },   // Base of staircase
    { x: 2950, y: 560 },   // After high/low road choice
    { x: 3450, y: 560 },   // Final gauntlet
    { x: 4500, y: 560 },   // Near the exit
  ],

  // Checkpoints (flag posts - respawn here on death)
  checkpoints: [
    { x: 1600, y: 560 },
    { x: 3000, y: 560 },
  ],

  enemies: [
    // Opening - single walker to warm up (faster speed!)
    { type: "walker", x: 650, y: 535, patrol: 100, speed: 80 },

    // First armored enemy - alone so player can learn
    { type: "armored", x: 1000, y: 535, patrol: 80, speed: 70 },

    // Gauntlet - walker + armored combos! (faster)
    { type: "walker", x: 1200, y: 535, patrol: 70, speed: 85 },
    { type: "walker", x: 1400, y: 535, patrol: 90, speed: 80 },
    { type: "armored", x: 1650, y: 535, patrol: 60, speed: 75 },

    // Staircase guards
    { type: "walker", x: 1850, y: 535, patrol: 80, speed: 85 },
    { type: "armored", x: 2250, y: 535, patrol: 50, speed: 70 },

    // Between the roads
    { type: "walker", x: 2650, y: 535, patrol: 100, speed: 90 },
    { type: "armored", x: 2850, y: 535, patrol: 70, speed: 75 },

    // Final gauntlet - the hard part! (fastest)
    { type: "armored", x: 3200, y: 535, patrol: 90, speed: 85 },
    { type: "walker", x: 3400, y: 535, patrol: 60, speed: 95 },
    { type: "armored", x: 3650, y: 535, patrol: 80, speed: 80 },
    { type: "walker", x: 3900, y: 535, patrol: 100, speed: 90 },
    { type: "armored", x: 4100, y: 535, patrol: 70, speed: 85 },
    { type: "walker", x: 4300, y: 535, patrol: 90, speed: 95 },

    // Platform squirrels! Faster and meaner
    { type: "walker", x: 580, y: 355, patrol: 40, speed: 75 },
    { type: "armored", x: 1350, y: 325, patrol: 30, speed: 65 },
    { type: "armored", x: 1550, y: 255, patrol: 40, speed: 70 },
    { type: "walker", x: 2800, y: 175, patrol: 60, speed: 80 },
    { type: "armored", x: 2800, y: 395, patrol: 50, speed: 75 },
    { type: "armored", x: 3850, y: 275, patrol: 50, speed: 70 },
    { type: "walker", x: 4400, y: 295, patrol: 60, speed: 85 },
  ],
};
