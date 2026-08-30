// ============================================================================
// ORANGE GEM — play every piano key IN ORDER  🧡🎹
// ----------------------------------------------------------------------------
// Arvind's design for "Cool Music" (Level 16):
//   * every note you play correctly appears in a strip at the top of the screen
//   * play all of them IN ORDER  -> the strip turns into an ORANGE GEM
//   * play one out of order      -> the strip turns RED and disappears
//
// The rule is re-implemented here and run against the REAL level data, so if
// someone reorders the keys or adds more, we find out straight away.
// ============================================================================

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

function loadLevel(file) {
  const code = fs.readFileSync(path.join(ROOT, "levels", file), "utf8");
  const varName = code.match(/const (\w+)\s*=/)[1];
  return new Function(code + "\nreturn " + varName + ";")();
}
const piano = loadLevel("level16.js");

// ============================================================================
// 1. THE GEM ITSELF IS WIRED UP
// ============================================================================
describe("The orange gem exists", () => {
  test("it has a sprite that gets loaded", () => {
    expect(html).toContain("function drawOrangeGem()");
    expect(html).toContain('loadSprite("orangeGem", drawOrangeGem().toDataURL());');
  });

  test("it saves and loads like the other colour gems", () => {
    expect(html).toContain("function hasOrangeGem()");
    expect(html).toContain("function awardOrangeGem()");
    expect(html).toMatch(/localStorage\.setItem\("rufus_orange_gem", "true"\)/);
  });

  test("it shows in the gem tracker on the title screen", () => {
    expect(html).toMatch(/\{ spr: "orangeGem", has: hasOrangeGem\(\) \}/);
  });

  test("it counts toward the gem total", () => {
    // totalMax is built from colorGems.length, so adding one is enough
    expect(html).toMatch(/const totalMax = ALL_LEVELS\.length \+ colorGems\.length;/);
  });
});

// ============================================================================
// 2. THE KEYS KNOW THEIR PLACE IN THE SONG
// ============================================================================
describe("Piano keys are ordered left to right", () => {
  test("each key is given a keyIndex", () => {
    expect(html).toMatch(/keyIndex: idx/);
  });

  test("the level's keys really are in left-to-right order", () => {
    // keyIndex comes from the array position, so "in order" only means
    // "left to right" if the platforms are listed that way.
    const xs = piano.platforms.map((p) => p.x);
    const sorted = [...xs].sort((a, b) => a - b);
    expect(xs).toEqual(sorted);
  });

  test("every key has a note to play", () => {
    piano.platforms.forEach((p) => {
      expect(typeof p.pianoNote).toBe("number");
    });
  });

  test("there are enough keys to make it a real challenge", () => {
    expect(piano.platforms.length).toBeGreaterThanOrEqual(10);
  });
});

// ============================================================================
// 3. THE "IN ORDER" RULE (re-implemented and exercised)
// ============================================================================
describe("Playing the song in order", () => {
  const TOTAL = piano.platforms.length;

  // Mirrors the engine: correct note advances, same key again is ignored,
  // anything else breaks the streak (restarting if you hit the first key).
  function play(sequence) {
    let streak = 0;
    let done = false;
    let breaks = 0;
    for (const i of sequence) {
      if (done) break;
      if (i === streak) {
        streak++;
        if (streak >= TOTAL) done = true;
      } else if (i === streak - 1) {
        // landed on the same key twice — ignore
      } else {
        breaks++;
        streak = i === 0 ? 1 : 0;
      }
    }
    return { streak, done, breaks };
  }

  const perfect = [...Array(TOTAL).keys()];

  test("playing every key in order wins the gem", () => {
    expect(play(perfect).done).toBe(true);
  });

  test("skipping a key breaks the streak", () => {
    const r = play([0, 1, 2, 5]);
    expect(r.done).toBe(false);
    expect(r.breaks).toBe(1);
    expect(r.streak).toBe(0);
  });

  test("bouncing on the same key twice does NOT break it", () => {
    const r = play([0, 1, 1, 2]);
    expect(r.breaks).toBe(0);
    expect(r.streak).toBe(3);
  });

  test("jumping back to the first key starts the song again", () => {
    const r = play([0, 1, 2, 0]);
    expect(r.breaks).toBe(1);
    expect(r.streak).toBe(1); // counted as the new first note
  });

  test("starting in the middle of the song doesn't count", () => {
    expect(play([3]).streak).toBe(0);
  });

  test("you can mess up and still win by playing it properly after", () => {
    expect(play([7, 2, ...perfect]).done).toBe(true);
  });

  test("playing it backwards never wins", () => {
    expect(play([...perfect].reverse()).done).toBe(false);
  });

  test("stopping one note short does NOT win", () => {
    const r = play(perfect.slice(0, TOTAL - 1));
    expect(r.done).toBe(false);
    expect(r.streak).toBe(TOTAL - 1);
  });
});

