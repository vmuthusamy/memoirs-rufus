// ============================================================================
// TITLE SCREEN / ARCADE MENU  🕹️
// ----------------------------------------------------------------------------
// The bug this guards against: "Adventures of Rufus" was drawn in the raw theme
// colour straight onto the dark sky. On the red theme that's dark red on
// near-black, so the title was basically invisible — and the Game Files button
// overlapped the first letters on top of that.
//
// The important test here is the CONTRAST one: it actually does the colour
// maths for every single theme and proves the title stays readable. That can't
// silently regress the way "does the file contain this string" checks can.
// ============================================================================

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// ---- Pull the real colour helpers out of index.html and run them ------------
// (If someone refactors these away this test fails loudly, which is correct —
// the contrast guarantee would be gone.)
function loadColorHelpers() {
  const start = html.indexOf("const THEME_COLORS = {");
  const end = html.indexOf("// Painted hat");
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  const src = html.slice(start, end);
  const sandbox = new Function(
    "localStorage",
    src + "\nreturn { THEME_COLORS, getThemeColor, getTitleColor, getThemeBg, setTheme };"
  );
  // Minimal localStorage stub so getTheme()/setTheme() work.
  let store = {};
  return sandbox({
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
  });
}

// Standard relative luminance (WCAG), 0 = black, 1 = white.
function luminance(rgb) {
  const chan = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2];
}

function contrastRatio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

// ============================================================================
// 1. THE TITLE IS READABLE ON EVERY THEME  (the actual bug)
// ============================================================================
describe("Title is readable on every theme", () => {
  const H = loadColorHelpers();
  const themeNames = Object.keys(H.THEME_COLORS);

  test("there are themes to check", () => {
    expect(themeNames.length).toBeGreaterThanOrEqual(10);
  });

  themeNames.forEach((name) => {
    test(`"${name}" theme: title stands out from the background`, () => {
      H.setTheme(name);
      const bg = H.getThemeBg();
      const title = H.getTitleColor();
      // 4.5:1 is the normal-text readability bar; big display text needs less,
      // but the title is the most important thing on the screen so we hold it
      // to the higher bar.
      expect(contrastRatio(title, bg)).toBeGreaterThan(4.5);
    });

    test(`"${name}" theme: brightened title beats the raw theme colour`, () => {
      H.setTheme(name);
      const bg = H.getThemeBg();
      const raw = H.getThemeColor();
      const title = H.getTitleColor();
      // The whole point of getTitleColor(): it must be an improvement.
      expect(contrastRatio(title, bg)).toBeGreaterThanOrEqual(contrastRatio(raw, bg));
      expect(luminance(title)).toBeGreaterThan(luminance(raw));
    });
  });

  test("the old dark-red-on-black case is genuinely fixed", () => {
    H.setTheme("red");
    const bg = H.getThemeBg();
    // What it used to be: raw theme colour on the dark background.
    const before = contrastRatio(H.getThemeColor(), bg);
    const after = contrastRatio(H.getTitleColor(), bg);
    expect(before).toBeLessThan(4.5); // it really was too dim
    expect(after).toBeGreaterThan(4.5); // and now it isn't
  });
});

