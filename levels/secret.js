// ============================================
// SECRET LEVEL: "Rufus's Treat Party"
// Unlocked by finding all golden paws!
// A celebration with ALL friends — but it's HARD!
// 3 lives, no checkpoints, no extra lives.
// ============================================

const SECRET_LEVEL = {
  name: "Rufus's Treat Party",

  memoir: "Dear Diary, I found something magical today — golden paw prints scattered across all my adventures! When I collected the last one, a secret path appeared... It leads to the most amazing place: a giant party meadow where ALL my friends are waiting! Marthina brought lasagna, Renard is pretending he doesn't care (but he totally does), and Fiery is lighting the way! Time for the ULTIMATE adventure together!",

  // Magical twilight party sky ��� purple to gold gradient feel
  skyColor: [140, 100, 180],

  // Sparkly party grass — lush and golden-tinted
  groundColor: [80, 150, 50],

  // Special magical theme flag
  isMagical: true,

  width: 5500,

  playerStart: { x: 100, y: 0 },
  exit: { x: 5350, y: 300 },

  // NO checkpoints! This is hardcore mode!
  // NO secretPaw either — this IS the secret!

  // Flag for the game engine
  isSecretLevel: true,

  // All friends join as NPCs!
  npcFriends: ["marthina", "renard", "fiery"],

  platforms: [
    // Opening — warm up with friends
    { x: 300, y: 450, width: 180, height: 30 },
    { x: 550, y: 380, width: 150, height: 30 },
    { x: 800, y: 310, width: 160, height: 30 },

    // Rising challenge — staircase up
    { x: 1100, y: 420, width: 130, height: 30 },
    { x: 1300, y: 340, width: 120, height: 30 },
    { x: 1500, y: 260, width: 140, height: 30 },
    { x: 1750, y: 350, width: 130, height: 30 },

    // Mid section — tricky gaps
    { x: 2050, y: 430, width: 110, height: 30 },
    { x: 2250, y: 350, width: 100, height: 30 },
    { x: 2450, y: 270, width: 120, height: 30 },
    { x: 2700, y: 380, width: 130, height: 30 },
    { x: 2950, y: 300, width: 110, height: 30 },

    // Gauntlet — tight and fast
    { x: 3200, y: 400, width: 100, height: 30 },
    { x: 3400, y: 320, width: 110, height: 30 },
    { x: 3600, y: 250, width: 100, height: 30 },
    { x: 3800, y: 350, width: 120, height: 30 },
    { x: 4050, y: 280, width: 100, height: 30 },
    { x: 4250, y: 380, width: 130, height: 30 },

    // Final stretch — earn that victory!
    { x: 4500, y: 300, width: 120, height: 30 },
    { x: 4750, y: 250, width: 100, height: 30 },
    { x: 5000, y: 350, width: 150, height: 30 },
    { x: 5200, y: 400, width: 180, height: 30 },
  ],

  treats: [
    // TONS of treats — it's a party!
    // Opening
    { x: 350, y: 410 }, { x: 400, y: 410 },
    { x: 600, y: 340 }, { x: 650, y: 340 },
    { x: 850, y: 270 }, { x: 900, y: 270 },

    // Ground treats
    { x: 200, y: 530 }, { x: 250, y: 530 }, { x: 300, y: 530 },
    { x: 500, y: 530 }, { x: 700, y: 530 }, { x: 900, y: 530 },

    // Rising section
    { x: 1150, y: 380 }, { x: 1350, y: 300 },
    { x: 1550, y: 220 }, { x: 1600, y: 220 },
    { x: 1800, y: 310 },

    // Mid section
    { x: 2100, y: 390 }, { x: 2300, y: 310 },
    { x: 2500, y: 230 }, { x: 2550, y: 230 },
    { x: 2750, y: 340 }, { x: 3000, y: 260 },

    // Ground party line
    { x: 1200, y: 530 }, { x: 1400, y: 530 }, { x: 1600, y: 530 },
    { x: 2000, y: 530 }, { x: 2200, y: 530 }, { x: 2600, y: 530 },

    // Gauntlet treats (risk/reward)
    { x: 3250, y: 360 }, { x: 3450, y: 280 },
    { x: 3650, y: 210 }, { x: 3700, y: 210 },
    { x: 3850, y: 310 }, { x: 4100, y: 240 },
    { x: 4300, y: 340 },

    // Final stretch celebration
    { x: 4550, y: 260 }, { x: 4800, y: 210 },
    { x: 5050, y: 310 }, { x: 5100, y: 310 },
    { x: 5250, y: 360 },

    // End party — treat waterfall!
    { x: 5300, y: 530 }, { x: 5320, y: 530 }, { x: 5340, y: 530 },
    { x: 5310, y: 500 }, { x: 5330, y: 500 },
    { x: 5320, y: 470 },
  ],

  crates: [
    { x: 450, y: 535 },
    { x: 1000, y: 535 },
    { x: 1600, y: 535 },
    { x: 2400, y: 535 },
    { x: 3100, y: 535 },
    { x: 3700, y: 535 },
    { x: 4400, y: 535 },
    { x: 5100, y: 535 },
  ],

  bounceCrates: [
    { x: 650, y: 560 },
    { x: 1850, y: 560 },
    { x: 2850, y: 560 },
    { x: 3950, y: 560 },
    { x: 4650, y: 560 },
  ],

  enemies: [
    // Mix of EVERYTHING — the ultimate test!

    // Opening — walkers and a patrol wasp
    { type: "walker", x: 500, y: 535, patrol: 100 },
    { type: "wasp_patrol", x: 700, y: 280, patrol: 120 },
    { type: "walker", x: 900, y: 535, patrol: 80 },

    // Rising challenge — armored squirrels
    { type: "armored", x: 1200, y: 535, patrol: 80, speed: 80 },
    { type: "wasp_patrol", x: 1400, y: 230, patrol: 100 },
    { type: "armored", x: 1700, y: 535, patrol: 70, speed: 85 },

    // Platform enemies
    { type: "walker", x: 850, y: 285, patrol: 40 },
    { type: "walker", x: 1350, y: 315, patrol: 35 },

    // Mid section — bookworms appear!
    { type: "bookworm", x: 2100, y: 535, patrol: 60 },
    { type: "bookworm", x: 2140, y: 535, patrol: 60 },
    { type: "bookworm", x: 2180, y: 535, patrol: 60 },
    { type: "armored", x: 2400, y: 535, patrol: 70, speed: 85 },
    { type: "wasp_dive", x: 2600, y: 170, patrol: 50 },
    { type: "walker", x: 2800, y: 535, patrol: 90, speed: 80 },

    // Gauntlet — everything at once!
    { type: "armored", x: 3300, y: 535, patrol: 60, speed: 90 },
    { type: "wasp_dive", x: 3500, y: 160, patrol: 50 },
    { type: "bookworm", x: 3600, y: 535, patrol: 50 },
    { type: "bookworm", x: 3640, y: 535, patrol: 50 },
    { type: "armored", x: 3900, y: 535, patrol: 70, speed: 95 },
    { type: "wasp_patrol", x: 4000, y: 220, patrol: 100 },
    { type: "wasp_dive", x: 4200, y: 170, patrol: 50 },
    { type: "walker", x: 4350, y: 535, patrol: 80, speed: 90 },

    // Final stretch — fast and furious
    { type: "armored", x: 4600, y: 535, patrol: 60, speed: 100 },
    { type: "wasp_dive", x: 4800, y: 160, patrol: 50 },
    { type: "bookworm", x: 4900, y: 535, patrol: 50 },
    { type: "bookworm", x: 4940, y: 535, patrol: 50 },
    { type: "bookworm", x: 4980, y: 535, patrol: 50 },
    { type: "wasp_patrol", x: 5100, y: 230, patrol: 80 },
    { type: "armored", x: 5200, y: 535, patrol: 50, speed: 95 },

    // Platform guards in gauntlet
    { type: "walker", x: 3450, y: 295, patrol: 30, speed: 80 },
    { type: "walker", x: 4100, y: 255, patrol: 30, speed: 85 },
    { type: "walker", x: 4800, y: 225, patrol: 30, speed: 90 },
  ],
};
