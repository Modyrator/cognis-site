# Cognis Archive: Interactive Memory Fragment Puzzle Site

A browser-based narrative experience that combines interactive storytelling, secret unlocks, and encrypted continuity logs. Built with **HTML**, **CSS**, and **[Alpine.js](https://alpinejs.dev/)** for lightweight interactivity and logic handling.

---

## Project Structure

/project-root
│
├── index.html # Main archive access page
├── styles.css # Global site styling
├── puzzle.js # Puzzle logic (Alpine component)
├── ModyAxiomArtifact/
│ └── index.html # Soul Engine Puzzle page
├── Continuity7/
│ └── index.html # Continuity Code 7 story + keyword puzzle
├── FaydricTomaixPersistence/
│ └── index.html # future story entry

---

## How It Works

### Puzzle Mechanism

Users encounter interactive input fields and hidden terminals. Access to deeper logs is gated by:

- Correct **passphrase entry** (e.g. “modyaxiomartifact”)
- Solving **in-universe puzzles**
- Clicking specific **keywords in narrative text** in the right sequence

### Continuity Access Logic

The puzzle logic is modular and defined in `puzzle.js`. Phrases and answers are hidden from page source (as much as possible on the client side).

### Alpine.js Powers:

- Puzzle logic
- Conditional rendering
- Transition effects
- Input validation

---

## Installation & Usage

1. Clone or download the repo
2. Open `index.html` in your browser
3. Navigate the story, solve puzzles, and uncover secrets

> No backend required. Entirely static and lightweight.

---

## Features

- Fully responsive layout
- Hidden content reveal system
- Clickable keyword puzzles
- Expandable puzzle system (easy to add more)
- Styled with mechanical/terminal aesthetic
- Written for narrative immersion

---

## Future Ideas

- Add audio logs
- Timed unlocks
- Save progress

---

## Created By

Modyrator
