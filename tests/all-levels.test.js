// ============================================================================
// ALL-LEVELS REGRESSION NET  🛡️
// ----------------------------------------------------------------------------
// This suite AUTO-DISCOVERS every real level file (level1.js ... level16.js and
// any new ones) and checks that:
//   1. The file loads and defines the right LEVEL_<N> constant.
//   2. The level data is structurally valid (no off-screen / broken pieces).
//   3. The level is actually WIRED into the game (script tag + ALL_LEVELS).
//   4. No stray / duplicate / mis-named level files sneak into levels/.
//
// Why it exists: levels 1-9 already had checks, but 10-16 did not. Now ANY level
// a kid adds is automatically covered the moment the file exists — so an
// accidental broken platform or unreachable exit gets caught before it ships.
//
// Vertical "rising lava" climb levels (risingLava:true) are exempted from the
// left-to-right / stay-on-screen checks, because they intentionally go UPWARD.
// ============================================================================

const fs = require("fs");
const path = require("path");

const LEVELS_DIR = path.join(__dirname, "..", "levels");
const INDEX_HTML = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

// Game constants (must match index.html)
const GAME_HEIGHT = 600;
const GROUND_Y = GAME_HEIGHT - 40; // 560

// Every enemy type the engine knows how to build.
const KNOWN_ENEMY_TYPES = [
  "walker", "armored", "wasp_patrol", "wasp_dive", "bookworm", "clown",
  // Snakes on the Moon (level 15)
  "spitting_cobra", "russells_viper", "rattlesnake", "milk_snake", "king_cobra",
];

// ---- helpers ---------------------------------------------------------------

function loadLevelFile(filename) {
  const code = fs.readFileSync(path.join(LEVELS_DIR, filename), "utf8");
  const varName = code.match(/const (\w+)\s*=/)[1];
  const fn = new Function(code + "\nreturn " + varName + ";");
  return { level: fn(), varName };
}

// A vertical climb level? Its exit is UP, not to the right.
function isVertical(level) {
  return !!level.risingLava;
}