// ============================================================================
// 4. THE NOTE STRIP AT THE TOP
// ============================================================================
describe("The note strip", () => {
  test("a correct note is added to the strip", () => {
    expect(html).toContain("function addNoteBadge(");
    expect(html).toMatch(/NOTE_NAMES\[key\.midi % 12\]/);
  });

  test("a wrong note turns it red and removes it", () => {
    expect(html).toContain("function breakNoteStreak(");
    expect(html).toMatch(/color\(230, 50, 50\)/);
  });

  test("finishing turns the strip orange, then into the gem", () => {
    expect(html).toContain("function completeSong(");
    expect(html).toMatch(/get\("noteBox"\)\.forEach\(\(o\) => \{ o\.color = rgb\(245, 140, 30\); \}\)/);
    expect(html).toMatch(/awardOrangeGem\(\);/);
  });

  test("the strip fits on screen with every key", () => {
    const w = parseInt(html.match(/const NOTE_W = (\d+)/)[1]);
    const gap = parseInt(html.match(/NOTE_GAP = (\d+)/)[1]);
    const total = piano.platforms.length;
    const stripW = total * (w + gap) - gap;
    expect(stripW).toBeLessThanOrEqual(800); // canvas width
    const startX = (800 - stripW) / 2;
    expect(startX).toBeGreaterThanOrEqual(0);
  });

  test("the strip sits below the score and lives HUD", () => {
    const noteY = parseInt(html.match(/NOTE_Y = (\d+)/)[1]);
    // Lives text is drawn at y=50 with size 20, so stay clear of it
    expect(noteY).toBeGreaterThan(70);
  });

  test("the player is told what to do", () => {
    expect(html).toContain("Play every key IN ORDER for the ORANGE GEM!");
  });
});

// ============================================================================
// 5. NO WASPS — they knocked you off mid-song
// ============================================================================
describe("Cool Music has no wasps", () => {
  test("there are no flying enemies at all", () => {
    const wasps = piano.enemies.filter((e) => e.type.indexOf("wasp") === 0);
    expect(wasps).toEqual([]);
  });

  test("it still has some enemies to tail-spin", () => {
    // The general level rules want at least 3 in a non-boss level
    expect(piano.enemies.length).toBeGreaterThanOrEqual(3);
  });

  test("the remaining enemies stay on the ground, off the keys", () => {
    const keyTops = piano.platforms.map((p) => p.y);
    const lowestKey = Math.max(...keyTops);
    piano.enemies.forEach((e) => {
      // y=535 is standing on the ground; keys are all higher up than that
      expect(e.y).toBeGreaterThan(lowestKey);
    });
  });

  test("the golden paw is still guarded by two of them", () => {
    const guards = piano.enemies.filter(
      (e) => Math.abs(e.x - piano.secretPaw.x) < 150
    );
    expect(guards.length).toBeGreaterThanOrEqual(2);
  });
});

// ============================================================================
// 6. THE GRAND FINALE — the piano plays itself before the level ends
// ============================================================================
describe("Piano grand finale", () => {
  test("the finale function exists", () => {
    expect(html).toContain("function playPianoFinale(done)");
  });

  test("it runs when you reach the exit, then finishes the level", () => {
    // Same shape as the rocket-launch cutscene on Level 13
    expect(html).toMatch(/if \(isPiano\) \{\s*\n\s*exitReached = true;\s*\n\s*playPianoFinale\(finish\);/);
  });

  test("it plays the keys in song order, not screen order", () => {
    expect(html).toMatch(/get\("pianoKey"\)\.slice\(\)\.sort\(\(a, b\) => a\.keyIndex - b\.keyIndex\)/);
  });

  test("each key lights up and sounds its own note", () => {
    const fn = html.slice(html.indexOf("function playPianoFinale(done)"));
    const body = fn.slice(0, fn.indexOf("\n  function playLaunchCutscene"));
    expect(body).toContain("k.litT = 1;");
    expect(body).toMatch(/levelMusic\.note\(levelMusic\.freq\(k\.midi\)/);
  });

  test("the camera glides along the keyboard instead of following Rufus", () => {
    expect(html).toMatch(/if \(finalePlaying\) return;/);
    expect(html).toMatch(/camPos\(k\.pos\.x \+ k\.width \/ 2, 300\)/);
  });

  test("you can't be hurt during the finale", () => {
    const fn = html.slice(html.indexOf("function playPianoFinale(done)"));
    expect(fn.slice(0, 600)).toContain("isInvincible = true;");
  });

  test("it always hands control back so the level can end", () => {
    const fn = html.slice(html.indexOf("function playPianoFinale(done)"));
    const body = fn.slice(0, fn.indexOf("\n  function playLaunchCutscene"));
    // finishes normally...
    expect(body).toMatch(/finalePlaying = false;\s*\n\s*done\(\);/);
    // ...and bails out safely if there are somehow no keys
    expect(body).toMatch(/if \(!keys\.length\) \{ done\(\); return; \}/);
  });

  test("the finale is a sensible length", () => {
    const step = parseFloat(html.match(/const step = ([\d.]+);\s*\/\/ seconds between notes/)[1]);
    const seconds = piano.platforms.length * step;
    expect(seconds).toBeGreaterThan(1);
    expect(seconds).toBeLessThan(15);
  });
});
