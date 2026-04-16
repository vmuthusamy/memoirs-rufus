const fs = require("fs");
const path = require("path");

// Load level files by evaluating them (they define global constants)
function loadLevel(filename) {
  const code = fs.readFileSync(
    path.join(__dirname, "..", "levels", filename),
    "utf-8"
  );
  // Extract the object by running the JS
  const fn = new Function(code + "\nreturn " + code.match(/const (\w+)/)[1] + ";");
  return fn();
}

const LEVEL_1 = loadLevel("level1.js");
const LEVEL_2 = loadLevel("level2.js");
const LEVEL_3 = loadLevel("level3.js");
const LEVEL_4 = loadLevel("level4.js");
const LEVEL_5 = loadLevel("level5.js");
const LEVEL_6 = loadLevel("level6.js");
const LEVEL_7 = loadLevel("level7.js");
const SECRET_LEVEL = loadLevel("secret.js");
const ALL_LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5, LEVEL_6, LEVEL_7];

// Game constants (must match index.html)
const GAME_HEIGHT = 600;
const GROUND_Y = GAME_HEIGHT - 40; // 560

// ============================================
// LEVEL DATA INTEGRITY
// ============================================
describe("Level data integrity", () => {
  ALL_LEVELS.forEach((level, i) => {
    describe(`Level ${i + 1}: ${level.name}`, () => {
      test("has all required fields", () => {
        expect(level.name).toBeDefined();
        expect(typeof level.name).toBe("string");
        expect(level.name.length).toBeGreaterThan(0);

        expect(level.memoir).toBeDefined();
        expect(typeof level.memoir).toBe("string");

        expect(level.skyColor).toHaveLength(3);
        expect(level.groundColor).toHaveLength(3);

        expect(level.width).toBeGreaterThan(0);
        expect(level.playerStart).toBeDefined();
        expect(level.playerStart.x).toBeDefined();
        expect(level.playerStart.y).toBeDefined();
        expect(level.exit).toBeDefined();
        expect(level.exit.x).toBeDefined();
        expect(level.exit.y).toBeDefined();

        expect(Array.isArray(level.platforms)).toBe(true);
        expect(Array.isArray(level.treats)).toBe(true);
        expect(Array.isArray(level.crates)).toBe(true);
        expect(Array.isArray(level.enemies)).toBe(true);
      });

      test("colors are valid RGB values (0-255)", () => {
        level.skyColor.forEach((c) => {
          expect(c).toBeGreaterThanOrEqual(0);
          expect(c).toBeLessThanOrEqual(255);
        });
        level.groundColor.forEach((c) => {
          expect(c).toBeGreaterThanOrEqual(0);
          expect(c).toBeLessThanOrEqual(255);
        });
      });

      test("player starts within level bounds", () => {
        expect(level.playerStart.x).toBeGreaterThanOrEqual(0);
        expect(level.playerStart.x).toBeLessThan(level.width);
      });

      test("exit is within level bounds", () => {
        expect(level.exit.x).toBeGreaterThan(0);
        expect(level.exit.x).toBeLessThanOrEqual(level.width);
      });

      test("exit is placed after start (left to right progression)", () => {
        expect(level.exit.x).toBeGreaterThan(level.playerStart.x);
      });
    });
  });
});

