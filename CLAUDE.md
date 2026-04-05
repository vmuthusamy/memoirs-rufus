# Adventures of Rufus 🦊

## What is this?
A 2D platformer game starring Rufus the fox (and his friends Martina, Renard, and Fiery).
Built by a 9-year-old game designer with help from Claude Code.

## How to run
Open `index.html` in a browser. That's it! No build tools needed.

## Tech
- **Kaplay** (HTML5 game framework) loaded from CDN
- Single `index.html` file for the game engine and core mechanics
- Levels are defined in `levels/` folder as simple JavaScript files

## Project structure
```
adventures-of-rufus/
├── index.html          # Game engine, sprites, and core mechanics
├── levels/             # Level definitions (this is where YOU add levels!)
│   ├── level1.js       # "The Backyard" - tutorial level
│   └── README.md       # How to create your own level
├── CLAUDE.md           # You're reading this
└── README.md           # Project info
```

## How to add a new level

Levels live in `levels/` as `.js` files. Each level is a simple object describing the map.

To add a level, either:
1. Copy an existing level file and modify it
2. Ask Claude Code: "Create a new level called [name] with [description]"

Example things to ask Claude Code:
- "Add a level with lots of high platforms and flying enemies"
- "Make a water level where Rufus has to jump across lily pads"
- "Add a boss fight at the end of level 3"
- "Make the enemies faster in level 2"
- "Add a secret area with bonus treats in level 1"

## Game mechanics
- **Arrow keys**: Move Rufus left/right
- **Up arrow**: Jump
- **Space**: Tail spin attack
- **Hold Space**: Charge violent tail attack (when unlocked)
- **Tab**: Tag team swap (when friends are unlocked)

## Combat system
- **Soft obstacles** (crates, bushes): Tail spin destroys them
- **Armored obstacles** (helmeted enemies): Jump on them first to disarm, then tail spin
- **Heavy obstacles** (boulders, metal): Need violent tail attack (unlocked later)
- **Element obstacles** (ice, metal): Need Fiery's fire tail (unlocked later)

## Characters
- **Rufus**: Orange fox with big toothy grin. Tail spin attack. Main character.
- **Martina**: Will be added later. Double jump + glide ability.
- **Renard**: Will be added later. Dash attack ability.
- **Fiery**: Will be added later. Fire tail ability.

## Level design tips
- Start easy, get harder
- Introduce one new thing per level
- Always give the player a chance to learn before testing them
- Put treats (collectibles) in interesting places to reward exploration
- Every level should be completable!

## For Claude Code
When helping with this project:
- Keep code simple and readable — a 9-year-old is learning from this
- Add comments explaining what code does in plain English
- When adding features, explain what changed and why
- Test suggestions by describing what the player will see
- Use simple variable names (foxSpeed, jumpHeight, not velocity.y)
