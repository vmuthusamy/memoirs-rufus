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
│   ├── level2.js       # "The Neighborhood" - armored enemies
│   ├── level3.js       # "The School Gym" - wasps!
│   ├── template.js     # COPY THIS to make a new level!
│   └── README.md       # How to create your own level
├── CLAUDE.md           # You're reading this
└── README.md           # Project info
```

## How to add a new level

**Start here: `levels/template.js`** — it has a ready-to-copy level with comments explaining every piece.

1. Copy `levels/template.js` to a new file like `levels/level5.js`
2. Change the variable name from `LEVEL_5` to match your file number
3. Edit the name, story, platforms, enemies, and everything inside
4. Wire it into `index.html` (instructions at the bottom of the template)
5. Open `index.html` in your browser and play!

See `levels/README.md` for the full grid guide, enemy types, and color cheat sheet.

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
The primary user of this project is a 9-year-old learning to code. When helping:
- **Teach, don't just do** — explain what each piece does so they learn
- **Point to the template first** — if they want a new level, show them `levels/template.js` and help them modify it rather than generating a whole level from scratch
- **Keep code simple** — use plain variable names and add comments in plain English
- **Encourage experiments** — suggest they change one number and refresh to see what happens
- **Describe what they'll see** — "this makes the platform higher" is better than "this changes the y coordinate"
- If they ask "how do I make a level", point them to `levels/README.md` and `levels/template.js`
- If they ask for a tour, walk them through `levels/level1.js` line by line explaining what each part does