// ============================================
// PLATFORM VALIDATION
// ============================================
describe("Platform validation", () => {
  ALL_LEVELS.forEach((level, i) => {
    describe(`Level ${i + 1}: ${level.name}`, () => {
      test("all platforms have required dimensions", () => {
        level.platforms.forEach((p, j) => {
          expect(p.x).toBeDefined();
          expect(p.y).toBeDefined();
          expect(p.width).toBeGreaterThan(0);
          expect(p.height).toBeGreaterThan(0);
        });
      });

      test("all platforms are within level bounds", () => {
        level.platforms.forEach((p) => {
          expect(p.x).toBeGreaterThanOrEqual(0);
          expect(p.x + p.width).toBeLessThanOrEqual(level.width + 50);
        });
      });

      test("all platforms are above the ground", () => {
        level.platforms.forEach((p) => {
          expect(p.y).toBeLessThan(GROUND_Y);
        });
      });

      test("all platforms are visible on screen (not above canvas)", () => {
        level.platforms.forEach((p) => {
          expect(p.y).toBeGreaterThan(0);
        });
      });

      test("platforms have minimum usable width (at least 80px)", () => {
        level.platforms.forEach((p) => {
          expect(p.width).toBeGreaterThanOrEqual(80);
        });
      });
    });
  });
});

// ============================================
// TREAT VALIDATION
// ============================================
describe("Treat validation", () => {
  ALL_LEVELS.forEach((level, i) => {
    describe(`Level ${i + 1}: ${level.name}`, () => {
      test("all treats have x,y coordinates", () => {
        level.treats.forEach((t) => {
          expect(typeof t.x).toBe("number");
          expect(typeof t.y).toBe("number");
        });
      });

      test("all treats are within level bounds", () => {
        level.treats.forEach((t) => {
          expect(t.x).toBeGreaterThanOrEqual(0);
          expect(t.x).toBeLessThanOrEqual(level.width);
        });
      });

      test("all treats are visible (above ground, below top of screen)", () => {
        level.treats.forEach((t) => {
          expect(t.y).toBeGreaterThan(0);
          expect(t.y).toBeLessThanOrEqual(GROUND_Y);
        });
      });

      test("has at least 10 treats per level", () => {
        expect(level.treats.length).toBeGreaterThanOrEqual(10);
      });

      test("no duplicate treat positions", () => {
        const positions = level.treats.map((t) => `${t.x},${t.y}`);
        const unique = new Set(positions);
        expect(unique.size).toBe(positions.length);
      });
    });
  });
});

// ============================================
// CRATE VALIDATION
// ============================================
describe("Crate validation", () => {
  ALL_LEVELS.forEach((level, i) => {
    describe(`Level ${i + 1}: ${level.name}`, () => {
      test("all crates have x,y coordinates", () => {
        level.crates.forEach((c) => {
          expect(typeof c.x).toBe("number");
          expect(typeof c.y).toBe("number");
        });
      });

      test("all crates are within level bounds", () => {
        level.crates.forEach((c) => {
          expect(c.x).toBeGreaterThanOrEqual(0);
          expect(c.x).toBeLessThanOrEqual(level.width);
        });
      });

      test("has crates (unless tutorial level)", () => {
        if (level.platforms.length > 0) {
          expect(level.crates.length).toBeGreaterThanOrEqual(2);
        }
      });
    });
  });
});

// ============================================
// BOUNCE CRATE VALIDATION
// ============================================
describe("Bounce crate validation", () => {
  ALL_LEVELS.forEach((level, i) => {
    describe(`Level ${i + 1}: ${level.name}`, () => {
      test("bounce crates exist (unless tutorial)", () => {
        expect(level.bounceCrates).toBeDefined();
        expect(Array.isArray(level.bounceCrates)).toBe(true);
        if (level.platforms.length > 0) {
          expect(level.bounceCrates.length).toBeGreaterThan(0);
        }
      });

      test("all bounce crates have x,y coordinates", () => {
        level.bounceCrates.forEach((bc) => {
          expect(typeof bc.x).toBe("number");
          expect(typeof bc.y).toBe("number");
        });
      });

      test("bounce crates are on or near the ground", () => {
        level.bounceCrates.forEach((bc) => {
          // Bounce crates should be at ground level (y ~560)
          expect(bc.y).toBeGreaterThanOrEqual(540);
          expect(bc.y).toBeLessThanOrEqual(580);
        });
      });

      test("bounce crates are within level bounds", () => {
        level.bounceCrates.forEach((bc) => {
          expect(bc.x).toBeGreaterThanOrEqual(0);
          expect(bc.x).toBeLessThanOrEqual(level.width);
        });
      });

      test("bounce crates are spread across the level", () => {
        if (level.bounceCrates.length < 2) return;
        const xs = level.bounceCrates.map((bc) => bc.x).sort((a, b) => a - b);
        expect(xs[0]).toBeLessThan(level.width * 0.5);
        expect(xs[xs.length - 1]).toBeGreaterThan(level.width * 0.5);
      });
    });
  });
});

