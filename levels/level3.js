// ============================================
// LEVEL 3: "The School Gym"
// Wasps appear! Mix of flying enemies and ground squirrels.
// ============================================

const LEVEL_3 = {
  name: "The School Gym",

  memoir: "Dear Diary, I snuck into the school gym today. BIG MISTAKE. There are WASPS everywhere buzzing around the ceiling! And the squirrels followed me inside with their stupid helmets! Some wasps just fly around, but others DIVE at me when I get close. Time for some advanced tail work... I need to spin fast and dodge faster!",

  // Indoor gym - grayish ceiling
  skyColor: [200, 195, 185],

  // Wooden gym floor
  groundColor: [160, 120, 60],

  width: 5500,

  playerStart: { x: 100, y: 0 },
  exit: { x: 5350, y: 300 },

  // Checkpoints (flag posts)
  checkpoints: [
    { x: 1800, y: 560 },
    { x: 3500, y: 560 },
  ],

  platforms: [
    // === FIRST THIRD: Learn wasps ===
    // Gym benches and low equipment
    { x: 300, y: 450, width: 180, height: 30 },
    { x: 550, y: 380, width: 150, height: 30 },
    { x: 800, y: 320, width: 180, height: 30 },
    { x: 1100, y: 400, width: 200, height: 30 },
    { x: 1400, y: 350, width: 150, height: 30 },
    { x: 1650, y: 280, width: 180, height: 30 },

    // === SECOND THIRD: Hybrid zone ===
    // Climbing frames and bars
    { x: 2000, y: 450, width: 130, height: 30 },
    { x: 2200, y: 350, width: 120, height: 30 },
    { x: 2400, y: 250, width: 150, height: 30 },
    { x: 2650, y: 350, width: 130, height: 30 },
    { x: 2850, y: 420, width: 180, height: 30 },
    { x: 3100, y: 300, width: 150, height: 30 },
    { x: 3350, y: 380, width: 120, height: 30 },

    // === FINAL THIRD: The gauntlet ===
    // High bars and tight platforms
    { x: 3600, y: 320, width: 100, height: 30 },
    { x: 3800, y: 250, width: 120, height: 30 },
    { x: 4000, y: 350, width: 100, height: 30 },
    { x: 4200, y: 280, width: 130, height: 30 },
    { x: 4450, y: 400, width: 150, height: 30 },
    { x: 4700, y: 320, width: 120, height: 30 },
    { x: 4950, y: 250, width: 150, height: 30 },
    { x: 5150, y: 350, width: 180, height: 30 },
  ],

  treats: [
    // First section
    { x: 350, y: 410 }, { x: 400, y: 410 },
    { x: 600, y: 340 }, { x: 650, y: 340 },
    { x: 850, y: 280 },
    { x: 1150, y: 360 }, { x: 1200, y: 360 },
    { x: 1450, y: 310 },
    { x: 1700, y: 240 }, { x: 1750, y: 240 },

    // Ground treats
    { x: 400, y: 530 }, { x: 450, y: 530 },
    { x: 900, y: 530 }, { x: 950, y: 530 },
    { x: 1300, y: 530 },

    // Second section
    { x: 2050, y: 410 },
    { x: 2250, y: 310 },
    { x: 2450, y: 210 }, { x: 2500, y: 210 },
    { x: 2700, y: 310 },
    { x: 2900, y: 380 },
    { x: 3150, y: 260 }, { x: 3200, y: 260 },

    // Third section - bonus treats up high
    { x: 3650, y: 280 },
    { x: 3850, y: 210 }, { x: 3900, y: 210 },
    { x: 4050, y: 310 },
    { x: 4250, y: 240 }, { x: 4300, y: 240 },
    { x: 4500, y: 360 },
    { x: 4750, y: 280 },
    { x: 5000, y: 210 }, { x: 5050, y: 210 },
    { x: 5200, y: 310 },

    // End celebration
    { x: 5250, y: 530 }, { x: 5280, y: 530 }, { x: 5310, y: 530 },
  ],

  crates: [
    { x: 500, y: 535 },
    { x: 1000, y: 535 },
    { x: 1550, y: 535 },
    { x: 2100, y: 535 },
    { x: 2750, y: 535 },
    { x: 3250, y: 535 },
    { x: 3900, y: 535 },
    { x: 4600, y: 535 },
    { x: 5100, y: 535 },
  ],

  bounceCrates: [
    { x: 450, y: 560 },
    { x: 1250, y: 560 },
    { x: 1950, y: 560 },
    { x: 2550, y: 560 },
    { x: 3150, y: 560 },
    { x: 3750, y: 560 },
    { x: 4400, y: 560 },
    { x: 5050, y: 560 },
  ],

  enemies: [
    // === FIRST THIRD: Learn wasps (walkers + wasp_patrol) ===
    // Ground walkers
    { type: "walker", x: 700, y: 535, patrol: 100 },
    { type: "walker", x: 1300, y: 535, patrol: 120 },

    // First wasps! Flying in sine waves above
    { type: "wasp_patrol", x: 500, y: 300, patrol: 120 },
    { type: "wasp_patrol", x: 900, y: 250, patrol: 100 },
    { type: "wasp_patrol", x: 1500, y: 280, patrol: 130 },

    // Platform walker
    { type: "walker", x: 850, y: 295, patrol: 50 },

    // === SECOND THIRD: Hybrid zone ===
    // Armored squirrels on the ground...
    { type: "armored", x: 2100, y: 535, patrol: 80, speed: 75 },
    { type: "armored", x: 2600, y: 535, patrol: 70, speed: 80 },
    { type: "walker", x: 2950, y: 535, patrol: 90, speed: 70 },
    { type: "armored", x: 3200, y: 535, patrol: 60, speed: 75 },

    // ...with wasp_patrol buzzing above!
    { type: "wasp_patrol", x: 2200, y: 220, patrol: 100 },
    { type: "wasp_patrol", x: 2700, y: 200, patrol: 120 },
    { type: "wasp_patrol", x: 3100, y: 240, patrol: 100 },

    // Platform enemies in hybrid zone
    { type: "walker", x: 2250, y: 325, patrol: 35 },
    { type: "armored", x: 2900, y: 395, patrol: 50, speed: 65 },

    // === FINAL THIRD: Dive bombers + armored ===
    // Ground armored squirrels (fast!)
    { type: "armored", x: 3700, y: 535, patrol: 80, speed: 90 },
    { type: "armored", x: 4100, y: 535, patrol: 70, speed: 85 },
    { type: "walker", x: 4500, y: 535, patrol: 90, speed: 95 },
    { type: "armored", x: 4800, y: 535, patrol: 60, speed: 90 },

    // DIVE BOMBERS! They swoop at Rufus!
    { type: "wasp_dive", x: 3800, y: 180, patrol: 50 },
    { type: "wasp_dive", x: 4250, y: 160, patrol: 50 },
    { type: "wasp_dive", x: 4700, y: 170, patrol: 50 },
    { type: "wasp_dive", x: 5100, y: 180, patrol: 50 },

    // Patrol wasps in the final stretch too
    { type: "wasp_patrol", x: 3900, y: 230, patrol: 80 },
    { type: "wasp_patrol", x: 4400, y: 200, patrol: 100 },

    // Platform guards
    { type: "walker", x: 3850, y: 225, patrol: 35, speed: 80 },
    { type: "armored", x: 4750, y: 295, patrol: 40, speed: 70 },
  ],
};
