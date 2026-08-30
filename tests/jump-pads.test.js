// ============================================================================
// JUMP PAD (BOUNCE CRATE) SAFETY NET  🟩⬆️
// ----------------------------------------------------------------------------
// The bug this guards against: a bounce pad placed directly UNDER a platform.
// Rufus bounces, smacks his head on the underside, drops back onto the pad,
// bounces again... forever. It reads as a trap instead of a launcher, and it
// made the pad pointless ("what's the point of this jump pad?").
//
// Two layers of protection, both tested here:
//   1. ENGINE  — smart pads only fire when he lands on top, they cool down so
//      they can't double-fire, and they steer him out from under any ledge.
//   2. LEVEL DATA — every pad in every level is checked to make sure it is
//      actually escapable, so no level ships a dud pad.
//
// The physics constants are READ OUT OF index.html so this test and the engine
// can never drift apart.
// ============================================================================

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LEVELS_DIR = path.join(ROOT, "levels");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// ---- pull the real numbers out of the engine -------------------------------
function num(re, label) {
  const m = html.match(re);
  if (!m) throw new Error("Could not find " + label + " in index.html");
  return parseFloat(m[1]);
}
const JUMP_FORCE = num(/const jumpForce\s*=\s*([\d.]+)/, "jumpForce");
const BOUNCE_MULT = num(/const BOUNCE_POWER\s*=\s*jumpForce\s*\*\s*([\d.]+)/, "BOUNCE_POWER");
const STEER_SPEED = num(/const BOUNCE_STEER_SPEED\s*=\s*([\d.]+)/, "BOUNCE_STEER_SPEED");
const RUFUS_HALF_W = num(/const RUFUS_HALF_W\s*=\s*([\d.]+)/, "RUFUS_HALF_W");
const PAD_H = num(/const PAD_H\s*=\s*([\d.]+)/, "PAD_H");

const POWER = JUMP_FORCE * BOUNCE_MULT;
const PAD_HALF_W = 16; // bounce crate sprite is 32px wide, anchored bottom-centre
const CRATE_HALF_W = 16; // crates are 32px wide, anchored bottom-centre

function loadLevel(file) {
  const code = fs.readFileSync(path.join(LEVELS_DIR, file), "utf8");
  const varName = code.match(/const (\w+)\s*=/)[1];
  return new Function(code + "\nreturn " + varName + ";")();
}