// ---- discovery -------------------------------------------------------------
// Strict pattern: level<number>.js  (skips template.js, secret.js, and any
// mis-named file like "level 6.js" with a space).
const allJsFiles = fs.readdirSync(LEVELS_DIR).filter((f) => f.endsWith(".js"));
const levelFiles = allJsFiles
  .filter((f) => /^level\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

// ============================================================================
// 0. HOUSEKEEPING — no stray / mis-named level files
// ============================================================================
describe("Levels folder hygiene", () => {
  test("discovers a sensible number of levels", () => {
    expect(levelFiles.length).toBeGreaterThanOrEqual(9);
  });

  test("no stray or mis-named level files (e.g. 'level 6.js' with a space)", () => {
    // Only these non-numbered .js files are allowed to live in levels/.
    const allowedExtras = ["template.js", "secret.js"];
    const strays = allJsFiles.filter(
      (f) => !/^level\d+\.js$/.test(f) && !allowedExtras.includes(f)
    );
    expect(strays).toEqual([]);
  });

  test("level numbers are consecutive starting at 1 (no gaps)", () => {
    const nums = levelFiles.map((f) => parseInt(f.match(/\d+/)[0]));
    for (let i = 0; i < nums.length; i++) {
      expect(nums[i]).toBe(i + 1);
    }
  });
});

// ============================================================================
// Load them all once.
// ============================================================================
const LEVELS = levelFiles.map((f) => ({ file: f, ...loadLevelFile(f) }));

// ============================================================================
// 1. EACH LEVEL FILE — loads + right constant name
// ============================================================================
describe("Level files load and are named correctly", () => {
  LEVELS.forEach(({ file, varName, level }) => {
    test(`${file} defines LEVEL_<n> and is an object`, () => {
      const num = file.match(/\d+/)[0];
      expect(varName).toBe(`LEVEL_${num}`);
      expect(typeof level).toBe("object");
      expect(level).not.toBeNull();
    });
  });
});

// ============================================================================
// 2. STRUCTURAL VALIDATION — every level, present and future
// ============================================================================
describe("Every level is structurally valid", () => {
  LEVELS.forEach(({ file, level }) => {
    const vertical = isVertical(level);
    describe(`${file} — ${level.name}`, () => {
      test("has all required fields", () => {
        expect(typeof level.name).toBe("string");
        expect(level.name.length).toBeGreaterThan(0);
        expect(typeof level.memoir).toBe("string");
        expect(level.skyColor).toHaveLength(3);
        expect(level.groundColor).toHaveLength(3);
        expect(level.width).toBeGreaterThan(0);
        expect(level.playerStart).toBeDefined();
        expect(typeof level.playerStart.x).toBe("number");
        expect(typeof level.playerStart.y).toBe("number");
        expect(level.exit).toBeDefined();
        expect(typeof level.exit.x).toBe("number");
        expect(typeof level.exit.y).toBe("number");
        expect(Array.isArray(level.platforms)).toBe(true);
        expect(Array.isArray(level.treats)).toBe(true);
        expect(Array.isArray(level.crates)).toBe(true);
        expect(Array.isArray(level.enemies)).toBe(true);
      });

      test("colors are valid RGB values (0-255)", () => {
        [...level.skyColor, ...level.groundColor].forEach((c) => {
          expect(c).toBeGreaterThanOrEqual(0);
          expect(c).toBeLessThanOrEqual(255);
        });
      });

      test("player starts inside the level width", () => {
        expect(level.playerStart.x).toBeGreaterThanOrEqual(0);
        expect(level.playerStart.x).toBeLessThan(level.width);
      });

      test("exit is inside the level width", () => {
        expect(level.exit.x).toBeGreaterThan(0);
        expect(level.exit.x).toBeLessThanOrEqual(level.width);
      });

      test("all platforms have valid dimensions and are usable (>= 80px wide)", () => {
        level.platforms.forEach((p) => {
          expect(typeof p.x).toBe("number");
          expect(typeof p.y).toBe("number");
          expect(p.width).toBeGreaterThanOrEqual(80);
          expect(p.height).toBeGreaterThan(0);
          expect(p.x).toBeGreaterThanOrEqual(0);
          expect(p.x + p.width).toBeLessThanOrEqual(level.width + 50);
        });
      });

      test("has at least 10 treats", () => {
        expect(level.treats.length).toBeGreaterThanOrEqual(10);
      });

      test("no duplicate treat positions", () => {
        const positions = level.treats.map((t) => `${t.x},${t.y}`);
        expect(new Set(positions).size).toBe(positions.length);
      });

      test("all treats have numeric coordinates within width", () => {
        level.treats.forEach((t) => {
          expect(typeof t.x).toBe("number");
          expect(typeof t.y).toBe("number");
          expect(t.x).toBeGreaterThanOrEqual(0);
          expect(t.x).toBeLessThanOrEqual(level.width);
        });
      });

      test("all enemies use a known type with a valid patrol", () => {
        level.enemies.forEach((e) => {
          expect(KNOWN_ENEMY_TYPES).toContain(e.type);
          expect(typeof e.x).toBe("number");
          expect(typeof e.y).toBe("number");
          expect(typeof e.patrol).toBe("number");
          expect(e.patrol).toBeGreaterThan(0);
          expect(e.x).toBeGreaterThanOrEqual(0);
          expect(e.x).toBeLessThanOrEqual(level.width);
        });
      });

      test("has real challenge (>=3 enemies) unless a boss fight or peaceful level", () => {
        const peaceful = level.isBossFight || level.name === "Candy Kingdom";
        if (!peaceful) {
          expect(level.enemies.length).toBeGreaterThanOrEqual(3);
        }
      });

      // ---- Horizontal-only checks (skipped for vertical climb levels) ------
      (vertical ? test.skip : test)(
        "exit is to the RIGHT of the start (left-to-right level)",
        () => {
          expect(level.exit.x).toBeGreaterThan(level.playerStart.x);
        }
      );

      (vertical ? test.skip : test)(
        "platforms stay on screen (0 < y < ground)",
        () => {
          level.platforms.forEach((p) => {
            expect(p.y).toBeGreaterThan(0);
            expect(p.y).toBeLessThan(GROUND_Y);
          });
        }
      );

      (vertical ? test.skip : test)(
        "treats stay on screen (0 < y <= ground)",
        () => {
          level.treats.forEach((t) => {
            expect(t.y).toBeGreaterThan(0);
            expect(t.y).toBeLessThanOrEqual(GROUND_Y);
          });
        }
      );

      (vertical ? test.skip : test)(
        "no enemy sits on the player start or the exit",
        () => {
          level.enemies.forEach((e) => {
            expect(Math.abs(e.x - level.playerStart.x)).toBeGreaterThan(50);
            expect(Math.abs(e.x - level.exit.x)).toBeGreaterThan(30);
          });
        }
      );
    });
  });
});

// ============================================================================
// 3. WIRING — every level is actually plugged into the game
// ============================================================================
describe("Every level is wired into index.html", () => {
  // Parse the ALL_LEVELS array from index.html.
  const allLevelsMatch = INDEX_HTML.match(/const ALL_LEVELS\s*=\s*\[([^\]]*)\]/);
  const allLevelsNames = allLevelsMatch
    ? allLevelsMatch[1].split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  LEVELS.forEach(({ file, varName }) => {
    test(`${file} has a <script> tag`, () => {
      expect(INDEX_HTML).toContain(`levels/${file}`);
    });

    test(`${varName} is included in ALL_LEVELS`, () => {
      expect(allLevelsNames).toContain(varName);
    });
  });

  test("ALL_LEVELS is in order and matches the discovered level files exactly", () => {
    const expected = LEVELS.map((l) => l.varName);
    expect(allLevelsNames).toEqual(expected);
  });

  test("every script-tagged level file actually exists on disk", () => {
    const tagged = [...INDEX_HTML.matchAll(/levels\/(level\d+\.js)/g)].map((m) => m[1]);
    tagged.forEach((f) => {
      expect(fs.existsSync(path.join(LEVELS_DIR, f))).toBe(true);
    });
  });
});

