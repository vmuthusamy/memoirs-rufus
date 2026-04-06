# How to Create Your Own Level

## Quick Start

1. Copy `template.js` and rename it (like `level5.js`)
2. Change the level name, story, colors, and everything inside
3. Wire it up in `index.html` (instructions are at the bottom of the template)
4. Open `index.html` in your browser and play!

## Understanding the Grid

The game screen is **800 pixels wide** and **600 pixels tall**.
Levels scroll sideways, so they can be thousands of pixels wide!

```
y = 0    +-----------------------+  TOP
         |                       |
y = 200  |   wasps fly here      |
         |                       |
y = 350  |   platforms go here   |
         |                       |
y = 530  |   treats on ground    |
y = 560  | ===================== |  GROUND
y = 600  +-----------------------+  BOTTOM
```

Rufus can jump about **200 pixels up** and **250 pixels across**.
So don't put platforms further apart than that!

## What Goes in a Level

| Thing          | What it does                           | Where to put y |
|----------------|----------------------------------------|----------------|
| **platforms**  | Rufus stands and jumps on these        | 200 - 500      |
| **treats**     | Berries to collect (10 points each)    | 530 (ground) or 40 above a platform |
| **crates**     | Smash with tail spin!                  | 535             |
| **bounceCrates** | Spring crate - super high jump!      | 560             |
| **checkpoints** | Save point if Rufus dies              | 560             |
| **enemies**    | The bad guys (see types below)         | depends on type |

## Enemy Types

| Type            | What it does                              | y position |
|-----------------|-------------------------------------------|------------|
| `"walker"`      | Walks back and forth. Tail spin to defeat | 535 (ground) or platform y minus 25 |
| `"armored"`     | Has a helmet! Jump on it first, then spin | 535 (ground) or platform y minus 25 |
| `"wasp_patrol"` | Flies in a wave pattern                   | 200 - 300 (in the air) |
| `"wasp_dive"`   | Dives at Rufus when close! Scary!         | 150 - 200 (high up) |

## Colors Cheat Sheet

Sky colors to try:
- `[135, 206, 235]` - blue sky
- `[20, 20, 60]` - night
- `[255, 150, 100]` - sunset
- `[200, 195, 185]` - cloudy/indoor

Ground colors to try:
- `[34, 139, 34]` - green grass
- `[160, 120, 60]` - wood floor
- `[100, 100, 120]` - stone
- `[200, 180, 140]` - sand

## Tips for Great Levels

- **Start easy** - give the player room to breathe at the beginning
- **Teach then test** - show a new enemy alone, then combine with others
- **Reward explorers** - put treats in hard-to-reach places
- **Use comments** - write notes with `//` so you remember what things do
- **Experiment!** - change numbers and refresh your browser to see what happens

## How to Experiment

The fastest way to learn is to **change one number and see what happens**:

1. Open your level file in VS Code
2. Change a platform's `y` from `400` to `200` (moves it way up!)
3. Save the file
4. Refresh your browser
5. See the difference!

Try changing:
- A platform's `y` to make it higher or lower
- An enemy's `patrol` to make it walk further
- The `skyColor` to change the whole mood
- Add `speed: 100` to an armored enemy to make it faster

You literally cannot break anything. If the level doesn't load,
check for missing commas or typos - VS Code will underline errors in red.
