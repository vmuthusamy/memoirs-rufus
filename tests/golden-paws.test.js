// ============================================================================
// GOLDEN PAWS -> SECRET LEVEL  🐾
// ----------------------------------------------------------------------------
// THE BUG THIS EXISTS TO PREVENT:
// The old rule was "collect a paw in EVERY level". But only 9 of the 16 levels
// actually hide a paw, so the loop could never finish and the secret level was
// impossible to unlock — for anyone, ever. Nothing failed; it was just silently
// unreachable.
//
// The rule is now "find 5 golden paws" (Arvind's call). The key test below
// checks the requirement against the number of paws that REALLY EXIST in the
// level files, so if someone later raises the number too high, or deletes paws
// from levels, the suite fails instead of quietly locking everyone out again.
// ============================================================================

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LEVELS_DIR = path.join(ROOT, "levels");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// ---- How many paws actually exist in the game? -----------------------------
const levelFiles = fs
  .readdirSync(LEVELS_DIR)
  .filter((f) => /^level\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

const pawLevels = levelFiles.filter((f) =>
  /^\s*secretPaw:/m.test(fs.readFileSync(path.join(LEVELS_DIR, f), "utf8"))
);

const REQUIRED = parseInt(html.match(/const PAWS_FOR_SECRET = (\d+);/)[1], 10);

// ---- Run the real paw functions against a fake save file -------------------
function makePawApi(collectedIndexes) {
  const store = {
    rufus_collectibles: JSON.stringify({
      gems: {},
      paws: collectedIndexes.reduce((acc, i) => { acc[i] = true; return acc; }, {}),
    }),
  };
  const src = [
    html.match(/function getCollectibles\(\)[\s\S]*?\n\}/)[0],
    html.match(/const PAWS_FOR_SECRET = \d+;/)[0],
    html.match(/function pawCount\(\)[\s\S]*?\n\}/)[0],
    html.match(/function hasEnoughPaws\(\)[\s\S]*?\n\}/)[0],
  ].join("\n");
  return new Function(
    "localStorage",
    "ALL_LEVELS",
    src + "\nreturn { pawCount, hasEnoughPaws, PAWS_FOR_SECRET };"
  )(
    { getItem: (k) => (k in store ? store[k] : null), setItem: () => {} },
    new Array(levelFiles.length).fill({})
  );
}

// ============================================================================
// 1. THE RULE IS ACTUALLY ACHIEVABLE  (the real bug)
// ============================================================================
describe("The secret level can actually be unlocked", () => {
  test("some levels really do hide a golden paw", () => {
    expect(pawLevels.length).toBeGreaterThan(0);
  });

  test("you never need more paws than the game contains", () => {
    // This is the guard. If PAWS_FOR_SECRET ever climbs above the number of
    // paws that exist, the secret level becomes unreachable again.
    expect(REQUIRED).toBeLessThanOrEqual(pawLevels.length);
  });

  test("it still takes real effort (more than one paw)", () => {
    expect(REQUIRED).toBeGreaterThan(1);
  });

  test("collecting every paw in the game unlocks it", () => {
    const api = makePawApi(levelFiles.map((f, i) => i).filter((i) => pawLevels.includes(levelFiles[i])));
    expect(api.hasEnoughPaws()).toBe(true);
  });
});

// ============================================================================
// 2. THE COUNTING WORKS
// ============================================================================
describe("Paw counting", () => {
  test("no paws = 0 and locked", () => {
    const api = makePawApi([]);
    expect(api.pawCount()).toBe(0);
    expect(api.hasEnoughPaws()).toBe(false);
  });

  test("one short of the target is still locked", () => {
    const api = makePawApi([0, 1, 2, 3].slice(0, REQUIRED - 1));
    expect(api.pawCount()).toBe(REQUIRED - 1);
    expect(api.hasEnoughPaws()).toBe(false);
  });

  test("hitting the target unlocks it", () => {
    const api = makePawApi([0, 1, 2, 3, 4, 5, 6, 7, 8].slice(0, REQUIRED));
    expect(api.pawCount()).toBe(REQUIRED);
    expect(api.hasEnoughPaws()).toBe(true);
  });

  test("finding extra paws keeps it unlocked", () => {
    const api = makePawApi([0, 1, 2, 3, 4, 5, 6, 7, 8].slice(0, REQUIRED + 2));
    expect(api.hasEnoughPaws()).toBe(true);
  });

  test("the same paw can't be counted twice", () => {
    const api = makePawApi([2, 2, 2]);
    expect(api.pawCount()).toBe(1);
  });
});

