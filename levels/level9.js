// ============================================
// LEVEL 9: "Candy Chaos"
// Fly through spike tunnels! Then find a ship!
// ============================================

const LEVEL_9 = {
  name: "Candy Chaos",

  memoir: "Dear Diary, the Candy Kingdom just got CRAZY! There are chocolate spikes on the ceiling AND the floor! I need to put on my jetpack and fly right through the middle without touching them! Then I found something amazing... a SHIP made of candy! Time for the wildest ride yet!",

  // Deep purple chaos sky — dark and dangerous!
  skyColor: [90, 40, 120],

  // Dark chocolate ground
  groundColor: [70, 35, 20],

  startLives: 5,

  width: 6000,

  playerStart: { x: 100, y: 0 },
  exit: { x: 5850, y: 300 },

  // Red gem on top of the wall!
  redGem: { x: 1000, y: -510 },

  // Golden paw hidden behind enemies near the end
  secretPaw: { x: 5200, y: 535 },

  checkpoints: [
    { x: 2000, y: 560 },
    { x: 4000, y: 560 },
  ],

  // Cutscene at the very start — Rufus puts on jetpack
  startCutscene: {
    line1: "Chocolate spikes everywhere!",
    line2: "Lets put on the jetpack to fly through!",
  },

  // Floor spikes — on the ground
  spikes: [
    { x: 400, y: 545, width: 250 },
    { x: 650, y: 545, width: 250 },
    { x: 900, y: 545, width: 250 },
    { x: 1150, y: 545, width: 250 },
    { x: 1400, y: 545, width: 250 },
    { x: 1650, y: 545, width: 250 },
  ],

  // Ceiling spikes — hanging from the top, reaching down!
  ceilingSpikes: [
    { x: 400, y: 0, width: 250 },
    { x: 650, y: 0, width: 250 },
    { x: 900, y: 0, width: 250 },
    { x: 1150, y: 0, width: 250 },
    { x: 1400, y: 0, width: 250 },
    { x: 1650, y: 0, width: 250 },
  ],

  // Solid wall ABOVE the ceiling spikes — blocks you from going over
  walls: [
    { x: 400, y: -500, width: 1500, height: 500 },
  ],

  // Lollipops after the tunnel
  lollipops: [
    { x: 2500, y: 250 },
    { x: 2800, y: 200 },
    { x: 3100, y: 230 },
    { x: 3400, y: 180 },
    { x: 3700, y: 220 },
  ],

  platforms: [
    // After lollipops — some platforms for variety
    { x: 4100, y: 420, width: 160, height: 30 },
    { x: 4400, y: 350, width: 140, height: 30 },
    { x: 4700, y: 420, width: 160, height: 30 },
    { x: 5000, y: 380, width: 140, height: 30 },
    { x: 5300, y: 420, width: 160, height: 30 },
    { x: 5600, y: 380, width: 160, height: 30 },
  ],

  treats: [
    // Spike tunnel — treats in the safe middle zone!
    { x: 450, y: 300 }, { x: 550, y: 300 },
    { x: 750, y: 300 }, { x: 850, y: 300 },
    { x: 1050, y: 300 }, { x: 1150, y: 300 },
    { x: 1350, y: 300 }, { x: 1450, y: 300 },
    { x: 1650, y: 300 }, { x: 1750, y: 300 },

    // After tunnel ground treats
    { x: 2000, y: 530 }, { x: 2200, y: 530 },

    // Lollipop section
    { x: 2500, y: 170 }, { x: 2800, y: 120 },
    { x: 3100, y: 150 }, { x: 3400, y: 100 },
    { x: 3700, y: 140 },
    // Ground
    { x: 2600, y: 530 }, { x: 3000, y: 530 }, { x: 3500, y: 530 },

    // Platform section
    { x: 4150, y: 380 }, { x: 4200, y: 380 },
    { x: 4450, y: 310 }, { x: 4500, y: 310 },
    { x: 4750, y: 380 }, { x: 4800, y: 380 },
    { x: 5050, y: 340 }, { x: 5100, y: 340 },
    { x: 5350, y: 380 }, { x: 5400, y: 380 },
    { x: 5650, y: 340 }, { x: 5700, y: 340 },
    // Ground
    { x: 4000, y: 530 }, { x: 4600, y: 530 }, { x: 5200, y: 530 },

    // Exit party!
    { x: 5800, y: 530 }, { x: 5830, y: 530 }, { x: 5860, y: 530 },
  ],

  crates: [
    { x: 2100, y: 535 },
    { x: 3200, y: 535 },
    { x: 4300, y: 535 },
    { x: 5100, y: 535 },
  ],

  bounceCrates: [
    { x: 2300, y: 560 },
    { x: 3800, y: 560 },
    { x: 5500, y: 560 },
  ],

  enemies: [
    // After the spike tunnel
    { type: "walker", x: 2100, y: 535, patrol: 80 },
    { type: "armored", x: 2400, y: 535, patrol: 70, speed: 80 },

    // Lollipop section — wasps!
    { type: "wasp_patrol", x: 2600, y: 200, patrol: 100 },
    { type: "wasp_dive", x: 2900, y: 150, patrol: 50 },
    { type: "wasp_patrol", x: 3200, y: 180, patrol: 80 },
    { type: "wasp_dive", x: 3500, y: 140, patrol: 50 },

    // Platform section
    { type: "clown", x: 4200, y: 535, patrol: 60, speed: 60 },
    { type: "armored", x: 4500, y: 535, patrol: 60, speed: 85 },
    { type: "walker", x: 4800, y: 535, patrol: 80, speed: 80 },
    { type: "clown", x: 5100, y: 535, patrol: 50, speed: 65 },
    { type: "bookworm", x: 5400, y: 535, patrol: 50 },
    { type: "bookworm", x: 5440, y: 535, patrol: 50 },
    { type: "wasp_dive", x: 5300, y: 160, patrol: 50 },

    // Platform guards
    { type: "walker", x: 4450, y: 325, patrol: 25, speed: 80 },
    { type: "walker", x: 5050, y: 355, patrol: 25, speed: 80 },
  ],
};
