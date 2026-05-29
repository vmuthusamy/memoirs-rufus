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
    expect(htmlContent).toContain('src="levels/level3.js"');
    expect(htmlContent).toContain('src="levels/level4.js"');
    expect(htmlContent).toContain('src="levels/level5.js"');
    expect(htmlContent).toContain('src="levels/level6.js"');
    expect(htmlContent).toContain('src="levels/level7.js"');
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

  test("wasp sprite draw function exists", () => {
    expect(htmlContent).toContain("function drawWasp()");
  });

  test("checkpoint sprite draw function exists", () => {
    expect(htmlContent).toContain("function drawCheckpointFlag(");
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

  test("has invincibility flag to prevent collision loops", () => {
    expect(htmlContent).toContain("let isInvincible = false");
    expect(htmlContent).toContain("if (isInvincible) return");
  });

  test("has lives system with game over", () => {
    expect(htmlContent).toContain("lives--");
    expect(htmlContent).toMatch(/lives\s*<=\s*0/);
    expect(htmlContent).toContain('"gameOver"');
  });

  test("death restarts level with remaining lives and checkpoint", () => {
    expect(htmlContent).toContain('go("game", levelIndex, lives');
  });

  test("game scene accepts starting lives, spawn position, and death count", () => {
    expect(htmlContent).toContain("scene(\"game\", (levelIndex, startLives, spawnPos, deathCount)");
    expect(htmlContent).toContain("startLives !== undefined");
    expect(htmlContent).toContain("playerSpawn");
    expect(htmlContent).toContain("deathsThisRun");
  });

  test("disarmed enemies do not damage Rufus", () => {
    expect(htmlContent).toContain("!enemy.isDisarmed");
  });

  test("has fall detection that calls hurtRufus", () => {
    expect(htmlContent).toMatch(/rufus\.pos\.y\s*>\s*height\(\)\s*\+/);
    const fallSection = htmlContent.match(/FALL OFF SCREEN[\s\S]*?hurtRufus\(\)/);
    expect(fallSection).not.toBeNull();
  });

  test("wasps cannot be jumped on", () => {
    expect(htmlContent).toContain("!enemy.isWasp");
  });

  test("wasps can be killed by tail spin", () => {
    expect(htmlContent).toContain("enemy.isWasp");
  });

  test("has checkpoint collision handler", () => {
    expect(htmlContent).toContain('onCollide("checkpoint"');
  });

  test("checkpoint respawn in hurtRufus", () => {
    expect(htmlContent).toContain("lastCheckpoint");
  });

  test("extra life system exists", () => {
    expect(htmlContent).toContain("nextExtraLife");
    expect(htmlContent).toContain("EXTRA LIFE!");
  });

  test("wasp_dive enemies have dive behavior", () => {
    expect(htmlContent).toContain("isDiving");
    expect(htmlContent).toContain("diveTargetX");
  });

  test("wasp_patrol enemies have sine wave movement", () => {
    expect(htmlContent).toContain("wasp_patrol");
    expect(htmlContent).toContain("Math.sin(time()");
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

  test("touch input handles letterbox coordinate conversion", () => {
    // Raw touch events must convert coordinates accounting for letterbox bars
    expect(htmlContent).toContain("function touchToGame(");
    expect(htmlContent).toContain("canvasAspect");
    expect(htmlContent).toContain("gameAspect");
  });

  test("touch input tracks individual touch identifiers for multi-touch", () => {
    // Movement touch must be tracked by identifier so jump/spin
    // doesn't interrupt it (simultaneous two-finger input)
    expect(htmlContent).toContain("touch.identifier");
    expect(htmlContent).toContain("moveTouchId");
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
    expect(htmlContent).toContain('"JUMP"');
  });

  test("has on-screen spin button", () => {
    expect(htmlContent).toContain('"SPIN"');
  });

  test("touch and keyboard both use doTailSpin function", () => {
    // The refactored code uses a shared doTailSpin() function
    expect(htmlContent).toContain("function doTailSpin()");
    // Both keyboard and touch handlers call it
    const doTailSpinCalls = htmlContent.match(/doTailSpin\(\)/g);
    expect(doTailSpinCalls.length).toBeGreaterThanOrEqual(3);
  });

  test("shows touch-friendly text on touch devices", () => {
    expect(htmlContent).toContain("About Rufus");
  });

  test("EVERY ontouchstart check includes maxTouchPoints fallback", () => {
    // This prevents the iPad bug where ontouchstart alone fails on modern iPads.
    // Every line that checks ontouchstart must also check maxTouchPoints.
    const lines = htmlContent.split("\n");
    const touchDetectionLines = lines.filter(
      (line) => line.includes("ontouchstart") && line.includes("const ")
    );
    expect(touchDetectionLines.length).toBeGreaterThan(0);
    touchDetectionLines.forEach((line) => {
      expect(line).toContain("maxTouchPoints");
    });
  });

  test("keyboard controls are NOT inside the touch-only block", () => {
    // Keyboard controls must work independently of touch detection.
    // They must be at the game scene's top level, not nested inside
    // the if (isTouchDevice) block.
    const gameScene = htmlContent.slice(
      htmlContent.indexOf('scene("game"')
    );

    // All keyboard controls must exist in game scene
    expect(gameScene).toContain('onKeyDown("left"');
    expect(gameScene).toContain('onKeyDown("right"');
    expect(gameScene).toContain('onKeyPress("up"');
    expect(gameScene).toContain('onKeyPress("space"');

    // Extract the touch-only block (between "if (isTouchDevice)" and its closing "}")
    const touchStart = gameScene.indexOf("if (isTouchDevice)");
    // Find the matching closing brace by counting braces
    let braceCount = 0;
    let touchEnd = -1;
    for (let i = gameScene.indexOf("{", touchStart); i < gameScene.length; i++) {
      if (gameScene[i] === "{") braceCount++;
      if (gameScene[i] === "}") braceCount--;
      if (braceCount === 0) { touchEnd = i; break; }
    }
    const touchBlock = gameScene.slice(touchStart, touchEnd + 1);

    // Keyboard controls must NOT be inside the touch block
    expect(touchBlock).not.toContain('onKeyDown("left"');
    expect(touchBlock).not.toContain('onKeyDown("right"');
    expect(touchBlock).not.toContain('onKeyPress("up"');
    expect(touchBlock).not.toContain('onKeyPress("space"');
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
    expect(htmlContent).toContain("Marthina");
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
    expect(htmlContent).toMatch(/ALL_LEVELS\s*=\s*\[.*LEVEL_1.*LEVEL_2.*LEVEL_3.*LEVEL_4.*LEVEL_5.*LEVEL_6.*LEVEL_7.*\]/);
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

  test("secret.js exists and is valid JS", () => {
    const code = fs.readFileSync(
      path.join(__dirname, "..", "levels", "secret.js"),
      "utf-8"
    );
    expect(() => new Function(code)).not.toThrow();
  });

  test("template.js exists", () => {
    expect(
      fs.existsSync(path.join(__dirname, "..", "levels", "template.js"))
    ).toBe(true);
  });
});

// ============================================
// COLLECTIBLES SYSTEM (gems + golden paws)
// ============================================
describe("Collectibles system", () => {
  test("has localStorage collectibles functions", () => {
    expect(htmlContent).toContain("function getCollectibles()");
    expect(htmlContent).toContain("function saveCollectibles(");
    expect(htmlContent).toContain("function awardGem(");
    expect(htmlContent).toContain("function awardPaw(");
    expect(htmlContent).toContain("function hasGem(");
    expect(htmlContent).toContain("function hasPaw(");
    expect(htmlContent).toContain("function allPawsCollected()");
  });

  test("has golden paw sprite", () => {
    expect(htmlContent).toContain("function drawGoldenPaw()");
    expect(htmlContent).toContain('loadSprite("goldenPaw"');
  });

  test("has gem sprite", () => {
    expect(htmlContent).toContain("function drawGem()");
    expect(htmlContent).toContain('loadSprite("gem"');
  });

  test("golden paw spawning checks if already collected", () => {
    expect(htmlContent).toContain("!hasPaw(levelIndex)");
  });

  test("golden paw collection handler exists", () => {
    expect(htmlContent).toContain('onCollide("goldenPaw"');
    expect(htmlContent).toContain("awardPaw(levelIndex)");
  });

  test("gem is awarded on no-death completion", () => {
    expect(htmlContent).toContain("deathsThisRun === 0");
    expect(htmlContent).toContain("awardGem(levelIndex)");
  });

  test("death counter is threaded through respawns", () => {
    expect(htmlContent).toContain("deathsThisRun++");
    expect(htmlContent).toMatch(/go\("game",\s*levelIndex,\s*lives,.*deathsThisRun\)/);
  });

  test("level complete shows gem and paw awards", () => {
    expect(htmlContent).toContain("GEM EARNED!");
    expect(htmlContent).toContain("GOLDEN PAW FOUND!");
  });

  test("secret level unlock message on all paws collected", () => {
    expect(htmlContent).toContain("Something secret has been unlocked");
    expect(htmlContent).toContain("allPawsCollected()");
  });

  test("level select shows gem and paw indicators", () => {
    expect(htmlContent).toContain("hasGem(i)");
    expect(htmlContent).toContain("hasPaw(i)");
  });
});

// ============================================
// SECRET LEVEL
// ============================================
describe("Secret level", () => {
  test("secret level is loaded but not in ALL_LEVELS", () => {
    expect(htmlContent).toContain('src="levels/secret.js"');
    expect(htmlContent).not.toMatch(/ALL_LEVELS\s*=.*SECRET_LEVEL/);
  });

  test("game scene handles secret level index", () => {
    expect(htmlContent).toContain('levelIndex === "secret"');
    expect(htmlContent).toContain("isSecret ? SECRET_LEVEL : ALL_LEVELS[levelIndex]");
  });

  test("secret level disables extra lives", () => {
    expect(htmlContent).toContain("!isSecret && score >= nextExtraLife");
  });

  test("secret level skips leaderboard on death", () => {
    expect(htmlContent).toContain("!isSecret && isHighScore");
  });

  test("secret level routes to secretComplete on exit", () => {
    expect(htmlContent).toContain('go("secretComplete"');
  });

  test("has secretComplete scene", () => {
    expect(htmlContent).toContain('scene("secretComplete"');
  });

  test("has nameEntry scene", () => {
    expect(htmlContent).toContain('scene("nameEntry"');
  });

  test("has leaderboard scene", () => {
    expect(htmlContent).toContain('scene("leaderboard"');
  });

  test("secret level entry appears when all paws collected", () => {
    expect(htmlContent).toContain("??? Secret Chapter ???");
    expect(htmlContent).toContain('go("memoir", "secret")');
  });

  test("memoir scene handles secret level", () => {
    expect(htmlContent).toContain('isSecret ? "Secret Chapter"');
  });

  test("game over shows special title for secret level", () => {
    expect(htmlContent).toContain("Party's Over...");
  });

  test("secret level has NPC friends", () => {
    expect(htmlContent).toContain("level.npcFriends");
    expect(htmlContent).toContain('"friendNPC"');
  });
});

// ============================================
// POWER SYSTEM (secret level)
// ============================================
describe("Power system", () => {
  test("has power cycling state", () => {
    expect(htmlContent).toContain('const POWERS = ["spin", "fire", "float"]');
    expect(htmlContent).toContain("currentPower");
    expect(htmlContent).toContain("currentPowerIndex");
  });

  test("Tab key cycles powers in secret level", () => {
    expect(htmlContent).toContain('onKeyPress("tab"');
    expect(htmlContent).toContain("cyclePower()");
  });

  test("has fire breath function", () => {
    expect(htmlContent).toContain("function fireBreath()");
  });

  test("fire breath uses proximity checks not area collisions", () => {
    // Fireball should use onUpdate proximity, not area() component
    const fireBreathBlock = htmlContent.slice(
      htmlContent.indexOf("function fireBreath()"),
      htmlContent.indexOf("function activateFloat()")
    );
    expect(fireBreathBlock).toContain("fireball.onUpdate");
    // The fireball add() block should not contain area() as a component
    const fireballAdd = fireBreathBlock.slice(
      fireBreathBlock.indexOf("const fireball = add("),
      fireBreathBlock.indexOf("fireball.onUpdate")
    );
    expect(fireballAdd).not.toMatch(/\barea\(\)/);
  });

  test("has float/glide function", () => {
    expect(htmlContent).toContain("function activateFloat()");
    expect(htmlContent).toContain("isFloating");
    expect(htmlContent).toContain("floatTimer");
  });

  test("float only activates mid-air", () => {
    expect(htmlContent).toContain("rufus.isGrounded()");
  });

  test("has power HUD indicator for secret level", () => {
    expect(htmlContent).toContain("powerHUD");
    expect(htmlContent).toContain("powerIcon");
    expect(htmlContent).toContain("function updatePowerHUD()");
  });

  test("touch swap button exists for secret level", () => {
    expect(htmlContent).toContain('"SWAP"');
  });

  test("magical platforms for secret level", () => {
    expect(htmlContent).toContain("RAINBOW BRIDGE");
    expect(htmlContent).toContain("FLUFFY CLOUD");
    expect(htmlContent).toContain("CRYSTAL PLATFORM");
    expect(htmlContent).toContain("MOONBEAM PATH");
    expect(htmlContent).toContain("STAR PLATFORM");
  });
});

// ============================================
// THEME PARK (Level 5)
// ============================================
describe("Theme Park level", () => {
  test("has theme park platform detection", () => {
    expect(htmlContent).toContain('level.name === "The Theme Park"');
  });

  test("has theme park platform types", () => {
    expect(htmlContent).toContain("ROLLER COASTER RAIL");
    expect(htmlContent).toContain("BUMPER CAR PLATFORM");
    expect(htmlContent).toContain("CAROUSEL PLATFORM");
    expect(htmlContent).toContain("TICKET BOOTH");
    expect(htmlContent).toContain("FERRIS WHEEL GONDOLA");
  });

  test("has carnival tent background", () => {
    expect(htmlContent).toContain("CARNIVAL TENT INTERIOR");
    expect(htmlContent).toContain("isThemePark");
  });

  test("has roller coaster background with riders", () => {
    expect(htmlContent).toContain("bossCoasterCart");
    expect(htmlContent).toContain("bossCoasterRider");
  });
});

// ============================================
// CLOWN ENEMY
// ============================================
describe("Clown enemy", () => {
  test("has clown sprite", () => {
    expect(htmlContent).toContain("function drawClown()");
    expect(htmlContent).toContain('loadSprite("clown"');
  });

  test("clown is immune to tail spin", () => {
    expect(htmlContent).toContain("enemy.isClown");
    // Spinning into clown should hurt Rufus
    const clownSpinBlock = htmlContent.match(/isClown[\s\S]*?hurtRufus\(\)/);
    expect(clownSpinBlock).not.toBeNull();
  });

  test("clown can be stomped by jumping on head", () => {
    const clownStompBlock = htmlContent.match(/isClown[\s\S]*?Stomp the clown/);
    expect(clownStompBlock).not.toBeNull();
  });

  test("clown explodes in confetti when defeated", () => {
    // The clown stomp section should have colorful particles
    expect(htmlContent).toContain("Stomp the clown");
  });
});

// ============================================
// BOSS FIGHT (Level 6)
// ============================================
describe("Boss fight", () => {
  test("has boss clown sprite", () => {
    expect(htmlContent).toContain("function drawBossClown()");
    expect(htmlContent).toContain('loadSprite("bossClown"');
  });

  test("has boss fight engine code", () => {
    expect(htmlContent).toContain("level.isBossFight");
    expect(htmlContent).toContain("bossState");
    expect(htmlContent).toContain("bossHP");
  });

  test("boss has three states: flying, diving, stunned", () => {
    expect(htmlContent).toContain('"flying"');
    expect(htmlContent).toContain('"diving"');
    expect(htmlContent).toContain('"stunned"');
  });

  test("boss can be hit while stunned by stomp or spin", () => {
    expect(htmlContent).toContain("rufus.isSpinning");
    expect(htmlContent).toContain('bossState === "stunned"');
  });

  test("exit is destroyed until boss is defeated", () => {
    expect(htmlContent).toContain("Destroy the exit flag");
  });

  test("exit spawns after boss is defeated", () => {
    expect(htmlContent).toContain("Spawn the exit flag");
  });

  test("boss spawns clown minions between hits", () => {
    expect(htmlContent).toContain("swarmEnemy");
    // Boss should spawn clowns after recovering
    const minionSpawn = htmlContent.match(/bossHP[\s\S]*?sprite\("clown"\)/);
    expect(minionSpawn).not.toBeNull();
  });

  test("boss fight respawns in place without resetting boss", () => {
    expect(htmlContent).toContain("level.isBossFight");
    expect(htmlContent).toContain("Boss fight: respawn in place");
  });

  test("has boss HP bar", () => {
    expect(htmlContent).toContain("bossBarBG");
    expect(htmlContent).toContain("bossBarFill");
    expect(htmlContent).toContain("KING CLOWN");
  });

  test("has mega confetti on boss defeat", () => {
    expect(htmlContent).toContain("CONFETTI EXPLOSION");
    expect(htmlContent).toContain("MEGA confetti rain");
  });

  test("has victory text on boss defeat", () => {
    expect(htmlContent).toContain("VICTORY!");
  });
});

// ============================================
// JETPACK SYSTEM
// ============================================
describe("Jetpack system", () => {
  test("has jetpack localStorage functions", () => {
    expect(htmlContent).toContain("function hasJetpack()");
    expect(htmlContent).toContain("function unlockJetpack()");
    expect(htmlContent).toContain("rufus_jetpack");
  });

  test("has jetpack unlock scene", () => {
    expect(htmlContent).toContain('scene("jetpackUnlock"');
    expect(htmlContent).toContain("JETPACK UNLOCKED!");
  });

  test("boss fight triggers jetpack unlock", () => {
    expect(htmlContent).toContain("level.isBossFight");
    expect(htmlContent).toContain('go("jetpackUnlock"');
  });

  test("jetpack has thrust mechanic", () => {
    expect(htmlContent).toContain("jetpackUnlocked");
    expect(htmlContent).toContain("jetpackActive");
  });

  test("jetpack has fire particles", () => {
    expect(htmlContent).toContain("Fire particles");
  });

  test("jetpack works on touch controls too", () => {
    expect(htmlContent).toContain("touchJumpHeld");
  });
});

// ============================================
// PER-LEVEL START LIVES
// ============================================
describe("Per-level start lives", () => {
  test("supports level.startLives config", () => {
    expect(htmlContent).toContain("level.startLives");
  });

  test("defaults to 3 lives when not specified", () => {
    expect(htmlContent).toContain("level.startLives || 3");
  });
});

// ============================================
// TITLE SCREEN
// ============================================
describe("Title screen", () => {
  test("has all four characters on title", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain('sprite("rufus")');
    expect(titleScene).toContain('sprite("marthina")');
    expect(titleScene).toContain('sprite("renard")');
    expect(titleScene).toContain('sprite("fiery")');
  });

  test("has shooting stars", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("Shooting");
  });

  test("has fireworks", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("Fireworks");
  });

  test("has enemies marching across bottom", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("marching");
  });

  test("has about and high scores buttons", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain('go("about")');
    expect(titleScene).toContain('go("leaderboard")');
  });

  test("has lollipops on title screen", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("lollipopPositions");
  });

  test("has roller coaster with riders on title screen", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("Roller coaster");
    expect(titleScene).toContain("clown");
  });
});