const levelFiles = fs
  .readdirSync(LEVELS_DIR)
  .filter((f) => /^level\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

// Work out what happens when Rufus bounces on one pad.
// -> "clear"   : nothing overhead, full launch
// -> "steer"   : a ledge overhead, but he can slide out from under it
// -> "capped"  : ledge too wide to escape; the pad becomes a dud short hop
function classifyPad(level, pad) {
  const gravity = level.spaceTheme ? 900 : 1600;
  const reach = (POWER * POWER) / (2 * gravity);
  const riseTime = POWER / gravity;
  const padTop = pad.y - PAD_H;
  const apex = padTop - reach;

  let lowest = null;
  (level.platforms || []).forEach((p) => {
    const left = p.x;
    const right = p.x + p.width;
    const underside = p.y + p.height;
    const inColumn = pad.x + RUFUS_HALF_W > left && pad.x - RUFUS_HALF_W < right;
    const inArc = underside > apex && underside < padTop - 12;
    if (inColumn && inArc && (!lowest || underside > lowest.underside)) {
      lowest = { left: left, right: right, underside: underside };
    }
  });

  if (!lowest) return { kind: "clear", reach: reach };

  const clearLeft = pad.x - lowest.left + RUFUS_HALF_W;
  const clearRight = lowest.right - pad.x + RUFUS_HALF_W;
  const needed = Math.min(clearLeft, clearRight);
  const budget = STEER_SPEED * riseTime;
  return {
    kind: needed <= budget ? "steer" : "capped",
    needed: needed,
    budget: budget,
    reach: reach,
  };
}

// ============================================================================
// 1. THE ENGINE HAS THE SMART-PAD LOGIC
// ============================================================================
describe("Engine: smart jump pads", () => {
  test("a pad only fires when Rufus lands on TOP (not brushing the side)", () => {
    expect(html).toMatch(/const padTop = pad\.pos\.y - PAD_H/);
    expect(html).toMatch(/if \(rufus\.pos\.y \+ 20 > padTop\) return;/);
  });

  test("a pad cannot fire twice in a row (stops the bouncing judder)", () => {
    expect(html).toMatch(/if \(bouncePadCooldown > 0\) return;/);
    expect(html).toMatch(/bouncePadCooldown = 0\.25;/);
  });

  test("the engine looks for a platform hanging over the pad", () => {
    expect(html).toContain("function ceilingOverPad(");
    expect(html).toMatch(/const ceiling = ceilingOverPad\(pad\.pos\.x, padTop\)/);
  });

  test("it steers Rufus out from under a ledge instead of trapping him", () => {
    expect(html).toMatch(/bounceSteerDir = goRight \? 1 : -1;/);
    expect(html).toMatch(/rufus\.move\(bounceSteerDir \* BOUNCE_STEER_SPEED, 0\)/);
  });

  test("auto-steer never fights the player and only runs in mid-air", () => {
    expect(html).toMatch(
      /!rufus\.isGrounded\(\) && !isKeyDown\("left"\) && !isKeyDown\("right"\)/
    );
  });

  test("if a ledge is inescapable the hop is shortened so he can't head-bonk", () => {
    expect(html).toMatch(/power = Math\.min\(BOUNCE_POWER, Math\.sqrt\(2 \* levelGravity \* room\)\)/);
  });

  test("gravity is captured so bounce height can be calculated", () => {
    expect(html).toMatch(/const levelGravity = level\.spaceTheme \? 900 : 1600;/);
    expect(html).toMatch(/setGravity\(levelGravity\)/);
  });
});

// ============================================================================
// 2. EVERY PAD IN EVERY LEVEL IS A REAL LAUNCHER, NOT A DUD
// ============================================================================
describe("Level data: every jump pad actually works", () => {
  levelFiles.forEach((file) => {
    const level = loadLevel(file);
    const pads = level.bounceCrates || [];
    if (!pads.length) return;

    describe(`${file} — ${level.name}`, () => {
      test("no pad is stuck under a ledge it cannot escape", () => {
        const duds = pads
          .map((pad, i) => ({ i: i, pad: pad, res: classifyPad(level, pad) }))
          .filter((r) => r.res.kind === "capped")
          .map(
            (r) =>
              `pad[${r.i}] at x=${r.pad.x} needs ${Math.round(r.res.needed)}px ` +
              `to escape but only has ${Math.round(r.res.budget)}px`
          );
        expect(duds).toEqual([]);
      });

      // The stronger guarantee: pads were moved out of the ledges entirely, so
      // the engine's rescue-steer should never even need to fire.
      test("every pad has CLEAR SKY above it (not tucked under a platform)", () => {
        const blocked = pads
          .map((pad, i) => ({ i: i, pad: pad, res: classifyPad(level, pad) }))
          .filter((r) => r.res.kind !== "clear")
          .map((r) => `pad[${r.i}] at x=${r.pad.x} is under a ledge`);
        expect(blocked).toEqual([]);
      });

      test("pads sit on the ground and inside the level", () => {
        pads.forEach((pad) => {
          expect(pad.y).toBeGreaterThan(400);
          expect(pad.x).toBeGreaterThanOrEqual(0);
          expect(pad.x).toBeLessThanOrEqual(level.width);
        });
      });

      test("pads do not overlap a wooden crate", () => {
        const clashes = [];
        pads.forEach((pad, i) => {
          (level.crates || []).forEach((c) => {
            if (Math.abs(c.x - pad.x) < PAD_HALF_W + CRATE_HALF_W) {
              clashes.push(`pad[${i}] x=${pad.x} overlaps crate x=${c.x}`);
            }
          });
        });
        expect(clashes).toEqual([]);
      });

      test("pads are not stacked on top of each other", () => {
        const xs = pads.map((p) => p.x).sort((a, b) => a - b);
        for (let i = 1; i < xs.length; i++) {
          expect(xs[i] - xs[i - 1]).toBeGreaterThan(PAD_HALF_W * 2);
        }
      });
    });
  });
});

// ============================================================================
// 3. LEVEL 1 — the one Arvind spotted. Pads must be in the OPEN, not under a
//    ledge, and each one must launch him up to a real platform.
// ============================================================================
describe("The Backyard (level 1): jump pads have a point", () => {
  const level = loadLevel("level1.js");

  test("every pad has clear sky above it", () => {
    const blocked = (level.bounceCrates || [])
      .map((pad, i) => ({ i: i, pad: pad, res: classifyPad(level, pad) }))
      .filter((r) => r.res.kind !== "clear")
      .map((r) => `pad[${r.i}] at x=${r.pad.x} is under a ledge`);
    expect(blocked).toEqual([]);
  });

  test("every pad can launch Rufus onto at least one platform", () => {
    (level.bounceCrates || []).forEach((pad, i) => {
      const res = classifyPad(level, pad);
      const padTop = pad.y - PAD_H;
      const apex = padTop - res.reach;
      // A platform he could plausibly land on: its top is within the arc, and
      // it's near enough to drift onto on the way up or down.
      const reachable = level.platforms.filter(
        (p) =>
          p.y > apex &&
          p.y < padTop &&
          Math.abs(p.x + p.width / 2 - pad.x) < 340
      );
      expect({ pad: i, reachable: reachable.length }).toEqual({
        pad: i,
        reachable: expect.any(Number),
      });
      expect(reachable.length).toBeGreaterThan(0);
    });
  });
});
