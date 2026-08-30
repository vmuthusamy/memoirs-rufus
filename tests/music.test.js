// ============================================================================
// MUSIC  🎵
// ----------------------------------------------------------------------------
// All music in this game is ORIGINAL and generated live by maths (Web Audio
// oscillators). There are no audio files and nothing is transcribed from any
// real game — the 8-bit *sound* is a production style, like pixel art.
//
// The most valuable test in here is "every level's theme actually exists":
// if someone typos `music: "castel"`, the engine silently falls back to the
// volcano theme and the level just sounds wrong with no error anywhere.
// ============================================================================

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LEVELS_DIR = path.join(ROOT, "levels");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// ---- Work out every theme name the engine actually understands -------------
function nesThemeBlock() {
  const start = html.indexOf("nesThemes: {");
  expect(start).toBeGreaterThan(-1);
  const end = html.indexOf("\n  // Play one 16th-note slot", start);
  expect(end).toBeGreaterThan(start);
  return html.slice(start, end);
}

const NES_THEMES = [...nesThemeBlock().matchAll(/^    (\w+): \{$/gm)].map((m) => m[1]);
// Older hand-written themes, dispatched by name in playStep()
const LEGACY_THEMES = [
  ...html.matchAll(/if \(this\.theme === "(\w+)"\) return this\.\w+Step/g),
].map((m) => m[1]);
// volcanoStep is the final fallback
const ALL_THEMES = [...new Set([...NES_THEMES, ...LEGACY_THEMES, "volcano"])];

// ---- Which theme does each level ask for? ----------------------------------
const levelFiles = fs
  .readdirSync(LEVELS_DIR)
  .filter((f) => /^level\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

const levelThemes = levelFiles
  .map((f) => {
    const src = fs.readFileSync(path.join(LEVELS_DIR, f), "utf8");
    const m = src.match(/^\s*music:\s*"(\w+)"/m);
    return m ? { file: f, theme: m[1] } : null;
  })
  .filter(Boolean);

// ============================================================================
// 1. NO SILENT BREAKAGE — every level asks for a theme that exists
// ============================================================================
describe("Level music themes are real", () => {
  test("the engine defines a healthy set of themes", () => {
    expect(ALL_THEMES.length).toBeGreaterThanOrEqual(15);
  });

  test("most levels have music", () => {
    expect(levelThemes.length).toBeGreaterThanOrEqual(14);
  });

  levelThemes.forEach(({ file, theme }) => {
    test(`${file} asks for "${theme}", which the engine knows`, () => {
      expect(ALL_THEMES).toContain(theme);
    });
  });

  test("no two levels share a theme (every chapter sounds different)", () => {
    const seen = {};
    const dupes = [];
    levelThemes.forEach(({ file, theme }) => {
      if (seen[theme]) dupes.push(`${theme}: ${seen[theme]} and ${file}`);
      seen[theme] = file;
    });
    expect(dupes).toEqual([]);
  });
});

// ============================================================================
// 2. THE 8-BIT THEME RECIPES ARE WELL FORMED
//    (a bad recipe would throw at runtime, mid-level, with the music playing)
// ============================================================================
describe("8-bit theme recipes are valid", () => {
  // Rebuild the nesThemes object so we can actually inspect the numbers.
  const themes = new Function("return {" + nesThemeBlock() + "};")().nesThemes;

  test("all eight new themes are present", () => {
    expect(Object.keys(themes).length).toBeGreaterThanOrEqual(8);
  });

  Object.entries(themes).forEach(([name, cfg]) => {
    describe(`"${name}"`, () => {
      test("has a sensible tempo", () => {
        expect(cfg.bpm).toBeGreaterThanOrEqual(80);
        expect(cfg.bpm).toBeLessThanOrEqual(200);
      });

      test("every chord has a bass root and four melody notes", () => {
        expect(cfg.chords.length).toBeGreaterThanOrEqual(1);
        cfg.chords.forEach((c) => {
          expect(typeof c.root).toBe("number");
          expect(c.notes).toHaveLength(4);
          // Stay inside a real instrument's range (MIDI 21-108 = a piano)
          expect(c.root).toBeGreaterThanOrEqual(21);
          c.notes.forEach((n) => {
            expect(n).toBeGreaterThanOrEqual(21);
            expect(n).toBeLessThanOrEqual(108);
          });
        });
      });

      test("the bassline covers exactly one bar (16 slots)", () => {
        expect(cfg.bass).toHaveLength(16);
        cfg.bass.forEach((b) => {
          expect(b).toBeGreaterThanOrEqual(-1);
          expect(b).toBeLessThanOrEqual(24);
        });
      });

      test("every melody phrase is one bar and picks real chord notes", () => {
        expect(cfg.lead.length).toBeGreaterThanOrEqual(1);
        cfg.lead.forEach((phrase) => {
          expect(phrase).toHaveLength(16);
          phrase.forEach((i) => {
            expect(i).toBeGreaterThanOrEqual(-1);
            expect(i).toBeLessThanOrEqual(3); // chords only have 4 notes
          });
        });
      });

      test("drum hits land inside the bar", () => {
        [...cfg.kick, ...cfg.snare].forEach((slot) => {
          expect(slot).toBeGreaterThanOrEqual(0);
          expect(slot).toBeLessThanOrEqual(15);
        });
      });

      test("the melody stays in a playable octave after shifting", () => {
        const shift = cfg.leadOct || 0;
        cfg.chords.forEach((c) => {
          c.notes.forEach((n) => {
            expect(n + shift).toBeGreaterThanOrEqual(21);
            expect(n + shift).toBeLessThanOrEqual(108);
          });
        });
      });
    });
  });
});

// ============================================================================
// 3. THE ENGINE PLUMBING
// ============================================================================
describe("8-bit engine plumbing", () => {
  test("NES-style themes are routed through the shared engine", () => {
    expect(html).toMatch(/const nes = this\.nesThemes\[this\.theme\];/);
    expect(html).toMatch(/if \(nes\) return this\.nesStep\(step, time, nes\);/);
  });

  test("each theme carries its own tempo", () => {
    expect(html).toMatch(/this\.bpm = nes \? nes\.bpm :/);
  });

  test("level music now has a snare (it only had a kick before)", () => {
    expect(html).toMatch(/} else if \(type === "snare"\) \{/);
  });

  test("the melody phrase rotates so a level never sounds the same twice", () => {
    expect(html).toMatch(/this\.variant = Math\.floor\(Math\.random\(\) \* 4\);/);
    expect(html).toMatch(/cfg\.lead\[\(bar \+ \(this\.variant \|\| 0\)\) % cfg\.lead\.length\]/);
  });

  test("it emulates the four NES channels", () => {
    const block = html.slice(html.indexOf("nesStep(step, time, cfg)"));
    const fn = block.slice(0, block.indexOf("\n  },"));
    expect(fn).toContain('"triangle"'); // bass
    expect(fn).toContain('"square"');   // lead + harmony
    expect(fn).toContain('drum(time, "kick")');
    expect(fn).toContain('drum(time, "snare")');
  });
});

// ============================================================================
// 4. MENU MUSIC ROTATES EVERY 2 MINUTES
// ============================================================================
describe("Opening menu music", () => {
  const block = html.slice(html.indexOf("menuThemes: ["));
  const menuBlock = block.slice(0, block.indexOf("\n  themeIdx:"));

  test("there are several different opening tunes", () => {
    const names = [...menuBlock.matchAll(/name: "([^"]+)"/g)].map((m) => m[1]);
    expect(names.length).toBeGreaterThanOrEqual(4);
    expect(new Set(names).size).toBe(names.length); // all named differently
  });

  test("a tune is chosen at random when the menu starts", () => {
    expect(html).toMatch(/this\.pickTheme\(\);\s*\/\/ random opening tune/);
    expect(html).toMatch(/let i = Math\.floor\(Math\.random\(\) \* n\);/);
  });

  test("it never plays the same tune twice in a row", () => {
    expect(html).toMatch(/if \(n > 1 && i === this\.themeIdx\) i = \(i \+ 1\) % n;/);
  });

  test("it swaps to a new tune every 2 minutes", () => {
    expect(html).toMatch(/this\.themeSwapAt = this\.ctx\.currentTime \+ 120;/);
    expect(html).toMatch(
      /if \(this\.step === 0 && this\.ctx\.currentTime >= this\.themeSwapAt\) this\.pickTheme\(\);/
    );
  });

  test("the swap happens on a musical boundary, not mid-bar", () => {
    // The guard requires step === 0, i.e. the very start of the loop.
    expect(html).toMatch(/this\.step === 0 && this\.ctx\.currentTime >= this\.themeSwapAt/);
  });
});

// ============================================================================
// 5. ORIGINALITY — no audio files, nothing sampled or downloaded
// ============================================================================
describe("Music is original and self-contained", () => {
  test("no audio files are loaded anywhere", () => {
    expect(html).not.toMatch(/\.mp3|\.ogg|\.wav|\.m4a/i);
    expect(html).not.toMatch(/loadSound\(/);
  });

  test("every sound is synthesised in the browser", () => {
    expect(html).toContain("createOscillator");
    expect(html).toContain("AudioContext");
  });

  test("the code states the music is original", () => {
    expect(html).toContain("ALL OF THIS MUSIC IS ORIGINAL");
  });
});