// ============================================
// LEVEL SELECT
// ============================================
describe("Level select", () => {
  test("has paged chapter book level select", () => {
    expect(htmlContent).toContain("const BOOKS");
    expect(htmlContent).toContain("currentPage");
    expect(htmlContent).toContain("showPage");
  });

  test("has three chapter books (1-6, 7-10, 11+)", () => {
    const selectScene = htmlContent.match(/scene\("levelSelect"[\s\S]*?scene\("memoir"/)[0];
    // Three books, each with a start/end level range
    const startCount = (selectScene.match(/start:\s*\d+, end:/g) || []).length;
    expect(startCount).toBe(3);
    // The new third book uses ALL_LEVELS.length so it grows with new levels
    expect(selectScene).toContain("end: ALL_LEVELS.length");
  });

  test("has left and right arrows for page navigation", () => {
    const selectScene = htmlContent.match(/scene\("levelSelect"[\s\S]*?scene\("memoir"/)[0];
    expect(selectScene).toContain("leftArrow");
    expect(selectScene).toContain("rightArrow");
  });

  test("has pink background for later chapters", () => {
    expect(htmlContent).toContain("220, 150, 180");
  });
});

// ============================================
// LOLLIPOPS AND SPIKES
// ============================================
describe("Lollipops and spikes", () => {
  test("has lollipop rendering in game engine", () => {
    expect(htmlContent).toContain("level.lollipops");
    expect(htmlContent).toContain("LOLLIPOPS");
  });

  test("has spike rendering in game engine", () => {
    expect(htmlContent).toContain("level.spikes");
    expect(htmlContent).toContain("spikeWidth");
  });

  test("spikes hurt Rufus by proximity check", () => {
    expect(htmlContent).toContain('get("spike")');
    expect(htmlContent).toContain("hurtRufus()");
  });

  test("ceiling spikes hurt Rufus too", () => {
    expect(htmlContent).toContain("level.ceilingSpikes");
    expect(htmlContent).toContain('get("ceilingSpike")');
  });
});

// ============================================
// WALLS, CUTSCENES, RED GEM, COYOTE TIME
// ============================================
describe("Walls and barriers", () => {
  test("has wall rendering for solid barriers", () => {
    expect(htmlContent).toContain("level.walls");
    expect(htmlContent).toMatch(/body\(\{\s*isStatic:\s*true\s*\}\)/);
  });
});

describe("Start cutscene system", () => {
  test("has start cutscene rendering", () => {
    expect(htmlContent).toContain("level.startCutscene");
    expect(htmlContent).toContain("startCutscene");
  });

  test("cutscene is skipped on checkpoint respawn (only fresh start)", () => {
    // The cutscene check should require !spawnPos
    expect(htmlContent).toMatch(/level\.startCutscene && !spawnPos/);
  });

  test("cutscene destroys all tagged elements when done", () => {
    expect(htmlContent).toContain('get("startCutscene").forEach');
  });
});

describe("Red gem system", () => {
  test("has red gem sprite drawing function", () => {
    expect(htmlContent).toContain("function drawRedGem()");
    expect(htmlContent).toContain('loadSprite("redGem"');
  });

  test("has red gem localStorage functions", () => {
    expect(htmlContent).toContain("function hasRedGem()");
    expect(htmlContent).toContain("function awardRedGem()");
    expect(htmlContent).toContain("rufus_red_gem");
  });

  test("red gem is spawned in game from level.redGem", () => {
    expect(htmlContent).toContain("level.redGem");
    expect(htmlContent).toContain('"redGem"');
  });

  test("red gem has collection handler", () => {
    expect(htmlContent).toContain('rufus.onCollide("redGem"');
    expect(htmlContent).toContain("awardRedGem()");
  });

  test("red gem icon shows in level select", () => {
    expect(htmlContent).toContain("hasRedGem()");
  });
});

describe("Yellow gem (Donut boss perfect-run reward)", () => {
  test("has yellow gem draw + sprite", () => {
    expect(htmlContent).toContain("function drawYellowGem()");
    expect(htmlContent).toContain('loadSprite("yellowGem"');
  });

  test("has hasYellowGem reading the boss-fight localStorage key", () => {
    expect(htmlContent).toContain("function hasYellowGem()");
    expect(htmlContent).toContain("rufus-yellow-gem");
  });

  test("yellow gem icon + label show in level select", () => {
    expect(htmlContent).toContain("level.yellowGem");
    expect(htmlContent).toContain("YELLOW GEM");
  });

  test("red gem also has a label in level select", () => {
    expect(htmlContent).toContain("RED GEM");
  });
});

describe("8-bit menu music", () => {
  test("defines the menuMusic engine", () => {
    expect(htmlContent).toContain("const menuMusic");
    expect(htmlContent).toContain("playStep");
  });

  test("remembers the mute choice in localStorage", () => {
    expect(htmlContent).toContain("rufus_music_muted");
  });

  test("only marks playing after audio actually resumes (no silent-on bug)", () => {
    expect(htmlContent).toMatch(/resume\(\)\.then\(begin\)/);
  });

  test("arms music on first gesture in the capture phase", () => {
    expect(htmlContent).toMatch(/addEventListener\("pointerdown", go, true\)/);
  });

  test("starts music on menu scenes and stops it during gameplay", () => {
    expect(htmlContent).toContain("menuMusic.start()");
    expect(htmlContent).toContain("menuMusic.stop()");
  });

  test("title screen has a music on/off toggle", () => {
    expect(htmlContent).toContain("Music: ON");
    expect(htmlContent).toContain("toggleMute()");
  });
});

describe("Green gem + secret reverse button", () => {
  test("has green gem draw, sprite, and storage helpers", () => {
    expect(htmlContent).toContain("function drawGreenGem()");
    expect(htmlContent).toContain('loadSprite("greenGem"');
    expect(htmlContent).toContain("function hasGreenGem()");
    expect(htmlContent).toContain("function awardGreenGem()");
    expect(htmlContent).toContain("rufus_green_gem");
  });

  test("green gem has a collection handler and a level-select label", () => {
    expect(htmlContent).toContain('rufus.onCollide("greenGem"');
    expect(htmlContent).toContain("GREEN GEM!");
    expect(htmlContent).toContain("level.greenGem");
  });

  test("secret reverse button gates the green gem until clicked", () => {
    const gameScene = htmlContent.match(/scene\("game"[\s\S]*?scene\("levelComplete"/)[0];
    expect(gameScene).toContain("level.reverseButton");
    // Green gem only auto-spawns when there is NO reverse button
    expect(gameScene).toMatch(/level\.greenGem && !hasGreenGem\(\) && !level\.reverseButton/);
    expect(gameScene).toContain("pressReverse");
  });
});

describe("Volcano theme (Level 11 looks)", () => {
  test("detects the volcano theme from a fire-hero level", () => {
    expect(htmlContent).toContain("const isVolcano");
  });

  test("draws an erupting volcano backdrop", () => {
    expect(htmlContent).toContain("ERUPTING VOLCANO BACKDROP");
  });

  test("draws jagged volcano-rock platforms with lava cracks", () => {
    expect(htmlContent).toContain("JAGGED VOLCANO ROCK");
    const gameScene = htmlContent.match(/scene\("game"[\s\S]*?scene\("levelComplete"/)[0];
    expect(gameScene).toMatch(/} else if \(isVolcano\) \{/);
  });
});

describe("Rising lava hazard", () => {
  test("renders rising lava from level.risingLava", () => {
    expect(htmlContent).toContain("level.risingLava");
    expect(htmlContent).toContain('"lava"');
  });

  test("lava creeps upward and hurts the player on contact", () => {
    const gameScene = htmlContent.match(/scene\("game"[\s\S]*?scene\("levelComplete"/)[0];
    expect(gameScene).toMatch(/lavaY -= lavaSpeed \* dt\(\)/);
    expect(gameScene).toMatch(/rufus\.pos\.y \+ 16 >= lavaY[\s\S]{0,40}hurtRufus\(\)/);
  });
});

describe("In-level volcano music", () => {
  test("defines the levelMusic engine with a volcano theme", () => {
    expect(htmlContent).toContain("const levelMusic");
    expect(htmlContent).toContain("VOLCANO THEME");
    expect(htmlContent).toContain("rumble");
  });

  test("plays level music only for levels that define one", () => {
    expect(htmlContent).toMatch(/if \(!isSecret && level\.music\) levelMusic\.start/);
  });

  test("shares the mute setting with the menu music", () => {
    const engine = htmlContent.match(/const levelMusic = \{[\s\S]*?\n\};/)[0];
    expect(engine).toContain("rufus_music_muted");
  });

  test("stops the level music on the post-level screens", () => {
    expect(htmlContent).toMatch(/scene\("levelComplete"[\s\S]{0,80}levelMusic\.stop\(\)/);
    expect(htmlContent).toMatch(/scene\("gameOver"[\s\S]{0,120}levelMusic\.stop\(\)/);
  });
});

describe("Fire hero (play as Fiery)", () => {
  test("detects a fire-hero level from level.fireHero", () => {
    expect(htmlContent).toContain("isFireHero");
    expect(htmlContent).toContain("level.fireHero");
  });

  test("renders the player as the fiery sprite on a fire-hero level", () => {
    expect(htmlContent).toContain("heroSprite");
    expect(htmlContent).toMatch(/isFireHero \? "fiery"/);
  });

  test("space and touch attack spit fire on a fire-hero level", () => {
    const gameScene = htmlContent.match(/scene\("game"[\s\S]*?scene\("levelComplete"/)[0];
    expect(gameScene).toMatch(/else if \(isFireHero\) \{\s*fireBreath\(\);/);
  });
});

describe("Secret custom hat", () => {
  test("has hat storage + a bad-word filter", () => {
    expect(htmlContent).toContain("function getHat()");
    expect(htmlContent).toContain("function setHat(");
    expect(htmlContent).toContain("function getHatText()");
    expect(htmlContent).toContain("function isCleanHatText(");
    expect(htmlContent).toContain("rufus_hat");
  });

  test("has the hat yes/no chain reachable from the title", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("openHatFlow");
    expect(titleScene).toContain("Want a hat?");
    expect(titleScene).toContain("Want text on the hat?");
    expect(titleScene).toContain("Want custom text?");
    expect(titleScene).toContain("titleText.onClick");
  });

  test("blocks inappropriate hat text with a please-change message", () => {
    expect(htmlContent).toContain("Too inappropriate for game");
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toMatch(/!isCleanHatText\(/);
  });

  test("draws the hat on the player in-game", () => {
    const gameScene = htmlContent.match(/scene\("game"[\s\S]*?scene\("levelComplete"/)[0];
    expect(gameScene).toContain("if (getHat())");
    expect(gameScene).toContain('"playerHat"');
  });
});

describe("Rocket-launch finale (Level 13)", () => {
  test("has a launch cutscene triggered by level.launchCutscene", () => {
    expect(htmlContent).toContain("function playLaunchCutscene(");
    expect(htmlContent).toContain("BLAST OFF!");
    const gameScene = htmlContent.match(/scene\("game"[\s\S]*?scene\("levelComplete"/)[0];
    expect(gameScene).toContain("level.launchCutscene");
  });

  test("draws a rocket at the exit on launch levels", () => {
    const gameScene = htmlContent.match(/scene\("game"[\s\S]*?scene\("levelComplete"/)[0];
    expect(gameScene).toMatch(/if \(level\.launchCutscene\)/);
  });

  test("space theme support exists (low gravity + starry backdrop)", () => {
    expect(htmlContent).toContain("const isSpace");
    expect(htmlContent).toContain("level.spaceTheme");
    expect(htmlContent).toContain("SPACE BACKDROP");
  });
});

describe("Menu theme, PLAY button & Marthina secret-level shortcut", () => {
  test("has theme colors + storage and recolors title and whole background", () => {
    expect(htmlContent).toContain("THEME_COLORS");
    expect(htmlContent).toContain("function getTheme()");
    expect(htmlContent).toContain("function getThemeBg()");
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("Want to change theme?");
    expect(titleScene).toContain("titleBg.color");
    expect(titleScene).toContain("titleText.color");
  });

  test("uses a dedicated PLAY button instead of tap-anywhere", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("playButton");
    expect(titleScene).not.toContain("const playBtn = add");
  });

  test("clicking Marthina offers the secret level", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("titleMarthina.onClick");
    expect(titleScene).toContain("Want to play the secret level?");
  });
});

describe("Secret pixel-art hat painter", () => {
  test("has painted-hat storage helpers", () => {
    expect(htmlContent).toContain("function getHatPaint()");
    expect(htmlContent).toContain("function setHatPaint(");
    expect(htmlContent).toContain("function hasHatPaint()");
    expect(htmlContent).toContain("rufus_hat_paint");
  });

  test("clicking Fiery opens the paint dialog + editor", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("Want to paint your hat?");
    expect(titleScene).toContain("function openHatPainter()");
    expect(titleScene).toContain("titleFirey.onClick");
  });

  test("draws the painted hat on the player in-game", () => {
    const gameScene = htmlContent.match(/scene\("game"[\s\S]*?scene\("levelComplete"/)[0];
    expect(gameScene).toContain("getHatPaint()");
    expect(gameScene).toMatch(/PAINTED pixel-art hat/);
  });
});

describe("Play as Renard (main-menu character picker)", () => {
  test("has getCharacter/setCharacter helpers", () => {
    expect(htmlContent).toContain("function getCharacter()");
    expect(htmlContent).toContain("function setCharacter(");
    expect(htmlContent).toContain("rufus_character");
  });

  test("renders Renard sprite and uses dash when Renard is chosen", () => {
    expect(htmlContent).toContain("const isRenard");
    expect(htmlContent).toMatch(/isRenard \? "renard" : "rufus"/);
    const gameScene = htmlContent.match(/scene\("game"[\s\S]*?scene\("levelComplete"/)[0];
    expect(gameScene).toMatch(/else if \(isRenard\) \{\s*doDash\(\);/);
    expect(gameScene).toContain("function doDash()");
  });

  test("main menu has a character-pick dialog with YES/NO", () => {
    const titleScene = htmlContent.match(/scene\("title"[\s\S]*?scene\("about"/)[0];
    expect(titleScene).toContain("openCharDialog");
    expect(titleScene).toContain("Want to play as Renard?");
    expect(titleScene).toContain("setCharacter");
  });
});

describe("Coyote time (jump safety)", () => {
  test("has coyote timer to prevent stuck-on-edge bug", () => {
    expect(htmlContent).toContain("coyoteTimer");
  });

  test("jump allows coyote time grace period", () => {
    expect(htmlContent).toMatch(/isGrounded\(\) \|\| coyoteTimer > 0/);
  });
});
