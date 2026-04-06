// ============================================
// YOUR LEVEL TEMPLATE
// Copy this file and rename it to level5.js (or whatever number is next)
// Then change everything below to make YOUR level!
// ============================================

// IMPORTANT: Change "LEVEL_5" to match your file number!
// If your file is level5.js, use LEVEL_5
// If your file is level6.js, use LEVEL_6
const LEVEL_5 = {

  // ---- THE BASICS ----

  // Give your level a cool name (this shows in the journal)
  name: "My Awesome Level",

  // Write Rufus's diary entry for this chapter
  // This shows on the story screen before the level starts
  memoir: "Dear Diary, today I found a mysterious place...",

  // Sky color: [red, green, blue] - each number goes from 0 to 255
  // Try these:
  //   [135, 206, 235] = nice blue sky (daytime)
  //   [20, 20, 60]    = dark night sky
  //   [255, 150, 100]  = sunset orange
  //   [200, 195, 185] = cloudy/indoor gray
  skyColor: [135, 206, 235],

  // Ground color: [red, green, blue]
  // Try these:
  //   [34, 139, 34]   = green grass
  //   [80, 160, 50]   = lighter grass
  //   [160, 120, 60]  = wooden floor
  //   [100, 70, 40]   = dark wood
  groundColor: [34, 139, 34],

  // How wide is your level in pixels?
  // Short level: 2000   Medium: 3500   Long: 5000   Epic: 6000+
  width: 3500,

  // Where does Rufus start? (x = how far right, y = 0 means he drops from top)
  playerStart: { x: 100, y: 0 },

  // Where is the exit flag? Put it near the end of your level
  // x should be close to your width number, y around 300
  exit: { x: 3350, y: 300 },


  // ---- CHECKPOINTS (optional) ----
  // If Rufus dies, he restarts here instead of the beginning!
  // Put these about 1/3 and 2/3 through your level
  // Delete this section if you don't want checkpoints
  checkpoints: [
    { x: 1200, y: 560 },
    { x: 2400, y: 560 },
  ],


  // ---- PLATFORMS ----
  // Things Rufus can stand on and jump between
  // x = how far right, y = how far down (0 = top, 560 = near ground)
  // width = how wide, height = how tall (30 is normal)
  //
  // THE GAME SCREEN:
  //   Top:    y = 0
  //   Middle: y = 300
  //   Ground: y = 560
  //   Left edge: x = 0
  //
  // TIPS:
  //   - Don't put platforms too far apart or Rufus can't jump to them!
  //   - Rufus can jump about 200 pixels up and 250 pixels across
  //   - Mix high and low platforms to make it interesting
  platforms: [
    // Starting area - easy jumps to learn
    { x: 300, y: 450, width: 150, height: 30 },
    { x: 550, y: 380, width: 130, height: 30 },
    { x: 800, y: 320, width: 160, height: 30 },

    // Middle section - getting harder
    { x: 1100, y: 400, width: 120, height: 30 },
    { x: 1350, y: 300, width: 140, height: 30 },
    { x: 1600, y: 350, width: 130, height: 30 },

    // End section
    { x: 1900, y: 280, width: 150, height: 30 },
    { x: 2200, y: 380, width: 160, height: 30 },
    { x: 2500, y: 300, width: 140, height: 30 },
    { x: 2800, y: 350, width: 180, height: 30 },
    { x: 3100, y: 400, width: 150, height: 30 },
  ],


  // ---- TREATS ----
  // Berries for Rufus to collect! (10 points each)
  // Put them on platforms (about 40 pixels above the platform y)
  // or on the ground (y: 530)
  treats: [
    // On platforms
    { x: 350, y: 410 },
    { x: 600, y: 340 },
    { x: 850, y: 280 },
    { x: 1150, y: 360 },
    { x: 1400, y: 260 },

    // On the ground (y: 530 = ground level for treats)
    { x: 200, y: 530 },
    { x: 450, y: 530 },
    { x: 700, y: 530 },
    { x: 1000, y: 530 },

    // Cluster at the end (feels rewarding!)
    { x: 3200, y: 530 }, { x: 3230, y: 530 }, { x: 3260, y: 530 },
  ],


  // ---- CRATES ----
  // Smashable wooden crates! Rufus can tail-spin to break them
  // Always put crates on the ground: y: 535
  crates: [
    { x: 400, y: 535 },
    { x: 900, y: 535 },
    { x: 1500, y: 535 },
    { x: 2100, y: 535 },
    { x: 2700, y: 535 },
  ],


  // ---- BOUNCE CRATES (optional) ----
  // Green springy crates! Rufus bounces SUPER high off these
  // Great for reaching high platforms
  // Always put on the ground: y: 560
  // Delete this section if you don't want any
  bounceCrates: [
    { x: 500, y: 560 },
    { x: 1800, y: 560 },
  ],


  // ---- ENEMIES ----
  // The bad guys! Different types have different behaviors:
  //
  // "walker"       = squirrel that walks back and forth
  //                  Rufus can tail-spin to defeat it
  //
  // "armored"      = squirrel with a helmet!
  //                  Jump on it FIRST to knock off the helmet, THEN tail-spin
  //                  You can add speed: 80 to make it faster (default is 60)
  //
  // "wasp_patrol"  = wasp that flies in a wave pattern
  //                  Tail-spin to swat it! Put y around 200-300 (up high)
  //
  // "wasp_dive"    = wasp that DIVES at Rufus when he gets close!
  //                  Much scarier! Put y around 150-200 (very high up)
  //
  // patrol = how far they walk/fly back and forth (in pixels)
  // Ground enemies: y: 535    Platform enemies: y = platform's y - 25
  enemies: [
    // Some ground walkers
    { type: "walker", x: 600, y: 535, patrol: 100 },
    { type: "walker", x: 1200, y: 535, patrol: 80 },

    // An armored squirrel (harder!)
    { type: "armored", x: 1800, y: 535, patrol: 70 },

    // A wasp flying around
    { type: "wasp_patrol", x: 1000, y: 250, patrol: 120 },

    // A walker on a platform (put y about 25 above the platform)
    // Example: platform at y:320, so enemy at y:295
    { type: "walker", x: 850, y: 295, patrol: 40 },
  ],
};


// ============================================
// WIRING CHECKLIST (do these steps in index.html):
//
// 1. Near the top, add a script tag to load your level:
//      <script src="levels/level5.js"></script>
//
// 2. Find this line:
//      const ALL_LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3];
//    And add yours:
//      const ALL_LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5];
//
// 3. Open index.html in your browser and play!
//
// EXPERIMENT! Change numbers, add more enemies, move
// platforms around, and refresh your browser to see
// what happens. You can't break anything - just have fun!
// ============================================