// ============================================
// ENEMY VALIDATION
// ============================================
describe("Enemy validation", () => {
  ALL_LEVELS.forEach((level, i) => {
    describe(`Level ${i + 1}: ${level.name}`, () => {
      test("all enemies have required fields", () => {
        level.enemies.forEach((e) => {
          expect(["walker", "armored", "wasp_patrol", "wasp_dive", "bookworm", "clown"]).toContain(e.type);
          expect(typeof e.x).toBe("number");
          expect(typeof e.y).toBe("number");
          expect(typeof e.patrol).toBe("number");
          expect(e.patrol).toBeGreaterThan(0);
        });
      });

      test("all enemies are within level bounds", () => {
        level.enemies.forEach((e) => {
          expect(e.x).toBeGreaterThanOrEqual(0);
          expect(e.x).toBeLessThanOrEqual(level.width);
        });
      });

      test("enemy patrol range keeps them within level bounds", () => {
        level.enemies.forEach((e) => {
          expect(e.x - e.patrol).toBeGreaterThanOrEqual(-50); // small margin
          expect(e.x + e.patrol).toBeLessThanOrEqual(level.width + 50);
        });
      });

      test("no enemy is placed at the player start position", () => {
        level.enemies.forEach((e) => {
          const distFromStart = Math.abs(e.x - level.playerStart.x);
          expect(distFromStart).toBeGreaterThan(50);
        });
      });

      test("no enemy is placed at the exit", () => {
        level.enemies.forEach((e) => {
          const distFromExit = Math.abs(e.x - level.exit.x);
          expect(distFromExit).toBeGreaterThan(30);
        });
      });

      test("has enemies (unless boss fight)", () => {
        if (!level.isBossFight) {
          expect(level.enemies.length).toBeGreaterThanOrEqual(3);
        }
      });
    });
  });

  test("Level 1 has no armored enemies (tutorial level)", () => {
    const armored = LEVEL_1.enemies.filter((e) => e.type === "armored");
    expect(armored.length).toBe(0);
  });

  test("Level 2 has armored enemies", () => {
    const armored = LEVEL_2.enemies.filter((e) => e.type === "armored");
    expect(armored.length).toBeGreaterThan(0);
  });

  test("Level 2 is harder than Level 1 (more enemies)", () => {
    expect(LEVEL_2.enemies.length).toBeGreaterThan(LEVEL_1.enemies.length);
  });

  test("Level 3 has wasp enemies", () => {
    const wasps = LEVEL_3.enemies.filter(
      (e) => e.type === "wasp_patrol" || e.type === "wasp_dive"
    );
    expect(wasps.length).toBeGreaterThan(0);
  });

  test("Level 3 has both wasp types", () => {
    const patrol = LEVEL_3.enemies.filter((e) => e.type === "wasp_patrol");
    const dive = LEVEL_3.enemies.filter((e) => e.type === "wasp_dive");
    expect(patrol.length).toBeGreaterThan(0);
    expect(dive.length).toBeGreaterThan(0);
  });

  test("Level 3 has a mix of squirrels and wasps", () => {
    const squirrels = LEVEL_3.enemies.filter(
      (e) => e.type === "walker" || e.type === "armored"
    );
    const wasps = LEVEL_3.enemies.filter(
      (e) => e.type === "wasp_patrol" || e.type === "wasp_dive"
    );
    expect(squirrels.length).toBeGreaterThan(0);
    expect(wasps.length).toBeGreaterThan(0);
  });

  test("Level 3 is harder than Level 2 (more enemies)", () => {
    expect(LEVEL_3.enemies.length).toBeGreaterThan(LEVEL_2.enemies.length);
  });

  test("Level 4 has bookworm enemies", () => {
    const bookworms = LEVEL_4.enemies.filter((e) => e.type === "bookworm");
    expect(bookworms.length).toBeGreaterThan(0);
  });

  test("Level 4 has swarm trigger position", () => {
    expect(LEVEL_4.swarmTriggerX).toBeDefined();
    expect(LEVEL_4.swarmTriggerX).toBeGreaterThan(LEVEL_4.playerStart.x);
    expect(LEVEL_4.swarmTriggerX).toBeLessThan(LEVEL_4.exit.x);
  });

  test("Level 4 has mixed enemy types in act 3", () => {
    const bookworms = LEVEL_4.enemies.filter((e) => e.type === "bookworm");
    const squirrels = LEVEL_4.enemies.filter(
      (e) => e.type === "walker" || e.type === "armored"
    );
    expect(bookworms.length).toBeGreaterThan(5);
    expect(squirrels.length).toBeGreaterThan(0);
  });
});

