// ============================================
// LEVEL 10: "Donut Doom"
// BOSS FIGHT! Mr. Donut, the pink sprinkled villain!
// Designed by Venki's son, 9 years old, candy-empire mastermind.
//
// Mechanics (per the kid's spec):
//   - Mr. Donut chases away from Rufus, gets faster the closer Rufus gets
//   - He spits CHOCOLATE SPIKES. After 10 spikes he REST for 3 seconds.
//   - During the rest, you can fire ONE LOLLIPOP LASER (X key).
//   - 3 hits to defeat him. He explodes into sprinkles.
//   - PERFECT RUN: take 0 damage from spikes -> YELLOW GEM reward!
// ============================================

const LEVEL_10 = {
  name: "Donut Doom",

  memoir: "Dear Diary, the Candy Kingdom is in ruins. The chaos has a face: MR. DONUT. Pink. Sprinkled. ANGRY. He spits chocolate spikes and won't stop running away! Good thing I brought my lollipop laser. There will be ONE chance per break to hit him. Three hits and he EXPLODES into sprinkles. And if I never get hit ONCE, the YELLOW GEM is mine. Here we go. LET'S GET 'EM, RUFUS!",

  // Pink sugar-rush sky
  skyColor: [255, 182, 220],

  // Sweet candy floor
  groundColor: [255, 140, 180],

  // Boss arena
  width: 1200,

  startLives: 5,

  playerStart: { x: 100, y: 0 },

  // Exit appears AFTER Mr. Donut is defeated
  exit: { x: 600, y: 300 },

  // Boss fight flags
  isBossFight: true,
  bossType: "mrDonut",

  // Shows the YELLOW GEM icon on this chapter's card in the level select.
  // You earn it by beating Mr. Donut without taking a single hit.
  yellowGem: true,

  // Candy platforms for dodging spikes
  platforms: [
    { x: 80,  y: 420, width: 140, height: 30 },
    { x: 480, y: 320, width: 240, height: 30 },
    { x: 980, y: 420, width: 140, height: 30 },
    { x: 220, y: 200, width: 120, height: 30 },
    { x: 860, y: 200, width: 120, height: 30 },
  ],

  treats: [
    { x: 100, y: 380 }, { x: 150, y: 380 },
    { x: 540, y: 280 }, { x: 600, y: 280 }, { x: 660, y: 280 },
    { x: 1000, y: 380 }, { x: 1050, y: 380 },
    { x: 250, y: 160 }, { x: 290, y: 160 },
    { x: 890, y: 160 }, { x: 930, y: 160 },
    { x: 300, y: 530 }, { x: 500, y: 530 }, { x: 700, y: 530 }, { x: 900, y: 530 },
  ],

  crates: [
    { x: 350, y: 535 },
    { x: 850, y: 535 },
  ],

  bounceCrates: [
    { x: 450, y: 560 },
    { x: 750, y: 560 },
  ],

  // No regular enemies — Mr. Donut IS the enemy
  enemies: [],

  // =========================================================
  // CUSTOM BOSS SETUP — just redirect to the working standalone prototype.
  // The full Mr. Donut fight (with 8-bit music, lollipop laser, sprinkle
  // explosion, yellow gem) lives in /donut-boss.html — way cleaner than
  // trying to cram it into the game engine.
  // =========================================================
  bossSetup: function(rufus, levelData) {
    // Send the player straight to the prototype
    window.location.href = './donut-boss.html';
    return; // skip the rest of the setup below

    // (Old in-game implementation left below for reference, never reached.)
    // ----- Fight state -----
    /* ORIGINAL_BODY_START */
    // ----- Fight state -----
    let donutHP = 3;
    let damageTaken = 0;
    let spikeCount = 0;
    let restTimer = 0;
    let shotUsed = false;
    let defeated = false;
    let donutDir = -1; // facing Rufus

    // Remove the exit until the boss falls
    get("exit").forEach((e) => destroy(e));

    // ----- Mr. Donut entity (pink box, decorated) -----
    const donut = add([
      rect(72, 72),
      pos(levelData.width - 220, 260),
      color(255, 95, 162),
      area(),
      anchor("center"),
      z(10),
      "donutBoss",
      { hurtFlash: 0 },
    ]);

    // Eye decoration (follows the body via onUpdate below)
    const eyeL = add([rect(10, 10), pos(0, 0), color(0, 0, 0), z(11), anchor("center")]);
    const eyeR = add([rect(10, 10), pos(0, 0), color(0, 0, 0), z(11), anchor("center")]);
    const browL = add([rect(12, 3),  pos(0, 0), color(90, 31, 51), z(11), anchor("center")]);
    const browR = add([rect(12, 3),  pos(0, 0), color(90, 31, 51), z(11), anchor("center")]);

    // Sprinkles around Mr. Donut
    const sprinkles = [];
    const sprinkleColors = [
      [255, 215, 0], [79, 195, 247], [102, 187, 106],
      [255, 82, 82], [255, 255, 255]
    ];
    for (let i = 0; i < 8; i++) {
      sprinkles.push({
        ent: add([
          rect(4, 2),
          pos(0, 0),
          color(...sprinkleColors[i % sprinkleColors.length]),
          z(11),
          anchor("center"),
        ]),
        offX: rand(-25, 25),
        offY: rand(-25, 25),
      });
    }

    // ----- HP bar -----
    const hpBG = add([
      rect(300, 22),
      pos(width() / 2 - 150, 12),
      color(40, 0, 20),
      outline(2, rgb(120, 30, 80)),
      fixed(),
      z(100),
    ]);
    const hpFill = add([
      rect(294, 16),
      pos(width() / 2 - 147, 15),
      color(255, 95, 162),
      fixed(),
      z(101),
    ]);
    add([
      text("MR. DONUT", { size: 12 }),
      pos(width() / 2, 23),
      anchor("center"),
      color(255, 255, 255),
      fixed(),
      z(102),
    ]);

    // "ATTACK NOW!" banner — toggled on during rest
    const attackBanner = add([
      text("", { size: 32 }),
      pos(width() / 2, 70),
      anchor("center"),
      color(255, 215, 0),
      outline(3, rgb(0, 0, 0)),
      fixed(),
      z(102),
    ]);

    // "FIGHT!" intro
    add([
      text("DONUT DOOM!", { size: 48 }),
      pos(width() / 2, height() / 2),
      anchor("center"),
      color(255, 95, 162),
      outline(3, rgb(0, 0, 0)),
      opacity(1),
      lifespan(2),
      fixed(),
      z(200),
    ]);

    // ----- Main update loop -----
    onUpdate(() => {
      if (defeated) return;

      // Sync decorations to donut body
      eyeL.pos.x = donut.pos.x - 12;
      eyeL.pos.y = donut.pos.y - 8;
      eyeR.pos.x = donut.pos.x + 12;
      eyeR.pos.y = donut.pos.y - 8;
      browL.pos.x = donut.pos.x - 12;
      browL.pos.y = donut.pos.y - 18;
      browR.pos.x = donut.pos.x + 12;
      browR.pos.y = donut.pos.y - 18;
      sprinkles.forEach((s) => {
        s.ent.pos.x = donut.pos.x + s.offX;
        s.ent.pos.y = donut.pos.y + s.offY;
      });

      // Hurt flash
      if (donut.hurtFlash > 0) {
        donut.hurtFlash -= dt();
        donut.color = donut.hurtFlash > 0 ? rgb(255, 255, 255) : rgb(255, 95, 162);
      }

      // Chase mechanic — back away from Rufus, faster when close
      const dist = donut.pos.x - rufus.pos.x;
      let speed = 60;
      if (dist < 280) speed = 130;
      if (dist < 180) speed = 220;

      // During rest, Mr. Donut almost stops
      if (restTimer > 0) {
        speed = 18;
        restTimer -= dt();
        if (restTimer <= 0) {
          attackBanner.text = "";
          shotUsed = false;
        } else {
          // Pulsing banner text
          attackBanner.text = shotUsed
            ? "shot used — dodge"
            : "ATTACK NOW! one shot!";
        }
      }

      donut.pos.x += speed * dt();
      // Wrap when he runs off the right edge
      if (donut.pos.x > levelData.width - 50) {
        donut.pos.x = levelData.width - 320;
      }

      // Spit chocolate spikes (only outside rest)
      if (restTimer <= 0) {
        // ~one spike per ~0.55s at 60fps
        if (Math.random() < 0.03) {
          spawnSpike(donut.pos.x - 30, donut.pos.y + rand(-10, 20));
          spikeCount++;
          if (spikeCount >= 10) {
            spikeCount = 0;
            restTimer = 3;
            shotUsed = false;
          }
        }
      }
    });

    // ----- Spike spawner -----
    function spawnSpike(sx, sy) {
      add([
        rect(22, 8),
        pos(sx, sy),
        color(61, 40, 23),
        outline(1, rgb(110, 70, 30)),
        area(),
        anchor("center"),
        opacity(1),
        move(180, 280), // 180° = left, 280 px/s
        lifespan(4),
        z(9),
        "chocSpike",
      ]);
    }

    // ----- Lollipop laser (X to shoot, only during rest, only once per rest) -----
    onKeyPress("x", () => {
      if (defeated) return;
      if (restTimer <= 0) return; // outside the window
      if (shotUsed) return;
      shotUsed = true;
      attackBanner.text = "shot used — dodge";

      // Visual: long pink candy beam
      add([
        rect(levelData.width, 14),
        pos(rufus.pos.x, rufus.pos.y - 5),
        color(255, 95, 162),
        outline(2, rgb(255, 255, 255)),
        opacity(0.9),
        lifespan(0.25),
        z(20),
      ]);

      // Muzzle flash
      add([
        rect(30, 30),
        pos(rufus.pos.x + 10, rufus.pos.y - 5),
        color(255, 255, 255),
        anchor("center"),
        opacity(0.9),
        lifespan(0.2),
        z(21),
      ]);

      // Hit detection — instant, if donut is roughly at Rufus's height
      if (Math.abs(donut.pos.y - rufus.pos.y) < 60 && donut.pos.x > rufus.pos.x) {
        donutHP--;
        donut.hurtFlash = 0.18;
        hpFill.width = 294 * Math.max(0, donutHP / 3);

        // Reaction text
        const reactions = ["OW!", "RUDE!", "NOOOO!"];
        add([
          text(reactions[3 - donutHP] || "!", { size: 28 }),
          pos(donut.pos.x, donut.pos.y - 60),
          anchor("center"),
          color(255, 215, 0),
          outline(2, rgb(0, 0, 0)),
          opacity(1),
          lifespan(1),
          z(150),
        ]);

        if (donutHP <= 0) defeatDonut();
      }
    });

    // ----- Rufus gets hit by a spike -----
    rufus.onCollide("chocSpike", (spike) => {
      destroy(spike);
      damageTaken++;
      // Trigger the game's normal hurt logic (existing in main game)
      if (typeof rufus.takeDamage === "function") rufus.takeDamage();
      else if (typeof rufus.hurt === "function") rufus.hurt();
    });

    // ----- Defeat sequence -----
    function defeatDonut() {
      defeated = true;
      attackBanner.text = "";

      // Sprinkle explosion!
      for (let i = 0; i < 80; i++) {
        const sc = sprinkleColors[i % sprinkleColors.length];
        add([
          rect(rand(4, 9), rand(4, 9)),
          pos(donut.pos.x + rand(-30, 30), donut.pos.y + rand(-30, 30)),
          color(...sc),
          opacity(1),
          lifespan(rand(0.8, 1.6)),
          move(rand(0, 360), rand(180, 500)),
          z(20),
        ]);
      }

      // Clean up Mr. Donut and his decorations
      destroy(donut);
      destroy(eyeL); destroy(eyeR);
      destroy(browL); destroy(browR);
      sprinkles.forEach((s) => destroy(s.ent));

      // Hide HP bar
      destroy(hpBG); destroy(hpFill);

      // Spawn the exit (simple green rect — the game will treat anything tagged "exit" as the goal)
      add([
        rect(40, 60),
        pos(levelData.exit.x, levelData.exit.y),
        color(0, 255, 0),
        outline(2, rgb(0, 100, 0)),
        area(),
        anchor("center"),
        z(5),
        "exit",
      ]);

      // PERFECT RUN: spawn the yellow gem
      if (damageTaken === 0) {
        // Yellow gem — a bright gold square that pulses
        const gem = add([
          rect(36, 36),
          pos(width() / 2, height() / 2),
          color(255, 215, 0),
          outline(3, rgb(255, 255, 255)),
          area(),
          anchor("center"),
          z(50),
          "yellowGem",
          { sparkleTimer: 0 },
        ]);
        // Gem sparkle effect via onUpdate (safer than loop() which may not exist)
        gem.onUpdate(() => {
          gem.sparkleTimer -= dt();
          if (gem.sparkleTimer <= 0) {
            gem.sparkleTimer = 0.3;
            for (let i = 0; i < 4; i++) {
              add([
                rect(3, 3),
                pos(gem.pos.x + rand(-20, 20), gem.pos.y + rand(-20, 20)),
                color(255, 255, 200),
                opacity(1),
                lifespan(0.4),
                z(51),
              ]);
            }
          }
        });

        add([
          text("PERFECT! YELLOW GEM!", { size: 32 }),
          pos(width() / 2, height() / 2 - 80),
          anchor("center"),
          color(255, 215, 0),
          outline(3, rgb(0, 0, 0)),
          opacity(1),
          lifespan(4),
          fixed(),
          z(150),
        ]);
        add([
          text("you took zero damage!", { size: 14 }),
          pos(width() / 2, height() / 2 - 50),
          anchor("center"),
          color(255, 255, 255),
          outline(2, rgb(0, 0, 0)),
          opacity(1),
          lifespan(4),
          fixed(),
          z(150),
        ]);
      } else {
        add([
          text("MR. DONUT DEFEATED!", { size: 36 }),
          pos(width() / 2, height() / 2 - 50),
          anchor("center"),
          color(255, 95, 162),
          outline(3, rgb(0, 0, 0)),
          opacity(1),
          lifespan(4),
          fixed(),
          z(150),
        ]);
      }
    }
  }, // end bossSetup
};
