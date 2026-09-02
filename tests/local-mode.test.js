// ============================================================================
// LOCAL MODE — the Level Creator is a HOME-ONLY tool  🏠
// ----------------------------------------------------------------------------
// The Level Creator is the piece that will grow into a real level-generating
// AI. It must never be reachable from the public rufusfamily.com site, so
// visitors can't trigger that work (or the bills that come with it).
//
// Two layers, both tested here:
//   1. the MENU button is only added when running locally, and
//   2. the levelCreator SCENE itself bounces you out if you're not local —
//      so an old bookmark or a leftover "Make another!" button can't get in.
// ============================================================================

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// Pull the real isLocalMode() out of index.html and run it against fake URLs.
function loadIsLocalMode() {
  const start = html.indexOf("function isLocalMode()");
  expect(start).toBeGreaterThan(-1);
  const end = html.indexOf("\n}", start) + 2;
  const src = html.slice(start, end);
  return new Function("location", src + "\nreturn isLocalMode;");
}

function check(url) {
  const u = new URL(url);
  const fn = loadIsLocalMode()({ protocol: u.protocol, hostname: u.hostname });
  return fn();
}

describe("isLocalMode() tells home from the public site", () => {
  test("the live website is NOT local", () => {
    expect(check("https://rufusfamily.com/")).toBe(false);
    expect(check("https://www.rufusfamily.com/index.html")).toBe(false);
  });

  test("GitHub Pages is NOT local", () => {
    expect(check("https://vmuthusamy.github.io/memoirs-rufus/")).toBe(false);
  });

  test("a random other site is NOT local", () => {
    expect(check("https://example.com/rufus/")).toBe(false);
  });

  test("opening the file by double-clicking IS local", () => {
    expect(check("file:///Users/vmuthusamy/code/adventures-of-rufus/index.html")).toBe(true);
  });

  test("localhost and 127.0.0.1 ARE local", () => {
    expect(check("http://localhost:8000/index.html")).toBe(true);
    expect(check("http://127.0.0.1:5500/")).toBe(true);
  });

  test("a .local machine name on the home network IS local", () => {
    expect(check("http://macbook.local:8080/")).toBe(true);
  });

  test("it fails CLOSED — if it can't tell, it hides the creator", () => {
    // location throwing (sandboxed iframe, odd embed) must not open the door.
    const fn = new Function(
      "location",
      html.slice(
        html.indexOf("function isLocalMode()"),
        html.indexOf("\n}", html.indexOf("function isLocalMode()")) + 2
      ) + "\nreturn isLocalMode;"
    )({
      get protocol() { throw new Error("blocked"); },
      get hostname() { throw new Error("blocked"); },
    });
    expect(fn()).toBe(false);
  });
});