// ============================================
// PLATFORM ENEMY VALIDATION
// ============================================
describe("Platform enemy placement", () => {
  ALL_LEVELS.forEach((level, i) => {
    describe(`Level ${i + 1}: ${level.name}`, () => {
      // Filter: ground enemies on platforms (exclude wasps — they fly)
      const isGroundType = (e) =>
        e.type === "walker" || e.type === "armored";

      test("has ground enemies on platforms (not just ground)", () => {
        if (level.isBossFight || level.platforms.length === 0) return; // Boss fights and tutorials skip this
        const platformEnemies = level.enemies.filter(
          (e) => isGroundType(e) && e.y < 500
        );
        expect(platformEnemies.length).toBeGreaterThan(0);
      });

      test("platform enemies are near actual platforms", () => {
        const platformEnemies = level.enemies.filter(
          (e) => isGroundType(e) && e.y < 500
        );
        platformEnemies.forEach((e) => {
          const nearbyPlatform = level.platforms.some((p) => {
            const onPlatformY = Math.abs(e.y - p.y) < 30;
            const withinPlatformX =
              e.x >= p.x - e.patrol - 20 &&
              e.x <= p.x + p.width + e.patrol + 20;
            return onPlatformY && withinPlatformX;
          });
          expect(nearbyPlatform).toBe(true);
        });
      });

      test("platform enemy patrol range fits on platform", () => {
        const platformEnemies = level.enemies.filter(
          (e) => isGroundType(e) && e.y < 500
        );
        platformEnemies.forEach((e) => {
          // Find the closest platform to this enemy (by y AND x proximity)
          const platform = level.platforms.find((p) => {
            const onPlatformY = Math.abs(e.y - p.y) < 30;
            const nearPlatformX =
              e.x >= p.x - 60 && e.x <= p.x + p.width + 60;
            return onPlatformY && nearPlatformX;
          });
          if (platform) {
            // Enemy patrol should mostly stay on the platform
            // Allow some overshoot (they can walk a bit off edge)
            expect(e.x - e.patrol).toBeGreaterThanOrEqual(platform.x - 80);
            expect(e.x + e.patrol).toBeLessThanOrEqual(
              platform.x + platform.width + 80
            );
          }
        });
      });
    });
  });
});

