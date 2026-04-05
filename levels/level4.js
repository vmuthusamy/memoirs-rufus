// ============================================
// LEVEL 4: "The Library"
// Fiery joins! Bookworms attack! A rescue story.
// ============================================

const LEVEL_4 = {
  name: "The Library",

  memoir: "Dear Diary, Fiery and I went to the library today to find him a bedtime story. He wanted to come inside but he's WAY too big for the door. 'I'll wait outside!' he said. Famous last words... The library is CRAWLING with bookworms! They're everywhere, chewing through the pages! I have to fight them alone... or do I?",

  // Indoor library - warm amber light
  skyColor: [180, 160, 120],

  // Dark wooden floor
  groundColor: [100, 70, 40],

  width: 6000,

  playerStart: { x: 100, y: 0 },
  exit: { x: 5850, y: 300 },

  // Checkpoints
  checkpoints: [
    { x: 1900, y: 560 },   // Before the swarm
    { x: 3800, y: 560 },   // After Fiery joins
  ],

  // Special: swarm event triggers at this x position
  swarmTriggerX: 2200,

  // Special: Fiery joins as NPC after swarm
  fieryJoinsX: 2400,

  platforms: [
    // === ACT 1: Rufus alone - bookshelves and reading tables ===
    { x: 300, y: 450, width: 200, height: 30 },
    { x: 550, y: 380, width: 160, height: 30 },
    { x: 800, y: 320, width: 180, height: 30 },
    { x: 1050, y: 400, width: 200, height: 30 },
    { x: 1300, y: 340, width: 150, height: 30 },
    { x: 1550, y: 280, width: 180, height: 30 },
    { x: 1800, y: 400, width: 200, height: 30 },

    // === ACT 2: The swarm area - open space for the big moment ===
    // Fewer platforms here - it's a big open reading room
    { x: 2100, y: 350, width: 250, height: 30 },
    { x: 2500, y: 400, width: 200, height: 30 },

    // === ACT 3: Together with Fiery ===
    { x: 2900, y: 420, width: 180, height: 30 },
    { x: 3150, y: 350, width: 150, height: 30 },
    { x: 3400, y: 280, width: 180, height: 30 },
    { x: 3650, y: 380, width: 150, height: 30 },
    { x: 3900, y: 320, width: 200, height: 30 },
    { x: 4200, y: 400, width: 160, height: 30 },
    { x: 4450, y: 340, width: 180, height: 30 },
    { x: 4750, y: 280, width: 150, height: 30 },
    { x: 5000, y: 380, width: 200, height: 30 },
    { x: 5300, y: 320, width: 180, height: 30 },
    { x: 5600, y: 380, width: 200, height: 30 },
  ],

  treats: [
    // Act 1
    { x: 350, y: 410 }, { x: 400, y: 410 },
    { x: 600, y: 340 }, { x: 650, y: 340 },
    { x: 850, y: 280 }, { x: 900, y: 280 },
    { x: 1100, y: 360 },
    { x: 1350, y: 300 }, { x: 1400, y: 300 },
    { x: 1600, y: 240 },
    { x: 1850, y: 360 },

    // Ground treats act 1
    { x: 200, y: 530 }, { x: 250, y: 530 },
    { x: 700, y: 530 }, { x: 750, y: 530 },
    { x: 1200, y: 530 },
    { x: 1700, y: 530 },

    // Act 2 - swarm area treats
    { x: 2150, y: 310 }, { x: 2200, y: 310 },
    { x: 2550, y: 360 },

    // Act 3 - together with Fiery (more treats as reward!)
    { x: 2950, y: 380 },
    { x: 3200, y: 310 }, { x: 3250, y: 310 },
    { x: 3450, y: 240 }, { x: 3500, y: 240 },
    { x: 3700, y: 340 },
    { x: 3950, y: 280 }, { x: 4000, y: 280 },
    { x: 4250, y: 360 },
    { x: 4500, y: 300 }, { x: 4550, y: 300 },
    { x: 4800, y: 240 },
    { x: 5050, y: 340 }, { x: 5100, y: 340 },
    { x: 5350, y: 280 }, { x: 5400, y: 280 },
    { x: 5650, y: 340 },

    // End celebration
    { x: 5750, y: 530 }, { x: 5780, y: 530 }, { x: 5810, y: 530 },
  ],

  crates: [
    { x: 450, y: 535 },
    { x: 950, y: 535 },
    { x: 1450, y: 535 },
    { x: 1950, y: 535 },
    { x: 3050, y: 535 },
    { x: 3550, y: 535 },
    { x: 4100, y: 535 },
    { x: 4650, y: 535 },
    { x: 5200, y: 535 },
    { x: 5500, y: 535 },
  ],

  bounceCrates: [
    { x: 650, y: 560 },
    { x: 1200, y: 560 },
    { x: 1750, y: 560 },
    { x: 2800, y: 560 },
    { x: 3550, y: 560 },
    { x: 4350, y: 560 },
    { x: 4950, y: 560 },
    { x: 5450, y: 560 },
  ],

  enemies: [
    // === ACT 1: Bookworms! Small clusters ===
    // Cluster 1
    { type: "bookworm", x: 400, y: 535, patrol: 60 },
    { type: "bookworm", x: 440, y: 535, patrol: 60 },
    { type: "bookworm", x: 480, y: 535, patrol: 60 },

    // Cluster 2
    { type: "bookworm", x: 850, y: 535, patrol: 80 },
    { type: "bookworm", x: 890, y: 535, patrol: 80 },
    { type: "bookworm", x: 930, y: 535, patrol: 80 },
    { type: "bookworm", x: 970, y: 535, patrol: 80 },

    // Some on platforms
    { type: "bookworm", x: 600, y: 355, patrol: 40 },
    { type: "bookworm", x: 1100, y: 375, patrol: 50 },

    // Cluster 3 with a walker squirrel mixed in
    { type: "walker", x: 1300, y: 535, patrol: 100 },
    { type: "bookworm", x: 1400, y: 535, patrol: 70 },
    { type: "bookworm", x: 1440, y: 535, patrol: 70 },
    { type: "bookworm", x: 1480, y: 535, patrol: 70 },

    // Big cluster before swarm
    { type: "bookworm", x: 1700, y: 535, patrol: 50 },
    { type: "bookworm", x: 1740, y: 535, patrol: 50 },
    { type: "bookworm", x: 1780, y: 535, patrol: 50 },
    { type: "bookworm", x: 1820, y: 535, patrol: 50 },
    { type: "bookworm", x: 1860, y: 535, patrol: 50 },

    // === ACT 2: Swarm enemies (spawned by script, not placed here) ===
    // The swarm area is deliberately empty - enemies spawn dynamically

    // === ACT 3: Together with Fiery - mixed enemies ===
    // Bookworms (easier with Fiery helping)
    { type: "bookworm", x: 3000, y: 535, patrol: 70 },
    { type: "bookworm", x: 3040, y: 535, patrol: 70 },
    { type: "bookworm", x: 3080, y: 535, patrol: 70 },

    // Armored bookworms (books as shields!)
    { type: "armored", x: 3300, y: 535, patrol: 60, speed: 70 },

    { type: "bookworm", x: 3600, y: 535, patrol: 80 },
    { type: "bookworm", x: 3640, y: 535, patrol: 80 },
    { type: "walker", x: 3800, y: 535, patrol: 90 },

    { type: "armored", x: 4050, y: 535, patrol: 70, speed: 75 },
    { type: "bookworm", x: 4300, y: 535, patrol: 60 },
    { type: "bookworm", x: 4340, y: 535, patrol: 60 },
    { type: "bookworm", x: 4380, y: 535, patrol: 60 },

    { type: "armored", x: 4600, y: 535, patrol: 60, speed: 80 },
    { type: "walker", x: 4900, y: 535, patrol: 100, speed: 75 },

    { type: "bookworm", x: 5150, y: 535, patrol: 70 },
    { type: "bookworm", x: 5190, y: 535, patrol: 70 },
    { type: "bookworm", x: 5230, y: 535, patrol: 70 },
    { type: "bookworm", x: 5270, y: 535, patrol: 70 },

    // Platform enemies act 3
    { type: "bookworm", x: 3200, y: 325, patrol: 40 },
    { type: "bookworm", x: 4500, y: 315, patrol: 45 },
    { type: "walker", x: 5050, y: 355, patrol: 50 },
    { type: "walker", x: 5650, y: 355, patrol: 50 },
  ],
};
