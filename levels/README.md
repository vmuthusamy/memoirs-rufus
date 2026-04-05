# How to Create a Level 🦊

Want to add a new adventure for Rufus? It's easy!

## Step 1: Create a new file

Make a new file in this folder called `level3.js` (or whatever number is next).

## Step 2: Copy this template and change it!

```javascript
const LEVEL_3 = {
  // Give your level a cool name!
  name: "The Spooky Forest",

  // Write a diary entry for Rufus
  memoir: "Dear Diary, I found a dark forest today...",

  // Sky color [red, green, blue] - each number is 0 to 255
  skyColor: [50, 50, 80],

  // Ground color
  groundColor: [40, 80, 20],

  // How long is the level?
  width: 3200,

  // Where does Rufus start?
  playerStart: { x: 100, y: 0 },

  // Where is the exit flag?
  exit: { x: 3050, y: 300 },

  // PLATFORMS - things Rufus can stand on
  // { x, y, width, height }
  platforms: [
    { x: 400, y: 450, width: 150, height: 30 },
  ],

  // TREATS - yummy things to collect!
  // { x, y }
  treats: [
    { x: 300, y: 530 },
  ],

  // CRATES - smash them with tail spin!
  // { x, y }
  crates: [
    { x: 500, y: 535 },
  ],

  // ENEMIES
  // type: "walker" = basic enemy, tail spin works
  // type: "armored" = jump on first to remove helmet, then tail spin
  // patrol = how far they walk back and forth
  enemies: [
    { type: "walker", x: 800, y: 535, patrol: 100 },
    { type: "armored", x: 1500, y: 535, patrol: 80 },
  ],
};
```

## Step 3: Add it to the game

Open `index.html` and add two things:

1. Near the top, add a script tag to load your level:
```html
<script src="levels/level3.js"></script>
```

2. Find the line that says `const ALL_LEVELS = [LEVEL_1, LEVEL_2]` and add your level:
```javascript
const ALL_LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3];
```

## Tips for great levels

- **Start easy** - put some treats near the start so the player feels good
- **Teach then test** - show a new enemy alone first, then combine with others
- **Reward explorers** - put treats in hard-to-reach places
- **Don't be too mean!** - make sure the player can always see where to go

## Fun ideas to try

- A level with TONS of crates to smash
- A level with only armored enemies
- A really tall level with lots of vertical platforms
- A short but really hard level
- A level where treats spell out a word!

## Need help?

Just ask Claude Code! Try saying things like:
- "Make me a level with lots of armored enemies and high platforms"
- "Create an underwater-themed level"
- "Add more treats to level 2"