describe("Level Creator is hidden on the public site", () => {
  test("the menu only adds the button when local", () => {
    expect(html).toMatch(
      /if \(isLocalMode\(\)\) \{\s*\n\s*items\.push\(\{ label: "Level Creator"/
    );
  });

  test("Play and User Level Search are always there", () => {
    expect(html).toMatch(/label: "Play"/);
    expect(html).toMatch(/items\.push\(\{ label: "User Level Search"/);
  });

  test("the menu panel resizes so there is no empty gap", () => {
    expect(html).toMatch(/const panelH = 60 \+ items\.length \* 70 \+ 26;/);
    // Panel, title, close button and rows are all positioned off panelH
    expect(html).toMatch(/rect\(420, panelH\)/);
    expect(html).toMatch(/const top = height\(\) \/ 2 - panelH \/ 2;/);
  });

  test("the scene itself refuses to open when not local", () => {
    const scene = html.slice(html.indexOf('scene("levelCreator"'));
    const head = scene.slice(0, 1600);
    expect(head).toMatch(/if \(!isLocalMode\(\)\) \{/);
    expect(head).toContain("only works on the home computer");
    // and it must bail out before building anything
    expect(head).toMatch(/home\.onClick\(\(\) => go\("title"\)\);\s*\n\s*onKeyPress\("escape", \(\) => go\("title"\)\);\s*\n\s*return;/);
  });

  test("the creator still costs nothing — no network calls anywhere", () => {
    expect(html).not.toMatch(/fetch\s*\(/);
    expect(html).not.toMatch(/XMLHttpRequest/);
    expect(html).not.toMatch(/api\.anthropic\.com|api\.openai\.com/);
  });
});

// ============================================================================
// There is no "Unlock All" button any more
// ----------------------------------------------------------------------------
// Arvind found it on the live website on his school iPad — anyone visiting
// could tap it and skip past every level he'd built. It was first hidden on the
// public site, then removed entirely. Chapters are earned by playing now.
// Unlocking for testing is the secret U key, which is home-only.
// ============================================================================
describe("No Unlock All button anywhere", () => {
  test("the button is completely gone from the game", () => {
    expect(html).not.toContain("unlockBtn");
    expect(html).not.toContain('text("🔓 Unlock All"');
    expect(html).not.toContain('text("home only"');
  });

  test("the level list has no way to unlock everything at once", () => {
    // Grab the levelSelect scene and make sure no cheat lives in it
    const scene = html.slice(html.indexOf('scene("levelSelect"'));
    const body = scene.slice(0, scene.indexOf('scene("memoir"'));
    expect(body).not.toContain("markBeaten(i)");
    expect(body).not.toContain("unlockJetpack(");
  });

  test("the secret U key also grants the jetpack", () => {
    // There are two "u" handlers — one un-bans the Level Creator. We want the
    // one on the title screen that unlocks every level.
    const handler = [...html.matchAll(/onKeyPress\("u", \(\) => \{[\s\S]*?\n  \}\);/g)]
      .map((m) => m[0])
      .find((h) => h.includes("markBeaten"));
    expect(handler).toBeDefined();
    expect(handler).toContain("unlockJetpack();");
  });

  test("the secret U and L keys are home-only too", () => {
    const unlockKey = [...html.matchAll(/onKeyPress\("u", \(\) => \{[\s\S]*?\n  \}\);/g)]
      .map((m) => m[0])
      .find((h) => h.includes("markBeaten"));
    expect(unlockKey).toContain("!isLocalMode()");

    const relockKey = [...html.matchAll(/onKeyPress\("l", \(\) => \{[\s\S]*?\n  \}\);/g)]
      .map((m) => m[0])
      .find((h) => h.includes("rufus_beaten"));
    expect(relockKey).toContain("!isLocalMode()");
  });

  // The catch-all: ANY future way of unlocking the whole game must be home-only.
  test("there is NO way to skip the game on the public site", () => {
    const cheats = [
      ...html.matchAll(/for \(let i = 0; i < ALL_LEVELS\.length; i\+\+\) markBeaten\(i\)/g),
    ];
    expect(cheats.length).toBeGreaterThan(0);

    // Work out the exact span of every `if (isLocalMode()) { ... }` block by
    // matching its braces, rather than guessing by how close the text is.
    const guardedRanges = [];
    [...html.matchAll(/if \(isLocalMode\(\)\) \{/g)].forEach((g) => {
      let depth = 0;
      for (let i = g.index + g[0].length - 1; i < html.length; i++) {
        if (html[i] === "{") depth++;
        else if (html[i] === "}") {
          depth--;
          if (depth === 0) { guardedRanges.push([g.index, i]); break; }
        }
      }
    });
    // An early `if (... !isLocalMode()) return;` guard protects the rest of its
    // own handler, so count those too.
    const earlyReturns = [...html.matchAll(/!isLocalMode\(\)\) return;/g)].map((m) => m.index);

    const ungated = cheats
      .filter((m) => {
        const insideBlock = guardedRanges.some(([s, e]) => m.index > s && m.index < e);
        const afterEarlyReturn = earlyReturns.some(
          (i) => m.index > i && m.index - i < 400
        );
        return !insideBlock && !afterEarlyReturn;
      })
      .map((m) => `index.html:${html.slice(0, m.index).split("\n").length}`);

    expect(ungated).toEqual([]);
  });
});

// ============================================================================
// The generator used to drop bounce pads blindly every 1500px
// ============================================================================
describe("Generated levels get sensible jump pads", () => {
  test("each generated pad slides until it has clear sky", () => {
    expect(html).toMatch(/const underLedge = platforms\.some/);
    expect(html).toMatch(/if \(!underLedge && !onCrate\) break;/);
  });

  test("each generated pad gets a high reward platform only it can reach", () => {
    expect(html).toMatch(/platforms\.push\(\{ x: hx, y: 290, width: 140, height: 30 \}\)/);
    expect(html).toMatch(/treats\.push\(\{ x: hx \+ 70, y: 250 \}\)/);
  });

  test("the reward platform sits beside the pad, never on top of it", () => {
    // hx = px + 60, and Rufus's half-width is 28, so the pad column is clear.
    expect(html).toMatch(/const hx = px \+ 60;/);
  });
});
