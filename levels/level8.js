// ============================================
// LEVEL 8: "Candy Kingdom"
// Starts with lollipops + jetpack, then candy platforming!
// ============================================

const LEVEL_8 = {
  name: "Candy Kingdom",

  memoir: "Dear Diary, I flew through a rainbow portal into the CANDY KINGDOM! First I have to fly over giant lollipops and chocolate spikes with my jetpack. Then the sour candy forcefield kicks in and I lose my jetpack — time to platform through cookie bridges and gummy bear enemies the old-fashioned way!",

  // Minty blue candy sky — different from Level 7's pink!
  skyColor: [130, 220, 210],

  // Chocolate ground
  groundColor: [100, 55, 30],

  startLives: 5,

  width: 8500,

  playerStart: { x: 100, y: 0 },
  exit: { x: 8350, y: 300 },

  secretPaw: { x: 5500, y: 530 },

  checkpoints: [
    { x: 1800, y: 560 },
    { x: 4000, y: 560 },
    { x: 7000, y: 560 },
  ],

  // Jetpack disabled in the middle — comes back for the final part!
  noJetpackZones: [
    { startX: 2000, endX: 7000 },
  ],

  // === PART 1: LOLLIPOP FLYOVER (jetpack!) ===
  lollipops: [
    { x: 400, y: 280 },
    { x: 700, y: 220 },
    { x: 1000, y: 260 },
    { x: 1300, y: 200 },
    { x: 1600, y: 240 },
    // Small lollipops in part 2 — short ones on the GROUND between platforms
    { x: 2350, y: 500 },
    { x: 3300, y: 500 },
    { x: 4200, y: 500 },
    { x: 5100, y: 500 },
    { x: 6000, y: 500 },
    // === PART 3: Big lollipops again — jetpack is BACK! ===
    { x: 7200, y: 260 },
    { x: 7500, y: 200 },
    { x: 7800, y: 240 },
    { x: 8100, y: 220 },
  ],

  spikes: [
    { x: 500, y: 545, width: 120 },
    { x: 850, y: 545, width: 120 },
    { x: 1150, y: 545, width: 120 },
    { x: 1450, y: 545, width: 120 },
    // Final jetpack section spikes
    { x: 7300, y: 545, width: 120 },
    { x: 7600, y: 545, width: 120 },
    { x: 7900, y: 545, width: 120 },
  ],

  // === PART 2: EASY CANDY PLATFORMING + SMALL LOLLIPOP JUMPS ===
  platforms: [
    // Easy platforms — wide, with gaps for lollipops between them
    { x: 2100, y: 450, width: 180, height: 30 },
    // gap + lollipop at 2350
    { x: 2500, y: 450, width: 180, height: 30 },
    // gap + lollipop at 2950
    { x: 2750, y: 450, width: 180, height: 30 },
    // gap
    { x: 3100, y: 450, width: 180, height: 30 },
    // gap + lollipop at 3550
    { x: 3400, y: 450, width: 180, height: 30 },
    // gap
    { x: 3700, y: 450, width: 180, height: 30 },
    // gap + lollipop at 4150
    { x: 4000, y: 450, width: 180, height: 30 },
    // gap
    { x: 4300, y: 450, width: 180, height: 30 },
    // gap + lollipop at 4750
    { x: 4600, y: 450, width: 180, height: 30 },
    // gap
    { x: 4900, y: 450, width: 180, height: 30 },
    // gap + lollipop at 5350
    { x: 5200, y: 450, width: 180, height: 30 },
    // gap
    { x: 5500, y: 450, width: 180, height: 30 },
    // gap + lollipop at 5950
    { x: 5800, y: 450, width: 180, height: 30 },
    // gap
    { x: 6100, y: 450, width: 180, height: 30 },
    // final platform
    { x: 6400, y: 450, width: 180, height: 30 },
    { x: 6700, y: 450, width: 160, height: 30 },
  ],

  treats: [
    // Lollipop section — fly up high!
    { x: 300, y: 530 }, { x: 400, y: 200 },
    { x: 600, y: 530 }, { x: 700, y: 140 },
    { x: 900, y: 530 }, { x: 1000, y: 180 },
    { x: 1200, y: 530 }, { x: 1300, y: 120 },
    { x: 1500, y: 530 }, { x: 1600, y: 160 },

    // Easy candy section — treats everywhere!
    { x: 2150, y: 410 }, { x: 2250, y: 410 },
    { x: 2450, y: 380 }, { x: 2550, y: 380 },
    { x: 2750, y: 410 }, { x: 2850, y: 410 },
    { x: 3050, y: 390 }, { x: 3150, y: 390 },
    { x: 3350, y: 410 }, { x: 3450, y: 410 },
    { x: 3650, y: 380 }, { x: 3750, y: 380 },
    { x: 3950, y: 410 }, { x: 4050, y: 410 },
    { x: 4250, y: 390 }, { x: 4350, y: 390 },
    { x: 4550, y: 410 }, { x: 4650, y: 410 },
    { x: 4850, y: 380 }, { x: 4950, y: 380 },
    { x: 5150, y: 410 }, { x: 5250, y: 410 },
    { x: 5450, y: 390 }, { x: 5550, y: 390 },
    { x: 5750, y: 410 }, { x: 5850, y: 410 },
    { x: 6050, y: 380 }, { x: 6150, y: 380 },
    { x: 6350, y: 410 }, { x: 6450, y: 410 },
    { x: 6650, y: 390 }, { x: 6750, y: 390 },

    // Ground treats along the way
    { x: 2000, y: 530 }, { x: 2600, y: 530 }, { x: 3200, y: 530 },
    { x: 3800, y: 530 }, { x: 4400, y: 530 }, { x: 5000, y: 530 },
    { x: 5600, y: 530 }, { x: 6200, y: 530 },

    // Final jetpack section — fly high treats!
    { x: 7100, y: 530 }, { x: 7200, y: 180 },
    { x: 7400, y: 530 }, { x: 7500, y: 120 },
    { x: 7700, y: 530 }, { x: 7800, y: 160 },
    { x: 8000, y: 530 }, { x: 8100, y: 140 },

    // Exit party!
    { x: 8300, y: 530 }, { x: 8330, y: 530 }, { x: 8360, y: 530 },
  ],

  crates: [
    { x: 2300, y: 535 },
    { x: 2900, y: 535 },
    { x: 3500, y: 535 },
    { x: 4100, y: 535 },
    { x: 4700, y: 535 },
    { x: 5300, y: 535 },
    { x: 5900, y: 535 },
    { x: 6400, y: 535 },
  ],

  bounceCrates: [
    { x: 1900, y: 560 },
    { x: 3100, y: 560 },
    { x: 4300, y: 560 },
    { x: 5500, y: 560 },
    { x: 6100, y: 560 },
  ],

  enemies: [],
};
