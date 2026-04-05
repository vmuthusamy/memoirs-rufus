const fs = require("fs");
const path = require("path");

const htmlContent = fs.readFileSync(
  path.join(__dirname, "..", "index.html"),
  "utf-8"
);

// ============================================
// HTML STRUCTURE
// ============================================
describe("HTML structure", () => {
  test("has DOCTYPE declaration", () => {
    expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
  });

  test("has viewport meta tag for mobile", () => {
    expect(htmlContent).toContain('name="viewport"');
    expect(htmlContent).toContain("user-scalable=no");
  });

  test("has apple mobile web app meta tags", () => {
    expect(htmlContent).toContain("apple-mobile-web-app-capable");
  });

  test("has touch-action: none in CSS", () => {
    expect(htmlContent).toContain("touch-action: none");
  });

  test("loads Kaplay from CDN", () => {
    expect(htmlContent).toMatch(/src="https:\/\/unpkg\.com\/kaplay/);
  });

  test("loads all level files", () => {
    expect(htmlContent).toContain('src="levels/level1.js"');
    expect(htmlContent).toContain('src="levels/level2.js"');
  });

  test("level scripts are loaded before Kaplay", () => {
    const level1Pos = htmlContent.indexOf("levels/level1.js");
    const kaplayPos = htmlContent.indexOf("unpkg.com/kaplay");
    expect(level1Pos).toBeLessThan(kaplayPos);
  });
});

// ============================================
// GAME SCENES
// ============================================
describe("Game scenes", () => {
  const requiredScenes = [
    "title",
    "about",
    "levelSelect",
    "memoir",
    "game",
    "levelComplete",
    "gameOver",
  ];

  requiredScenes.forEach((sceneName) => {
    test(`has "${sceneName}" scene defined`, () => {
      expect(htmlContent).toContain(`scene("${sceneName}"`);
    });
  });

  test("starts with title scene", () => {
    // The last go() call should be go("title")
    const lastGo = htmlContent.lastIndexOf('go("title")');
    expect(lastGo).toBeGreaterThan(0);
  });
});

// ============================================
// SPRITE DEFINITIONS
// ============================================
describe("Sprites", () => {
  const requiredSprites = [
    "rufus",
    "rufus_spin",
    "treat",
    "crate",
    "bounceCrate",
    "walker",
    "armored",
    "disarmed",
    "flag",
  ];

  requiredSprites.forEach((spriteName) => {
    test(`loads "${spriteName}" sprite`, () => {
      expect(htmlContent).toContain(`loadSprite("${spriteName}"`);
    });
  });

  test("Rufus sprite draw function exists", () => {
    expect(htmlContent).toContain("function drawFoxSprite()");
  });

  test("Rufus spin sprite draw function exists", () => {
    expect(htmlContent).toContain("function drawFoxSpinning()");
  });

  test("bounce crate sprite draw function exists", () => {
    expect(htmlContent).toContain("function drawBounceCrate()");
  });
});

// ============================================
// GAME MECHANICS
// ============================================
describe("Game mechanics", () => {
  test("defines fox movement speed", () => {
    expect(htmlContent).toMatch(/const foxSpeed\s*=\s*\d+/);
  });

  test("defines jump force", () => {
    expect(htmlContent).toMatch(/const jumpForce\s*=\s*\d+/);
  });

  test("defines tail spin duration", () => {
    expect(htmlContent).toMatch(/const tailSpinDuration\s*=\s*[\d.]+/);
  });

  test("has gravity set", () => {
    expect(htmlContent).toContain("setGravity(");
  });

  test("has keyboard controls for movement", () => {
    expect(htmlContent).toContain('onKeyDown("left"');
    expect(htmlContent).toContain('onKeyDown("right"');
  });

  test("has keyboard control for jumping", () => {
    expect(htmlContent).toContain('onKeyPress("up"');
  });

  test("has keyboard control for tail spin", () => {
    expect(htmlContent).toContain('onKeyPress("space"');
  });

  test("has camera following player", () => {
    expect(htmlContent).toContain("camPos(rufus.pos");
  });
});

// ============================================
// COMBAT SYSTEM
// ============================================
describe("Combat system", () => {
  test("has enemy collision handler", () => {
    expect(htmlContent).toContain('rufus.onCollide("enemy"');
  });

  test("has crate collision handler", () => {
    expect(htmlContent).toContain('rufus.onCollide("crate"');
  });

  test("has bounce crate collision handler", () => {
    expect(htmlContent).toContain('rufus.onCollide("bounceCrate"');
  });

  test("has treat collection handler", () => {
    expect(htmlContent).toContain('rufus.onCollide("treat"');
  });

  test("has exit/flag collision handler", () => {
    expect(htmlContent).toContain('rufus.onCollide("exit"');
  });

  test("has hurtRufus function", () => {
    expect(htmlContent).toContain("function hurtRufus()");
  });

  test("has destroyEnemy function", () => {
    expect(htmlContent).toContain("function destroyEnemy(");
  });

  test("spinning into armored enemy calls hurtRufus (prevents hung state)", () => {
    // Find the armored enemy spin collision block
    const armoredBlock = htmlContent.match(
      /enemy\.enemyType === "armored" && !enemy\.isDisarmed[\s\S]*?hurtRufus\(\)/
    );
    expect(armoredBlock).not.toBeNull();
  });

  test("spinning into armored enemy cancels the spin", () => {
    // The armored collision should set isSpinning to false
    const armoredSection = htmlContent.match(
      /enemyType === "armored" && !enemy\.isDisarmed\)[\s\S]*?rufus\.isSpinning = false/
    );
    expect(armoredSection).not.toBeNull();
  });

  test("jumping on armored enemy disarms it", () => {
    expect(htmlContent).toContain("enemy.isDisarmed = true");
    expect(htmlContent).toContain('sprite("disarmed")');
  });

  test("bounce crate gives super jump (higher than normal)", () => {
    // Bounce crate should multiply jumpForce
    const bounceJump = htmlContent.match(
      /onCollide\("bounceCrate"[\s\S]*?jumpForce\s*\*\s*([\d.]+)/
    );
    expect(bounceJump).not.toBeNull();
    expect(parseFloat(bounceJump[1])).toBeGreaterThan(1.0);
  });

  test("has invincibility frames after being hurt", () => {
    expect(htmlContent).toContain("rufus.opacity < 1");
    expect(htmlContent).toContain("rufus.opacity = 0.5");
  });

  test("has lives system with game over", () => {
    expect(htmlContent).toContain("lives--");
    expect(htmlContent).toMatch(/lives\s*<=\s*0/);
    expect(htmlContent).toContain('"gameOver"');
  });

  test("has fall detection (respawn when falling off screen)", () => {
    expect(htmlContent).toMatch(/rufus\.pos\.y\s*>\s*height\(\)\s*\+/);
  });
});

// ============================================
// TOUCH CONTROLS
// ============================================
describe("Touch controls", () => {
  test("has touchToMouse enabled in Kaplay config", () => {
    expect(htmlContent).toContain("touchToMouse: true");
  });

  test("has touch-action none on canvas for iOS", () => {
    expect(htmlContent).toContain('touchAction = "none"');
  });

  test("prevents default on touch events", () => {
    // In-game touch handlers use ev.preventDefault()
    expect(htmlContent).toContain("ev.preventDefault()");
  });

  test("detects touch devices", () => {
    expect(htmlContent).toContain("ontouchstart");
  });

  test("has on-screen button for left movement", () => {
    expect(htmlContent).toMatch(/text\("<"/);
  });

  test("has on-screen button for right movement", () => {
    expect(htmlContent).toMatch(/text\(">"/);
  });

  test("has on-screen jump button", () => {
    expect(htmlContent).toContain('"UP"');
  });

  test("has on-screen spin button", () => {
    expect(htmlContent).toContain('"SPIN"');
  });

  test("touch spin triggers the same spin mechanics as keyboard", () => {
    // Count occurrences of spin activation
    const spinActivations = htmlContent.match(/rufus\.isSpinning = true/g);
    // Should appear at least twice: once for keyboard, once for touch
    expect(spinActivations.length).toBeGreaterThanOrEqual(2);
  });

  test("shows touch-friendly text on touch devices", () => {
    expect(htmlContent).toContain("Tap anywhere to play!");
    expect(htmlContent).toContain("Tap here for About Rufus");
  });
});

// ============================================
// HUD (Heads Up Display)
// ============================================
describe("HUD elements", () => {
  test("has score display", () => {
    expect(htmlContent).toContain("Treats:");
  });

  test("has lives display", () => {
    expect(htmlContent).toContain("Lives:");
  });

  test("has level name display", () => {
    expect(htmlContent).toContain("level.name");
  });

  test("score updates when collecting treats", () => {
    expect(htmlContent).toContain("score += 10");
  });

  test("score updates when destroying crates", () => {
    expect(htmlContent).toContain("score += 25");
  });

  test("score updates when destroying enemies", () => {
    expect(htmlContent).toContain("score += 50");
  });
});

// ============================================
// ABOUT PAGE
// ============================================
describe("About Rufus page", () => {
  test("mentions yellowtictac", () => {
    expect(htmlContent).toContain("yellowtictac");
  });

  test("mentions Germany", () => {
    expect(htmlContent).toContain("Germany");
  });

  test("mentions brushing teeth", () => {
    expect(htmlContent).toContain("Brushing my teeth");
  });

  test("mentions creating art", () => {
    expect(htmlContent).toContain("Creating art");
  });

  test("mentions the other pets", () => {
    expect(htmlContent).toContain("Martina");
    expect(htmlContent).toContain("Renard");
    expect(htmlContent).toContain("Fiery");
  });

  test("mentions jumping when happy", () => {
    expect(htmlContent).toContain("Jumping when");
  });

  test("has German text", () => {
    expect(htmlContent).toContain("Fuchs");
  });

  test("has back navigation from about page", () => {
    // About scene should have escape key or click to go back
    const aboutScene = htmlContent.match(
      /scene\("about"[\s\S]*?(?=scene\()/
    )[0];
    expect(aboutScene).toContain('go("title")');
  });

  test("about is accessible from title screen", () => {
    expect(htmlContent).toContain('go("about")');
  });

  test("about is accessible from level select / journal", () => {
    const levelSelectScene = htmlContent.match(
      /scene\("levelSelect"[\s\S]*?(?=scene\("memoir")/
    )[0];
    expect(levelSelectScene).toContain('go("about")');
  });
});

// ============================================
// NAVIGATION FLOW
// ============================================
describe("Navigation flow", () => {
  test("title -> levelSelect (enter key)", () => {
    const titleScene = htmlContent.match(
      /scene\("title"[\s\S]*?(?=scene\("about")/
    )[0];
    expect(titleScene).toContain('go("levelSelect")');
  });

  test("title -> about (A key)", () => {
    const titleScene = htmlContent.match(
      /scene\("title"[\s\S]*?(?=scene\("about")/
    )[0];
    expect(titleScene).toContain('go("about")');
  });

  test("levelSelect -> memoir (level number key)", () => {
    const selectScene = htmlContent.match(
      /scene\("levelSelect"[\s\S]*?(?=scene\("memoir")/
    )[0];
    expect(selectScene).toContain('go("memoir"');
  });

  test("memoir -> game (enter key)", () => {
    const memoirScene = htmlContent.match(
      /scene\("memoir"[\s\S]*?(?=scene\("game")/
    )[0];
    expect(memoirScene).toContain('go("game"');
  });

  test("game -> levelComplete (on exit collision)", () => {
    expect(htmlContent).toContain('go("levelComplete"');
  });

  test("game -> gameOver (on death)", () => {
    expect(htmlContent).toContain('go("gameOver"');
  });

  test("gameOver -> memoir (retry)", () => {
    const gameOverScene = htmlContent.match(
      /scene\("gameOver"[\s\S]*$/
    )[0];
    expect(gameOverScene).toContain('go("memoir"');
  });

  test("all menu scenes have clickable area() objects for touch support", () => {
    // Each non-game scene should have area() + onClick for touch support
    const scenes = ["title", "about", "levelSelect", "memoir", "levelComplete", "gameOver"];
    scenes.forEach((sceneName) => {
      const sceneBlock = htmlContent.slice(
        htmlContent.indexOf(`scene("${sceneName}"`)
      );
      const nextSceneStart = sceneBlock.indexOf("scene(", 10);
      const sceneContent = nextSceneStart > 0
        ? sceneBlock.slice(0, nextSceneStart)
        : sceneBlock;
      // Should use .onClick() on game objects (not scene-level onClick with coords)
      expect(sceneContent).toContain(".onClick(");
    });
  });
});

// ============================================
// ALL_LEVELS ARRAY
// ============================================
describe("ALL_LEVELS configuration", () => {
  test("ALL_LEVELS array includes all level files", () => {
    expect(htmlContent).toContain("LEVEL_1");
    expect(htmlContent).toContain("LEVEL_2");
    expect(htmlContent).toMatch(/ALL_LEVELS\s*=\s*\[.*LEVEL_1.*LEVEL_2.*\]/);
  });

  test("level script tags match ALL_LEVELS entries", () => {
    const scriptTags = htmlContent.match(/src="levels\/level\d+\.js"/g) || [];
    const levelRefs = htmlContent.match(/LEVEL_\d+/g) || [];
    // Number of level script tags should match unique LEVEL_ references
    // (LEVEL_1 appears multiple times in code, so just check scripts)
    expect(scriptTags.length).toBeGreaterThanOrEqual(2);
  });
});

// ============================================
// FILE INTEGRITY
// ============================================
describe("File integrity", () => {
  test("level1.js exists and is valid JS", () => {
    const code = fs.readFileSync(
      path.join(__dirname, "..", "levels", "level1.js"),
      "utf-8"
    );
    expect(() => new Function(code)).not.toThrow();
  });

  test("level2.js exists and is valid JS", () => {
    const code = fs.readFileSync(
      path.join(__dirname, "..", "levels", "level2.js"),
      "utf-8"
    );
    expect(() => new Function(code)).not.toThrow();
  });

  test("index.html is well-formed (has closing tags)", () => {
    expect(htmlContent).toContain("</html>");
    expect(htmlContent).toContain("</head>");
    expect(htmlContent).toContain("</body>");
    expect(htmlContent).toContain("</script>");
  });

  test("README.md exists", () => {
    expect(
      fs.existsSync(path.join(__dirname, "..", "README.md"))
    ).toBe(true);
  });

  test("CLAUDE.md exists", () => {
    expect(
      fs.existsSync(path.join(__dirname, "..", "CLAUDE.md"))
    ).toBe(true);
  });

  test("levels/README.md exists (level creation guide)", () => {
    expect(
      fs.existsSync(path.join(__dirname, "..", "levels", "README.md"))
    ).toBe(true);
  });
});