// ============================================================================
// 2. ARCADE MARQUEE + LAYOUT — nothing overlaps the title any more
// ============================================================================
describe("Arcade marquee layout", () => {
  test("the title sits on its own lit marquee panel", () => {
    expect(html).toContain("ARCADE MARQUEE");
    expect(html).toMatch(/const marqueeBorder = add\(\[/);
  });

  test("the title uses the brightened colour, a shadow and an outline", () => {
    expect(html).toMatch(/color\(\.\.\.getTitleColor\(\)\)/);
    expect(html).toMatch(/const titleShadow = add\(\[/);
    expect(html).toMatch(/outline\(4, rgb\(25, 12, 40\)\)/);
  });

  test("switching theme also updates the title and marquee colours", () => {
    expect(html).toMatch(/titleText\.color = rgb\(\.\.\.getTitleColor\(\)\)/);
    expect(html).toMatch(/marqueeBorder\.color = rgb\(\.\.\.getThemeColor\(\)\)/);
  });

  test("the Game Files button no longer overlaps the title", () => {
    // Marquee border is 548 wide centred at 400 -> starts at x=126.
    // Game Files is 112 wide centred at 64 -> ends at x=120. No overlap.
    const files = html.match(/rect\((\d+), 26\), pos\((\d+), 80\)/);
    expect(files).not.toBeNull();
    const w = parseInt(files[1]);
    const cx = parseInt(files[2]);
    const filesRight = cx + w / 2;
    const marqueeLeft = 400 - 548 / 2;
    expect(filesRight).toBeLessThan(marqueeLeft);
  });

  test("the Theme button clears the right edge of the marquee", () => {
    const themeBtn = html.match(/rect\((\d+), 28\), pos\(width\(\) - (\d+), 30\)/);
    expect(themeBtn).not.toBeNull();
    const w = parseInt(themeBtn[1]);
    const off = parseInt(themeBtn[2]);
    const themeLeft = 800 - off - w / 2;
    const marqueeRight = 400 + 548 / 2;
    expect(themeLeft).toBeGreaterThan(marqueeRight);
  });

  test("the title fits inside the marquee panel", () => {
    const m = html.match(/text\("Adventures of Rufus", \{ size: (\d+) \}\)/);
    expect(m).not.toBeNull();
    const size = parseInt(m[1]);
    // Kaplay's default font is about 0.68 * size wide per character.
    const textWidth = "Adventures of Rufus".length * 0.68 * size;
    expect(textWidth).toBeLessThan(540); // inner panel width
  });
});

// ============================================================================
// 3. ARCADE CONTROL DECK — the buttons are organised, not scattered
// ============================================================================
describe("Arcade control deck", () => {
  test("there is a control deck panel along the bottom", () => {
    expect(html).toContain("ARCADE CONTROL DECK");
    expect(html).toMatch(/rect\(width\(\), 152\), pos\(0, 448\)/);
  });

  test("the controls hint is no longer hidden behind PLAY/MENU", () => {
    const btnY = parseInt(html.match(/const BTN_Y = (\d+);/)[1]);
    const hint = html.match(
      /Arrow Keys: Move & Jump \| Space: Tail Spin!", \{ size: 12 \}\),\s*\n\s*pos\(width\(\) \/ 2, (\d+)\)/
    );
    expect(hint).not.toBeNull();
    const hintY = parseInt(hint[1]);
    // PLAY/MENU are 56 tall, centred on BTN_Y -> bottom edge is BTN_Y + 28.
    expect(hintY).toBeGreaterThan(btnY + 28);
  });

  test("About / High Scores / Music are one uniform row", () => {
    expect(html).toContain("function deckButton(");
    expect(html).toMatch(/deckButton\(150,/);
    expect(html).toMatch(/deckButton\(400,/);
    expect(html).toMatch(/deckButton\(650,/);
  });

  test("every deck button stays on screen", () => {
    const deckY = parseInt(html.match(/const DECK_Y = (\d+);/)[1]);
    expect(deckY + 15).toBeLessThan(600);
    // Subscribe sits below the row and must still fit.
    const sub = html.match(/rect\(300, 26\),\s*\n\s*pos\(width\(\) \/ 2, (\d+)\)/);
    expect(sub).not.toBeNull();
    expect(parseInt(sub[1]) + 13).toBeLessThanOrEqual(600);
    expect(parseInt(sub[1]) - 13).toBeGreaterThan(deckY + 15);
  });

  test("music toggle still works from the keyboard", () => {
    expect(html).toMatch(/musicLabel\.text = muted \? "Music: OFF" : "Music: ON"/);
  });
});

// ============================================================================
// 4. RETRO TOUCHES
// ============================================================================
describe("Retro CRT feel", () => {
  test("scanlines are drawn across the screen", () => {
    expect(html).toContain("CRT SCANLINES");
    expect(html).toMatch(/for \(let sy = 0; sy < height\(\); sy \+= 4\)/);
  });

  test("scanlines are decoration only (they never eat a click)", () => {
    const block = html.slice(html.indexOf("CRT SCANLINES"));
    // The actual entity being created — not the comment above it.
    const addLine = block.match(/add\(\[ rect\(width\(\), 1\)[^\]]*\]\)/);
    expect(addLine).not.toBeNull();
    expect(addLine[0]).not.toContain("area(");
  });

  test("scanlines sit under the popups so dialogs stay crisp", () => {
    const block = html.slice(html.indexOf("CRT SCANLINES"));
    const zMatch = block.match(/z\((\d+)\)/);
    expect(parseInt(zMatch[1])).toBeLessThan(200); // dialogs are z 200+
  });
});
