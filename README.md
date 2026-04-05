# Adventures of Rufus - Memoirs of a Fox

A 2D platformer game starring **Rufus**, a happy-go-loving fox from Germany with a legendary toothy grin and a tail that can take out anything in his path.

**Play it now:** [https://vmuthusamy.github.io/memoirs-rufus/](https://vmuthusamy.github.io/memoirs-rufus/)

---

## The Story

Rufus is a fox who belongs to **yellowtictac** (his human master's secret identity on the interweb). When he's not brushing his teeth, creating art, or playing with his fox friends Martina, Renard, and Fiery, Rufus goes on adventures through his neighborhood — battling helmet-wearing squirrels, smashing crates, and collecting tasty treats.

Each level is a chapter from Rufus's personal diary. Play through his memoirs and help him survive the backyard, the neighborhood, and beyond!

## How to Play

### On Computer (Keyboard)

| Key | Action |
|-----|--------|
| Left / Right Arrow | Move Rufus |
| Up Arrow | Jump |
| Space | Tail Spin Attack |
| Enter | Select / Confirm |
| Escape | Go back |
| A | About Rufus |
| 1, 2, ... | Select level from journal |

### On iPad / Phone (Touch)

Touch controls appear automatically on mobile devices:

| Button | Location | Action |
|--------|----------|--------|
| **<** | Bottom-left | Move left |
| **>** | Bottom-left | Move right |
| **UP** | Bottom-right (blue) | Jump |
| **SPIN** | Bottom-right (orange) | Tail Spin Attack |

Tap anywhere on menu screens to navigate.

## Combat System

Rufus has a powerful tail spin attack, but not every enemy goes down the same way:

### Soft Obstacles (Crates & Walker Squirrels)
Walk up and hit **SPIN** — Rufus's tail takes them out in one hit. Crates explode into wood fragments and walkers go poof!

### Armored Squirrels (Helmeted Enemies)
These tough guys have helmets. If you try to tail spin them, Rufus bounces back with sparks flying!

**How to beat them:**
1. **Jump** on their head first — the helmet pops off with a satisfying clank!
2. They become dazed (dizzy eyes, stars above their head)
3. Now **tail spin** them to finish the job

### Bounce Crates (Green Crates)
These green crates with an upward arrow are your friends — they don't break! Jump on them for a **super boost** to reach high platforms. Great for getting back up if you fall.

## Levels

### Chapter 1: The Backyard
*"Dear Diary, today I discovered the backyard is full of surprises!"*

Rufus's first adventure. Learn to move, jump, and tail spin. Walker squirrels patrol the ground AND the platforms. Smash through crates and collect berries.

### Chapter 2: The Neighborhood
*"The neighborhood squirrels have HELMETS now!"*

A longer, harder level with armored enemies. Features a high-road / low-road choice — take the high road for more treats but tougher enemies. Squirrels patrol the platforms too, so nowhere is safe!

## Creating Your Own Levels

Levels are simple JavaScript files in the `levels/` folder. See `levels/README.md` for a complete guide.

**Quick start:** Copy `levels/level1.js`, rename it to `level3.js`, and start changing the numbers!

Or ask Claude Code to help:
- *"Create a level with lots of high platforms and armored enemies"*
- *"Make a spooky night level with dark colors"*
- *"Add a boss fight at the end"*

After creating your level file, add it to `index.html`:
1. Add `<script src="levels/level3.js"></script>` near the top
2. Add `LEVEL_3` to the `ALL_LEVELS` array

## Project Structure

```
adventures-of-rufus/
├── index.html           # Game engine, sprites, mechanics, and scenes
├── levels/
│   ├── level1.js        # Chapter 1: The Backyard
│   ├── level2.js        # Chapter 2: The Neighborhood
│   └── README.md        # How to create your own levels
├── CLAUDE.md            # Instructions for Claude Code collaboration
└── README.md            # You're reading this!
```

## Tech Stack

- **[Kaplay](https://kaplayjs.com/)** (formerly Kaboom.js) — HTML5 game framework
- **Vanilla JavaScript** — no build tools, no dependencies
- **Pixel art** — all sprites are drawn with code (canvas API)
- **GitHub Pages** — free hosting, just open in a browser

No install required. No build step. Just open `index.html` and play.

## Characters

- **Rufus** — Orange fox with a big toothy grin. Main character. Tail spin attack. Originally from Germany.
- **Martina** — *Coming soon.* Double jump + glide ability.
- **Renard** — *Coming soon.* Dash attack ability.
- **Fiery** — *Coming soon.* Fire tail ability for burning through ice and metal.

## Roadmap

- [ ] Violent tail attack (charged power move)
- [ ] Tag team — swap between fox friends mid-level
- [ ] More levels and worlds (The Forest, The Mountain, The Volcano)
- [ ] Boss fights
- [ ] Sound effects and music
- [ ] Custom pixel art sprites
- [ ] Daily challenge mode

## Running Locally

```bash
# Clone the repo
git clone git@github.com:vmuthusamy/memoirs-rufus.git
cd memoirs-rufus

# Open in browser - that's it!
open index.html
```

## Credits

Built with love by **yellowtictac** and Rufus, with help from Claude Code.

*Ich bin ein glucklicher Fuchs!* 🦊
