// ============================================================================
// ENGINE & FILE SYNTAX GUARD  🧯
// ----------------------------------------------------------------------------
// The single scariest breakage for this game is a JavaScript SYNTAX error:
// one stray comma or unclosed brace in the big inline <script> inside
// index.html turns the ENTIRE game into a blank screen. Level files are the
// same — a broken level file blanks the game too.
//
// `new Function(code)` PARSES the code without RUNNING it. That means it can't
// call Kaplay or touch the browser (so it never false-fails on `kaplay()` or
// `window`), but it WILL throw on any real syntax mistake. Perfect early alarm.
//
// This suite auto-discovers files, so new levels are covered automatically.
// ============================================================================

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LEVELS_DIR = path.join(ROOT, "levels");

function parses(code) {
  // eslint-disable-next-line no-new-func
  return () => new Function(code);
}

// ---------------------------------------------------------------------------
// 1. The game engine (inline <script> in index.html)
// ---------------------------------------------------------------------------
describe("index.html game engine parses without syntax errors", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const inlineBlocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
    (m) => m[1]
  );

  test("has exactly one inline engine <script> block", () => {
    // If this ever changes, the game structure changed — worth a human look.
    expect(inlineBlocks.length).toBe(1);
  });

  test("the engine script is valid JavaScript (no syntax errors)", () => {
    expect(inlineBlocks.length).toBeGreaterThan(0);
    inlineBlocks.forEach((code) => {
      expect(parses(code)).not.toThrow();
    });
  });
});

// ---------------------------------------------------------------------------
// 1b. Kaplay component rules
// ---------------------------------------------------------------------------
// Some Kaplay components REQUIRE another component to be present. Break the
// rule and the game throws at the moment that object is created — which kills
// the game loop and freezes the screen on its last frame.
//
// This actually happened: the "Cool Music" grand finale used lifespan() without
// opacity(), so the game froze the instant you reached Felix with
//     Component "lifespan" requires component "opacity"
// Parsing can't catch it (the code is valid JavaScript), and it only shows up
// if you play all the way to that exact moment — so we check it here instead.
describe("Kaplay component requirements are respected", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

  // Pull out every add([ ... ]) block
  function addBlocks(src) {
    return [...src.matchAll(/add\(\[[\s\S]{0,900}?\]\)/g)].map((m) => ({
      code: m[0],
      line: src.slice(0, m.index).split("\n").length,
    }));
  }

  test("every lifespan() also has opacity()", () => {
    const offenders = addBlocks(html)
      .filter((b) => b.code.includes("lifespan(") && !b.code.includes("opacity("))
      .map((b) => `index.html:${b.line}`);
    expect(offenders).toEqual([]);
  });

  test("there are plenty of lifespan uses to check (the scan really runs)", () => {
    const withLifespan = addBlocks(html).filter((b) => b.code.includes("lifespan("));
    expect(withLifespan.length).toBeGreaterThan(20);
  });

  test("the same rule holds in the standalone mini-games", () => {
    const offenders = [];
    fs.readdirSync(ROOT)
      .filter((f) => f.endsWith(".html") && f !== "index.html")
      .forEach((f) => {
        const src = fs.readFileSync(path.join(ROOT, f), "utf8");
        addBlocks(src)
          .filter((b) => b.code.includes("lifespan(") && !b.code.includes("opacity("))
          .forEach((b) => offenders.push(`${f}:${b.line}`));
      });
    expect(offenders).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 2. Every level file + support file parses
// ---------------------------------------------------------------------------
describe("Every level and support .js file parses without syntax errors", () => {
  const jsFiles = fs
    .readdirSync(LEVELS_DIR)
    .filter((f) => f.endsWith(".js"))
    .sort();

  test("found level files to check", () => {
    expect(jsFiles.length).toBeGreaterThanOrEqual(9);
  });

  jsFiles.forEach((file) => {
    test(`levels/${file} is valid JavaScript`, () => {
      const code = fs.readFileSync(path.join(LEVELS_DIR, file), "utf8");
      expect(parses(code)).not.toThrow();
    });
  });
});

// ---------------------------------------------------------------------------
// 3. Other standalone HTML pages parse (donut-boss, hearts, etc.)
// ---------------------------------------------------------------------------
describe("Standalone HTML mini-games parse without syntax errors", () => {
  const htmlFiles = fs
    .readdirSync(ROOT)
    .filter((f) => f.endsWith(".html") && f !== "index.html");

  htmlFiles.forEach((file) => {
    test(`${file} inline scripts are valid JavaScript`, () => {
      const html = fs.readFileSync(path.join(ROOT, file), "utf8");
      const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
        (m) => m[1]
      );
      blocks.forEach((code) => {
        expect(parses(code)).not.toThrow();
      });
    });
  });
});