// ============================================================================
// 3. THE ONLY WAY IN IS THE PAWS
// ============================================================================
describe("No shortcuts into the secret level", () => {
  const titleScene = html.match(/scene\("title"[\s\S]*?scene\("about"/)[0];

  test("clicking Marthina no longer jumps straight there", () => {
    expect(titleScene).not.toContain("titleMarthina.onClick");
    expect(titleScene).not.toContain("Want to play the secret level?");
  });

  test("Marthina is still on the title screen dancing", () => {
    expect(titleScene).toContain("const titleMarthina = add");
  });

  test("the title screen has no other route into the secret level", () => {
    expect(titleScene).not.toContain('go("memoir", "secret")');
  });

  test("the level-select entry only opens once you have enough paws", () => {
    expect(html).toMatch(/const hasSecretEntry = hasEnoughPaws\(\);/);
    expect(html).toMatch(/if \(hasSecretEntry\) \{\s*\n\s*secretEntry\.onClick/);
  });
});

// ============================================================================
// 5. WHERE THE SECRET CHAPTER SITS — on the CANDY page (Arvind's choice)
// ============================================================================
describe("The secret chapter is on the candy page", () => {
  // Rebuild the books exactly as the level select defines them
  function books() {
    const start = html.indexOf("const BOOKS = [");
    const end = html.indexOf("];", start) + 2;
    return new Function("ALL_LEVELS", html.slice(start, end) + "\nreturn BOOKS;")(
      new Array(levelFiles.length).fill({})
    );
  }
  const names = levelFiles.map((f) => {
    const src = fs.readFileSync(path.join(LEVELS_DIR, f), "utf8");
    return src.match(/name: "([^"]+)"/)[1];
  });

  test("the page is found by looking for the candy levels, not hard-coded", () => {
    expect(html).toMatch(/const candyBook = BOOKS\.findIndex/);
    expect(html).toContain('l.name === "Candy Kingdom"');
    expect(html).toMatch(/if \(currentPage === secretPage\)/);
  });

  test("it really does land on the book holding Candy Kingdom", () => {
    const B = books();
    const candy = B.findIndex((b) => names.slice(b.start, b.end).includes("Candy Kingdom"));
    expect(candy).toBeGreaterThanOrEqual(0);
    // and that book should also hold the other candy chapters
    const onPage = names.slice(B[candy].start, B[candy].end);
    expect(onPage).toContain("Candy Chaos");
  });

  test("it doesn't land on top of a chapter or the bottom buttons", () => {
    const B = books();
    const candy = B.findIndex((b) => names.slice(b.start, b.end).includes("Candy Kingdom"));
    const slots = B[candy].end - B[candy].start;
    const secretY = Math.min(120 + slots * 72, 500);
    const lastChapterBottom = 120 + (slots - 1) * 72 + 31;
    expect(secretY - 31).toBeGreaterThan(lastChapterBottom); // below the last chapter
    expect(secretY + 31).toBeLessThan(543);                  // above About / Scores
  });

  test("it can never slide down onto the bottom buttons", () => {
    // The clamp protects pages that fill up with chapters later
    expect(html).toMatch(/Math\.min\(120 \+ secretSlot \* 72, 500\)/);
    // check the clamp holds even for a very full page
    for (let slots = 1; slots <= 10; slots++) {
      expect(Math.min(120 + slots * 72, 500) + 31).toBeLessThan(543);
    }
  });
});

// ============================================================================
// 4. YOU CAN SEE HOW CLOSE YOU ARE
// ============================================================================
describe("Paw progress is visible", () => {
  test("a locked secret chapter row is shown with progress", () => {
    expect(html).toContain("🔒 Locked Secret Chapter");
    expect(html).toMatch(/Find " \+ PAWS_FOR_SECRET \+ " golden paws to unlock/);
  });

  test("the unlock celebration fires exactly once, on the paw that unlocks it", () => {
    expect(html).toContain("pawCount() === PAWS_FOR_SECRET");
    expect(html).toContain("Something secret has been unlocked");
  });
});
