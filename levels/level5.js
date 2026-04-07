// ============================================
// LEVEL 5: "The Theme Park"
// Circus squirrels have taken over! Wild ride ahead!
// ============================================

const LEVEL_5 = {
  name: "The Theme Park",

  memoir: "Dear Diary, I went to the carnival tent today for a fun day out... but the CIRCUS has gone WILD! There are CLOWN SQUIRRELS bouncing around — I can't spin them, I can only jump on their big red noses! The armored squirrels are driving bumper cars with racing goggles! Bookworms are chewing through the ticket stubs! And the wasps? They're doing aerial acrobatics from the tent ceiling, DIVE BOMBING me! I have to fight through the roller coaster, the bumper cars, the haunted house, AND the ferris wheel to escape this crazy carnival. Step right up, folks... it's showtime!",

  // Inside a big carnival tent — red and white striped canopy feel
  skyColor: [180, 40, 40],

  // Paved ground (asphalt paths)
  groundColor: [90, 85, 80],

  // Start with 5 lives — this level is tough!
  startLives: 5,

  width: 6500,

  playerStart: { x: 100, y: 0 },
  exit: { x: 6350, y: 300 },

  // Hidden golden paw! Buried in the middle of the bumper car enemy swarm
  // at ground level — surrounded by fast armored squirrels and bookworms
  // You HAVE to fight through them all to grab it
  secretPaw: { x: 3150, y: 535 },

  checkpoints: [
    { x: 2000, y: 560 },
    { x: 4200, y: 560 },
  ],

  platforms: [
    // === ENTRANCE ZONE: Welcome to the park! ===
    { x: 300, y: 450, width: 180, height: 30 },
    { x: 550, y: 400, width: 140, height: 30 },
    { x: 850, y: 340, width: 150, height: 30 },

    // === ROLLER COASTER: The big climb and plunge ===
    // Climb up — narrow platforms, getting higher
    { x: 1150, y: 420, width: 110, height: 30 },
    { x: 1350, y: 340, width: 100, height: 30 },
    { x: 1550, y: 260, width: 110, height: 30 },
    { x: 1750, y: 200, width: 120, height: 30 },
    { x: 1950, y: 160, width: 100, height: 30 },  // Peak!
    // Plunge down — tight and fast
    { x: 2150, y: 250, width: 100, height: 30 },
    { x: 2350, y: 350, width: 110, height: 30 },
    { x: 2550, y: 430, width: 100, height: 30 },

    // === BUMPER CAR ARENA: Tight chaotic platforms ===
    { x: 2800, y: 380, width: 90, height: 30 },
    { x: 2970, y: 310, width: 90, height: 30 },
    { x: 3140, y: 380, width: 90, height: 30 },
    { x: 3310, y: 270, width: 90, height: 30 },
    { x: 3480, y: 340, width: 90, height: 30 },
    { x: 3650, y: 400, width: 90, height: 30 },

    // === HAUNTED HOUSE TUNNEL: Dark zone, enemies jump out ===
    { x: 3900, y: 350, width: 120, height: 30 },
    { x: 4100, y: 280, width: 100, height: 30 },
    { x: 4300, y: 350, width: 110, height: 30 },
    { x: 4500, y: 250, width: 100, height: 30 },

    // === FERRIS WHEEL: Very high, very scary ===
    { x: 4750, y: 300, width: 120, height: 30 },
    { x: 4950, y: 220, width: 110, height: 30 },
    { x: 5150, y: 170, width: 120, height: 30 },
    { x: 5350, y: 230, width: 110, height: 30 },
    { x: 5550, y: 320, width: 120, height: 30 },

    // === FINAL RIDE: Sprint to the exit ===
    { x: 5800, y: 400, width: 100, height: 30 },
    { x: 6000, y: 320, width: 110, height: 30 },
    { x: 6200, y: 380, width: 130, height: 30 },
  ],

  treats: [
    // Entrance zone — generous start
    { x: 250, y: 530 }, { x: 300, y: 530 }, { x: 350, y: 410 },
    { x: 400, y: 410 }, { x: 450, y: 530 },
    { x: 600, y: 360 }, { x: 650, y: 360 },
    { x: 700, y: 530 }, { x: 900, y: 300 }, { x: 950, y: 300 },

    // Ground treats leading through park
    { x: 1000, y: 530 }, { x: 1050, y: 530 },
    { x: 1500, y: 530 }, { x: 1550, y: 530 },
    { x: 2000, y: 530 }, { x: 2050, y: 530 },
    { x: 2500, y: 530 }, { x: 2550, y: 530 },

    // Roller coaster climb — treats on every step up
    { x: 1200, y: 380 }, { x: 1250, y: 380 },
    { x: 1400, y: 300 }, { x: 1450, y: 300 },
    { x: 1600, y: 220 }, { x: 1650, y: 220 },
    { x: 1800, y: 160 }, { x: 1850, y: 160 },
    { x: 2000, y: 120 }, { x: 2050, y: 120 },

    // Roller coaster drop — grab on the way down
    { x: 2200, y: 210 }, { x: 2250, y: 210 },
    { x: 2400, y: 310 }, { x: 2450, y: 310 },
    { x: 2600, y: 390 }, { x: 2650, y: 390 },

    // Bumper car arena — treats between the chaos
    { x: 2850, y: 340 }, { x: 3020, y: 270 },
    { x: 3190, y: 340 }, { x: 3360, y: 230 },
    { x: 3530, y: 300 }, { x: 3700, y: 360 },
    // Ground treats in arena
    { x: 3000, y: 530 }, { x: 3200, y: 530 }, { x: 3400, y: 530 },

    // Haunted house — treats to lure you in
    { x: 3950, y: 310 }, { x: 4000, y: 310 },
    { x: 4150, y: 240 }, { x: 4200, y: 240 },
    { x: 4350, y: 310 }, { x: 4400, y: 310 },
    { x: 4550, y: 210 }, { x: 4600, y: 210 },
    // Ground treats haunted house
    { x: 3900, y: 530 }, { x: 4100, y: 530 }, { x: 4400, y: 530 },

    // Ferris wheel — high treats, big reward!
    { x: 4800, y: 260 }, { x: 4850, y: 260 },
    { x: 5000, y: 180 }, { x: 5050, y: 180 },
    { x: 5200, y: 130 }, { x: 5250, y: 130 },
    { x: 5400, y: 190 }, { x: 5450, y: 190 },
    { x: 5600, y: 280 }, { x: 5650, y: 280 },

    // Final ride
    { x: 5850, y: 360 }, { x: 5900, y: 360 },
    { x: 6050, y: 280 }, { x: 6100, y: 280 },
    { x: 6250, y: 340 }, { x: 6300, y: 340 },

    // Exit celebration — big treat pile!
    { x: 6300, y: 530 }, { x: 6320, y: 530 }, { x: 6340, y: 530 },
    { x: 6360, y: 530 }, { x: 6380, y: 530 },
    { x: 6330, y: 500 }, { x: 6350, y: 500 },
  ],

  crates: [
    { x: 500, y: 535 },
    { x: 1000, y: 535 },
    { x: 1700, y: 535 },
    { x: 2400, y: 535 },
    { x: 2900, y: 535 },
    { x: 3500, y: 535 },
    { x: 4000, y: 535 },
    { x: 4600, y: 535 },
    { x: 5300, y: 535 },
    { x: 5900, y: 535 },
    { x: 6100, y: 535 },
  ],

  bounceCrates: [
    { x: 750, y: 560 },
    { x: 1450, y: 560 },
    { x: 2100, y: 560 },
    { x: 2700, y: 560 },
    { x: 3800, y: 560 },
    { x: 4700, y: 560 },
    { x: 5500, y: 560 },
    { x: 6000, y: 560 },
  ],

  enemies: [
    // === ENTRANCE: Meet the clown! ===
    { type: "walker", x: 400, y: 535, patrol: 80 },
    { type: "clown", x: 650, y: 535, patrol: 60, speed: 50 },  // First clown! Teach the stomp
    { type: "wasp_patrol", x: 600, y: 280, patrol: 100 },
    { type: "walker", x: 900, y: 315, patrol: 35 },

    // === ROLLER COASTER: Enemies on every platform ===
    { type: "armored", x: 1200, y: 535, patrol: 80, speed: 80 },
    { type: "walker", x: 1400, y: 315, patrol: 30, speed: 75 },
    { type: "wasp_patrol", x: 1500, y: 220, patrol: 100 },
    { type: "wasp_dive", x: 1700, y: 140, patrol: 50 },
    { type: "walker", x: 1800, y: 175, patrol: 30, speed: 80 },
    { type: "armored", x: 1950, y: 535, patrol: 70, speed: 85 },
    // Drop enemies — fast, pressuring you down
    { type: "wasp_dive", x: 2100, y: 150, patrol: 50 },
    { type: "walker", x: 2250, y: 535, patrol: 90, speed: 90 },
    { type: "armored", x: 2450, y: 535, patrol: 60, speed: 85 },
    { type: "wasp_patrol", x: 2400, y: 280, patrol: 80 },

    // === BUMPER CAR ARENA: The golden paw gauntlet! ===
    // Dense enemy cluster guarding the paw at x:3150 y:535
    { type: "clown", x: 2850, y: 535, patrol: 50, speed: 70 },
    { type: "armored", x: 3000, y: 535, patrol: 50, speed: 95 },
    { type: "bookworm", x: 3100, y: 535, patrol: 40 },
    { type: "bookworm", x: 3130, y: 535, patrol: 40 },
    { type: "bookworm", x: 3160, y: 535, patrol: 40 },
    { type: "bookworm", x: 3190, y: 535, patrol: 40 },
    { type: "armored", x: 3300, y: 535, patrol: 50, speed: 95 },
    { type: "walker", x: 3450, y: 535, patrol: 70, speed: 90 },
    { type: "wasp_dive", x: 3050, y: 160, patrol: 50 },
    { type: "wasp_dive", x: 3250, y: 170, patrol: 50 },
    { type: "wasp_patrol", x: 3400, y: 230, patrol: 100 },
    // Platform guards in arena
    { type: "walker", x: 3020, y: 285, patrol: 20, speed: 85 },
    { type: "walker", x: 3360, y: 245, patrol: 20, speed: 90 },
    { type: "walker", x: 3530, y: 315, patrol: 20, speed: 85 },

    // === HAUNTED HOUSE: Clowns and enemies jump out! ===
    { type: "clown", x: 3800, y: 535, patrol: 70, speed: 65 },
    { type: "wasp_dive", x: 3950, y: 160, patrol: 50 },
    { type: "bookworm", x: 4050, y: 535, patrol: 50 },
    { type: "bookworm", x: 4090, y: 535, patrol: 50 },
    { type: "bookworm", x: 4130, y: 535, patrol: 50 },
    { type: "wasp_dive", x: 4250, y: 170, patrol: 50 },
    { type: "armored", x: 4400, y: 535, patrol: 60, speed: 95 },
    { type: "walker", x: 4150, y: 255, patrol: 25, speed: 80 },
    { type: "walker", x: 4550, y: 225, patrol: 25, speed: 85 },

    // === FERRIS WHEEL: High enemies, dive bombers everywhere ===
    { type: "wasp_patrol", x: 4850, y: 200, patrol: 100 },
    { type: "wasp_dive", x: 5050, y: 150, patrol: 50 },
    { type: "wasp_patrol", x: 5250, y: 160, patrol: 80 },
    { type: "wasp_dive", x: 5450, y: 140, patrol: 50 },
    { type: "armored", x: 4900, y: 535, patrol: 80, speed: 90 },
    { type: "walker", x: 5200, y: 535, patrol: 90, speed: 85 },
    { type: "armored", x: 5500, y: 535, patrol: 70, speed: 95 },
    // Platform guards on high platforms
    { type: "walker", x: 5000, y: 195, patrol: 25, speed: 80 },
    { type: "walker", x: 5200, y: 145, patrol: 25, speed: 85 },
    { type: "walker", x: 5400, y: 205, patrol: 25, speed: 85 },

    // === FINAL RIDE: Everything thrown at you ===
    { type: "clown", x: 5750, y: 535, patrol: 50, speed: 75 },
    { type: "bookworm", x: 5900, y: 535, patrol: 50 },
    { type: "bookworm", x: 5940, y: 535, patrol: 50 },
    { type: "bookworm", x: 5980, y: 535, patrol: 50 },
    { type: "wasp_dive", x: 6050, y: 160, patrol: 50 },
    { type: "armored", x: 6150, y: 535, patrol: 50, speed: 100 },
    { type: "wasp_patrol", x: 6200, y: 230, patrol: 80 },
    { type: "walker", x: 6300, y: 535, patrol: 60, speed: 95 },
    { type: "walker", x: 6050, y: 295, patrol: 25, speed: 90 },
  ],
};
