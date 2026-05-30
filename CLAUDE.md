# Exercise Tracker PWA — Claude Rules

This project uses Claude Code for both PM and Dev work. Rules for both roles are below.

---

# PM Agent

Role: define, document, and maintain product requirements in `docs/`.

## Responsibilities
1. **Define the product** — what it does, for whom, why
2. **Write user stories** — granular, testable, prioritized
3. **Create wireframes** — sketch layouts before dev starts
4. **Maintain the PRD** — single source of truth at `docs/prd.md`
5. **Sequence epics** — decide what gets built in which sprint

## Slash Commands

| Command | Arguments | Output |
|---------|-----------|--------|
| `/user-story` | `<epic> <feature description>` | `docs/user-stories/<epic>-<n>-<slug>.md` |
| `/wireframe` | `<screen name>` | `docs/wireframes/<screen>.md` |
| `/prd-update` | `<section and change description>` | Updated `docs/prd.md` |

For all other PM tasks (personas, roadmap, discovery plan, user story mapping): describe what you need in plain language — the rules below are enough context.

## Handoff Rules
- **Never write code.** PM work ends at `docs/`.
- Every user story must have: persona, goal, benefit, Gherkin acceptance criteria, and `data-testid` suggestions
- File naming: `docs/user-stories/<epic>-<story-number>-<slug>.md`
- When a story is ready for dev: add `status: ready` to its frontmatter
- When dev ships it: add `status: done`

## Starting a PM Session
1. Read `docs/prd.md` if it exists — don't recreate from scratch
2. Check `docs/user-stories/` for stories marked `status: ready` — are they done?
3. Identify the next epic to work on from `docs/roadmap.md`
4. Use a slash command above, or describe the task in plain language

---

# Dev Agent

Role: translate PM-defined requirements into working code in `src/`.

## Before Writing Any Code
1. Read `docs/prd.md` — understand the product vision and constraints
2. Read the relevant `docs/user-stories/<feature>.md` — only build what's specified
3. Check the story's acceptance criteria (Gherkin) — code must satisfy them
4. Use the `data-testid` values from the story — QE depends on them

## Architecture

```
src/
├── main.js              # Entry point, routing
├── components/          # UI components (one file per component)
├── styles/              # main.css (tokens + base) + <component-name>.css per component
└── utils/
    ├── db.js            # IndexedDB via idb library
    └── store.js         # App state (simple observable pattern)
```

## PWA Rules
- **Offline-first**: all reads must fall back to IndexedDB; never assume network
- **No framework**: vanilla JS only — no React, Vue, or similar
- **ES modules**: use `import/export`, no CommonJS
- **Service worker**: managed by vite-plugin-pwa — do not hand-write sw.js
- **Manifest**: configured in `vite.config.js` — do not edit `manifest.webmanifest` directly

## Code Standards

### HTML / Templates
- All interactive elements MUST have `data-testid` attributes matching the story spec
- Use semantic HTML: `<button>`, `<form>`, `<nav>`, `<main>`, `<section>`, `<article>`
- Mobile-first: design for 375px, enhance for larger screens

### CSS
- Use CSS custom properties from `src/styles/main.css` — **never hardcode colors or spacing**
- Component styles go in `src/styles/<component-name>.css` — import them in the component file
- No inline styles except for dynamic values (e.g. chart bar heights)

### JavaScript
- Pure functions wherever possible
- IndexedDB access only through `src/utils/db.js` — never call idb directly in components
- No `localStorage` — use IndexedDB for all persistence
- Error states must be handled and shown to the user (never silent failures)

### Naming
- Files: `kebab-case.js` / `kebab-case.css`
- Functions/variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- CSS classes: `kebab-case`
- `data-testid`: `kebab-case`, descriptive (e.g. `data-testid="log-workout-button"`)

## Data Model

```js
WorkoutDay   { id, name, exercises: Exercise[] }
Exercise     { id, name, sets, reps, weight }
Session      { id, date, workoutDayId, completedSets: CompletedSet[] }
CompletedSet { exerciseId, setNumber, reps, weight, restSeconds }
```

`date` is ISO 8601 string (e.g. `"2026-05-02"`). `weight` is stored as entered — no unit conversion.

## Component Pattern

```js
// src/components/example-component.js
import '../styles/example-component.css'
import { db } from '../utils/db.js'

export function renderExampleComponent(container) {
  container.innerHTML = `
    <section data-testid="example-section">
      <!-- markup here -->
    </section>
  `
  // attach event listeners
  container.querySelector('[data-testid="..."]').addEventListener(...)
}
```

## Rest Timer

Use the Wake Lock API so the screen stays on during rest periods:

```js
let wakeLock = null
async function requestWakeLock() {
  if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen')
}
async function releaseWakeLock() {
  if (wakeLock) { await wakeLock.release(); wakeLock = null }
}
```

Acquire on timer start, release on timer end or page navigation.

## Story-to-Code Checklist

Before marking a story done:
- [ ] All Gherkin `Given/When/Then` scenarios are handled
- [ ] All `data-testid` values from the story are present in the DOM
- [ ] Works offline (test by throttling network in DevTools)
- [ ] No console errors on load
- [ ] Mobile layout correct at 375px
- [ ] Story frontmatter updated: `status: done`

## Starting a Dev Session
1. Run `ls docs/user-stories/` — find stories with `status: ready`
2. Read the full story before touching any code
3. Check `src/` to understand what already exists — don't duplicate
4. Build, verify the checklist above, then mark `status: done`

## What NOT to Do
- Do not add features not in a user story
- Do not change `docs/` files (PM Agent owns those)
- Do not write Playwright tests (QE Agent owns `tests/`)
- Do not introduce npm packages without checking if vanilla JS suffices
- Do not add TypeScript — keep it plain JS

---

# Project Context

**Product:** Exercise Tracker PWA
**Users:** People who want to log workouts, track progress, and stay consistent
**Platform:** Progressive Web App (mobile-first, works offline)
**Tech stack:** Vanilla JS, Vite, vite-plugin-pwa, IndexedDB, Playwright

**Core epics:**
1. Workout Logging — log exercises, sets, reps, weight
2. Exercise Library — browse/search built-in exercises
3. Progress Tracking — charts and history
4. Routine Builder — create and reuse workout templates
5. Offline Support — full functionality without internet

**Constraints:**
- Mobile-first: design for 375px width first
- Offline-capable: every feature must work without a network
- No login required for MVP — local storage/IndexedDB only
- Accessibility: WCAG 2.1 AA minimum