// ============================================================================
// 3b. COLOUR GEMS — each one belongs to exactly ONE level
// ----------------------------------------------------------------------------
// Arvind spotted this: levels 9 and 15 BOTH had a red gem. Every colour gem
// saves to a single slot, so grabbing one made the other one pointless — and
// the menu drew a red gem icon on both chapters. Nothing errored; the second
// gem was just quietly meaningless.
// ============================================================================
describe("Each colour gem belongs to one level only", () => {
  const COLOUR_GEMS = ["redGem", "greenGem", "yellowGem", "orangeGem"];

  COLOUR_GEMS.forEach((gem) => {
    test(`only one level claims the ${gem}`, () => {
      const claimants = LEVELS.filter(({ level }) => level[gem]).map((l) => l.file);
      expect(claimants.length).toBeLessThanOrEqual(1);
    });
  });

  // A gem is written one of two ways:
  //   { x, y }  = it sits somewhere in the level and you go and grab it
  //   true      = you EARN it (a perfect boss run, or playing the song in
  //               order), so there's nothing lying around to pick up
  test("a placed gem sits inside its level", () => {
    LEVELS.forEach(({ level }) => {
      COLOUR_GEMS.forEach((gem) => {
        const g = level[gem];
        if (!g || g === true) return; // earned, not placed
        expect(typeof g.x).toBe("number");
        expect(typeof g.y).toBe("number");
        expect(g.x).toBeGreaterThanOrEqual(0);
        expect(g.x).toBeLessThanOrEqual(level.width);
      });
    });
  });

  test("every gem shown on the menu can actually be won and read back", () => {
    // The menu needs has<Gem>() to know whether to light the icon up.
    // Winning it can happen in index.html (award<Gem>()) OR in one of the
    // standalone mini-games — the yellow gem is written by donut-boss.html on a
    // perfect boss run, so it has no award function in the main file.
    const otherPages = fs
      .readdirSync(path.join(__dirname, ".."))
      .filter((f) => f.endsWith(".html") && f !== "index.html")
      .map((f) => fs.readFileSync(path.join(__dirname, "..", f), "utf8"))
      .join("\n");

    LEVELS.forEach(({ file, level }) => {
      COLOUR_GEMS.forEach((gem) => {
        if (!level[gem]) return;
        const name = gem.charAt(0).toUpperCase() + gem.slice(1);

        // the menu must be able to check it
        expect(INDEX_HTML).toContain("function has" + name + "(");

        // ...and something, somewhere, must be able to give it to you
        const key = INDEX_HTML.match(
          new RegExp("function has" + name + "\\(\\)[\\s\\S]*?getItem\\(\"([^\"]+)\"")
        );
        expect(key).not.toBeNull();
        const wonInEngine = INDEX_HTML.includes("function award" + name + "(");
        const wonElsewhere = otherPages.includes(key[1]);
        expect(wonInEngine || wonElsewhere).toBe(true);
      });
    });
  });
});

// ============================================================================
// 4. "COOL MUSIC" PIANO LEVEL (16) — special mechanics stay intact
// ============================================================================
describe("Cool Music piano level stays playable", () => {
  const piano = LEVELS.find((l) => l.level.pianoTheme);

  test("a piano-theme level exists", () => {
    expect(piano).toBeDefined();
  });

  test("every piano platform has a pianoNote so the song still plays", () => {
    piano.level.platforms.forEach((p) => {
      expect(typeof p.pianoNote).toBe("number");
      // MIDI note range sanity (piano-ish)
      expect(p.pianoNote).toBeGreaterThanOrEqual(21);
      expect(p.pianoNote).toBeLessThanOrEqual(108);
    });
  });

  test("uses Felix's stage as the exit and has no background music track", () => {
    expect(piano.level.felixExit).toBe(true);
    // No `music:` field — the ONLY sound is the keys.
    expect(piano.level.music).toBeUndefined();
  });
});