// ============================================
// LEVEL PROGRESSION
// ============================================
describe("Level progression", () => {
  test("Level 2 is longer than Level 1", () => {
    expect(LEVEL_2.width).toBeGreaterThan(LEVEL_1.width);
  });

  test("levels have increasing difficulty (enemy count, excluding boss fights and tutorials)", () => {
    const regularLevels = ALL_LEVELS.filter((l) => !l.isBossFight && l.platforms.length > 0);
    for (let i = 1; i < regularLevels.length; i++) {
      expect(regularLevels[i].enemies.length).toBeGreaterThanOrEqual(
        regularLevels[i - 1].enemies.length
      );
    }
  });

  test("all levels have unique names", () => {
    const names = ALL_LEVELS.map((l) => l.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  test("all levels have memoir text", () => {
    ALL_LEVELS.forEach((level) => {
      expect(level.memoir.length).toBeGreaterThan(20);
    });
  });
});

// ============================================
// GAMEPLAY SAFETY
// ============================================
describe("Gameplay safety", () => {
  ALL_LEVELS.forEach((level, i) => {
    describe(`Level ${i + 1}: ${level.name}`, () => {
      test("player spawn area is clear of enemies", () => {
        const spawnZone = 200; // px around spawn
        const nearbyEnemies = level.enemies.filter(
          (e) => Math.abs(e.x - level.playerStart.x) < spawnZone
        );
        expect(nearbyEnemies.length).toBe(0);
      });

      test("player spawn area is clear of crates", () => {
        const spawnZone = 150;
        const nearbyCrates = level.crates.filter(
          (c) => Math.abs(c.x - level.playerStart.x) < spawnZone
        );
        expect(nearbyCrates.length).toBe(0);
      });

      test("exit area has no armored enemies (fair ending)", () => {
        const exitZone = 100;
        const nearbyArmored = level.enemies.filter(
          (e) =>
            e.type === "armored" &&
            Math.abs(e.x - level.exit.x) < exitZone
        );
        expect(nearbyArmored.length).toBe(0);
      });
    });
  });
});

// ============================================
// GOLDEN PAW PLACEMENT
// ============================================
describe("Golden paw placement", () => {
  ALL_LEVELS.forEach((level, i) => {
    if (!level.secretPaw) return; // Skip boss fights and levels without paws
    describe(`Level ${i + 1}: ${level.name}`, () => {
      test("has a secretPaw defined", () => {
        expect(level.secretPaw).toBeDefined();
        expect(typeof level.secretPaw.x).toBe("number");
        expect(typeof level.secretPaw.y).toBe("number");
      });

      test("secretPaw is within level bounds", () => {
        expect(level.secretPaw.x).toBeGreaterThanOrEqual(0);
        expect(level.secretPaw.x).toBeLessThanOrEqual(level.width + 200);
      });

      test("secretPaw is visible on screen", () => {
        expect(level.secretPaw.y).toBeGreaterThan(0);
        expect(level.secretPaw.y).toBeLessThanOrEqual(GROUND_Y);
      });
    });
  });
});

// ============================================
// SECRET LEVEL DATA
// ============================================
describe("Secret level data", () => {
  test("has all required fields", () => {
    expect(SECRET_LEVEL.name).toBe("Rufus's Treat Party");
    expect(SECRET_LEVEL.memoir).toBeDefined();
    expect(SECRET_LEVEL.skyColor).toHaveLength(3);
    expect(SECRET_LEVEL.groundColor).toHaveLength(3);
    expect(SECRET_LEVEL.width).toBeGreaterThan(0);
    expect(SECRET_LEVEL.playerStart).toBeDefined();
    expect(SECRET_LEVEL.exit).toBeDefined();
    expect(Array.isArray(SECRET_LEVEL.platforms)).toBe(true);
    expect(Array.isArray(SECRET_LEVEL.treats)).toBe(true);
    expect(Array.isArray(SECRET_LEVEL.crates)).toBe(true);
    expect(Array.isArray(SECRET_LEVEL.enemies)).toBe(true);
  });

  test("has no checkpoints (hardcore mode)", () => {
    expect(SECRET_LEVEL.checkpoints).toBeUndefined();
  });

  test("has NPC friends list", () => {
    expect(SECRET_LEVEL.npcFriends).toBeDefined();
    expect(SECRET_LEVEL.npcFriends).toContain("marthina");
    expect(SECRET_LEVEL.npcFriends).toContain("renard");
    expect(SECRET_LEVEL.npcFriends).toContain("fiery");
  });

  test("is marked as secret level", () => {
    expect(SECRET_LEVEL.isSecretLevel).toBe(true);
  });

  test("is marked as magical", () => {
    expect(SECRET_LEVEL.isMagical).toBe(true);
  });

  test("has no secretPaw (it IS the secret)", () => {
    expect(SECRET_LEVEL.secretPaw).toBeUndefined();
  });

  test("has mix of all enemy types", () => {
    const types = new Set(SECRET_LEVEL.enemies.map((e) => e.type));
    expect(types.has("walker")).toBe(true);
    expect(types.has("armored")).toBe(true);
    expect(types.has("wasp_patrol")).toBe(true);
    expect(types.has("wasp_dive")).toBe(true);
    expect(types.has("bookworm")).toBe(true);
  });

  test("is challenging (lots of enemies)", () => {
    expect(SECRET_LEVEL.enemies.length).toBeGreaterThan(20);
  });

  test("has lots of treats (it's a party!)", () => {
    expect(SECRET_LEVEL.treats.length).toBeGreaterThan(30);
  });

  test("exit is after start", () => {
    expect(SECRET_LEVEL.exit.x).toBeGreaterThan(SECRET_LEVEL.playerStart.x);
  });

  test("platforms are within bounds and above ground", () => {
    SECRET_LEVEL.platforms.forEach((p) => {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThan(GROUND_Y);
      expect(p.y).toBeGreaterThan(0);
      expect(p.width).toBeGreaterThanOrEqual(80);
    });
  });

  test("all enemies are within bounds", () => {
    SECRET_LEVEL.enemies.forEach((e) => {
      expect(e.x).toBeGreaterThanOrEqual(0);
      expect(e.x).toBeLessThanOrEqual(SECRET_LEVEL.width);
    });
  });
});

// ============================================
// LEVEL 5: THE THEME PARK
// ============================================
describe("Level 5: The Theme Park", () => {
  test("has theme park name", () => {
    expect(LEVEL_5.name).toBe("The Theme Park");
  });

  test("has circus squirrel story", () => {
    expect(LEVEL_5.memoir).toContain("CIRCUS");
    expect(LEVEL_5.memoir).toContain("CLOWN");
  });

  test("starts with 5 lives", () => {
    expect(LEVEL_5.startLives).toBe(5);
  });

  test("has clown enemies", () => {
    const clowns = LEVEL_5.enemies.filter((e) => e.type === "clown");
    expect(clowns.length).toBeGreaterThan(0);
  });

  test("has mix of all enemy types", () => {
    const types = new Set(LEVEL_5.enemies.map((e) => e.type));
    expect(types.has("walker")).toBe(true);
    expect(types.has("armored")).toBe(true);
    expect(types.has("clown")).toBe(true);
    expect(types.has("wasp_patrol")).toBe(true);
    expect(types.has("wasp_dive")).toBe(true);
    expect(types.has("bookworm")).toBe(true);
  });

  test("has a golden paw", () => {
    expect(LEVEL_5.secretPaw).toBeDefined();
  });

  test("is a long level", () => {
    expect(LEVEL_5.width).toBeGreaterThan(5000);
  });

  test("has lots of treats", () => {
    expect(LEVEL_5.treats.length).toBeGreaterThan(40);
  });

  test("has checkpoints", () => {
    expect(LEVEL_5.checkpoints).toBeDefined();
    expect(LEVEL_5.checkpoints.length).toBe(2);
  });
});

// ============================================
// LEVEL 6: KING CLOWN BOSS FIGHT
// ============================================
describe("Level 6: King Clown", () => {
  test("has boss fight name", () => {
    expect(LEVEL_6.name).toBe("King Clown");
  });

  test("is marked as boss fight", () => {
    expect(LEVEL_6.isBossFight).toBe(true);
  });

  test("has boss type", () => {
    expect(LEVEL_6.bossType).toBe("kingClown");
  });

  test("starts with 5 lives", () => {
    expect(LEVEL_6.startLives).toBe(5);
  });

  test("has no checkpoints (boss fight)", () => {
    expect(LEVEL_6.checkpoints).toBeUndefined();
  });

  test("has no golden paw", () => {
    expect(LEVEL_6.secretPaw).toBeUndefined();
  });

  test("has no regular enemies (boss is the enemy)", () => {
    expect(LEVEL_6.enemies.length).toBe(0);
  });

  test("has a small arena", () => {
    expect(LEVEL_6.width).toBeLessThan(2000);
  });

  test("has platforms for dodging", () => {
    expect(LEVEL_6.platforms.length).toBeGreaterThan(2);
  });

  test("has bounce crates to help reach boss", () => {
    expect(LEVEL_6.bounceCrates.length).toBeGreaterThan(0);
  });

  test("memoir mentions jetpack and King Clown", () => {
    expect(LEVEL_6.memoir).toContain("KING CLOWN");
    expect(LEVEL_6.memoir).toContain("JETPACK");
  });

  test("level6.js is valid JS", () => {
    const fs = require("fs");
    const path = require("path");
    const code = fs.readFileSync(path.join(__dirname, "..", "levels", "level6.js"), "utf-8");
    expect(() => new Function(code)).not.toThrow();
  });
});

// ============================================
// LEVEL 7: JETPACK TRAINING
// ============================================
describe("Level 7: Jetpack Training", () => {
  test("has jetpack training name", () => {
    expect(LEVEL_7.name).toBe("Jetpack Training");
  });

  test("starts with 3 lives", () => {
    expect(LEVEL_7.startLives).toBe(3);
  });

  test("has no platforms (just fly!)", () => {
    expect(LEVEL_7.platforms.length).toBe(0);
  });

  test("has no crates or bounce crates", () => {
    expect(LEVEL_7.crates.length).toBe(0);
    expect(LEVEL_7.bounceCrates.length).toBe(0);
  });

  test("has lollipop obstacles", () => {
    expect(LEVEL_7.lollipops).toBeDefined();
    expect(LEVEL_7.lollipops.length).toBeGreaterThan(0);
  });

  test("has chocolate spikes", () => {
    expect(LEVEL_7.spikes).toBeDefined();
    expect(LEVEL_7.spikes.length).toBeGreaterThan(0);
  });

  test("all spikes have width", () => {
    LEVEL_7.spikes.forEach((sp) => {
      expect(sp.width).toBeGreaterThan(0);
    });
  });

  test("has a golden paw hidden at the wasp", () => {
    expect(LEVEL_7.secretPaw).toBeDefined();
    expect(LEVEL_7.secretPaw.x).toBe(1100);
    expect(LEVEL_7.secretPaw.y).toBe(200);
  });

  test("has pink sky", () => {
    expect(LEVEL_7.skyColor[0]).toBeGreaterThan(200);
    expect(LEVEL_7.skyColor[2]).toBeGreaterThan(150);
  });

  test("is a short tutorial level", () => {
    expect(LEVEL_7.width).toBeLessThanOrEqual(2000);
  });

  test("has few enemies (tutorial)", () => {
    expect(LEVEL_7.enemies.length).toBeLessThanOrEqual(5);
  });

  test("level7.js is valid JS", () => {
    const fs = require("fs");
    const path = require("path");
    const code = fs.readFileSync(path.join(__dirname, "..", "levels", "level7.js"), "utf-8");
    expect(() => new Function(code)).not.toThrow();
  });
});
