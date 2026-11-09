# FLEXLOG: Exercise Tracker PWA
#### Video Demo:  <URL HERE>
#### Description:

FLEXLOG is a mobile-first Progressive Web App (PWA) for people who train at the gym and want a simple, reliable way to plan their workouts. The idea came from a problem I kept running into: at the gym I would forget which exercises I planned to do, how many sets I wanted, and what my routine for the day even was. Notes apps and paper logs work, but they are slow to use mid-workout and give you no structure. Most fitness apps go the other way: they are heavy, require an account, and break when the gym has no signal.

FLEXLOG focuses on the first piece of that problem: **building and managing workout routines**. You can browse and search a built-in exercise library, add exercises to a routine, set target sets and reps for each one, name and save the routine, and then come back later to view, edit, or delete it. Everything is stored on your device in IndexedDB, so the app works fully offline and no login is needed. Because it is a PWA, it can be installed on a phone's home screen and behaves like a native app.

### How to run it

```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build (service worker active)
```

The project also includes a `Dockerfile` and `nginx.conf` that build the app and serve it as a static site, plus a GitHub Actions workflow (`.github/workflows/ci.yml`) that builds the app and checks the Docker image on every push.

### Features

- **Home screen.** First-time users see a welcome screen that guides them into building their first routine. Once routines exist, the home screen greets them and links to their saved routines.
- **Exercise library.** A searchable list of 20 built-in exercises grouped by muscle (chest, back, shoulders, legs, arms), each with color-coded muscle chips.
- **Routine builder.** Name a routine, add exercises from the library, and adjust sets and reps with +/− steppers or by typing a number. Validation stops you from saving a routine without a name or without exercises.
- **Saved routines.** Each routine card shows its name, the muscle groups it focuses on, the number of exercises, and the total number of sets.
- **Edit and delete.** Tap a routine to edit it in place, or delete it from the card or the edit view. Destructive actions ask for confirmation first.
- **Discard protection.** Leaving a routine with unsaved content asks whether you want to discard it.
- **Context-aware floating action button.** One shared button changes its icon and action based on where you are: "build a routine" on Home and on the routines list, "done adding exercises" while picking exercises.
- **Offline and installable.** A service worker caches the app shell, and all data lives in IndexedDB.

### Project structure and files

- **`index.html`**: the single HTML page. It contains one root `<div id="app">` and loads `src/main.js` as an ES module.
- **`src/main.js`**: the entry point. It builds the app shell (header, main content area, bottom navigation, and floating action button) and contains a small **hash-based router** that maps `#/`, `#/library`, `#/history`, and `#/settings` to screen render functions. Screens are loaded with dynamic `import()`, so each one is its own code chunk. Each navigation gets an incrementing token, so if a slow navigation is overtaken by a newer one, the stale one is dropped instead of overwriting the screen. If a screen fails to load, an error message with a Retry button is shown instead of a blank page.
- **`src/utils/db.js`**: the only module that talks to IndexedDB, through the small `idb` library. It creates two object stores (`exercises` and `routines`), adds the built-in exercises the first time the database is opened, and exports functions like `getAllExercises`, `searchExercises`, `saveRoutine`, `getAllRoutines`, and `deleteRoutine`.
- **`src/utils/store.js`**: a minimal observable store. It holds UI state that must survive moving between screens: the routine draft being built or edited, the active Library tab, and whether build mode is on. Components update it and call `emitChange()` to notify subscribers.
- **`src/utils/exercises-seed.js`**: the built-in exercise data (id, name, muscle groups, category).
- **`src/components/HomeScreen.js`**: the home screen's empty state and its "welcome back" state.
- **`src/components/ExerciseLibraryScreen.js`**: the Library screen with its ROUTINES and EXERCISES tabs. It renders the exercise search, exercise cards, and saved routine cards, and handles opening routines for editing and deleting them.
- **`src/components/CreateRoutineScreen.js`**: the routine build/edit view embedded in the ROUTINES tab: name input with validation, sets/reps steppers, remove buttons, save, delete, and discard.
- **`src/components/Fab.js`**: the shared floating action button, which re-computes its icon and action whenever the route or store changes.
- **`src/components/BottomNav.js`** and **`src/components/AppHeader.js`**: the persistent navigation bar and top header.
- **`src/components/ConfirmDialog.js`**: a reusable, accessible confirmation dialog. It moves focus into the dialog, traps focus between its two buttons, closes on Escape or a click outside, and returns focus to the button that opened it.
- **`src/components/Toast.js`**: a short-lived confirmation message such as "Routine saved!".
- **`src/components/icons.js`**: inline SVG icons.
- **`src/styles/`**: `main.css` defines the design system as CSS custom properties (colors, spacing, type, radius), and each component has its own stylesheet that uses only those tokens.
- **`vite.config.js`**: the Vite build config and the PWA setup (web app manifest and service worker caching) through `vite-plugin-pwa`.
- **`docs/`**: the product requirements, user stories with acceptance criteria, and wireframes I used to plan each feature before building it.

### Design choices

**Vanilla JavaScript instead of a framework.** I chose not to use React or Vue. The app is small enough that plain ES modules and template strings stay readable, and doing it by hand made me understand rendering, event handling, and state myself instead of relying on a framework. Every component follows one pattern: a `renderX(container)` function that sets the markup and then attaches event listeners.

**Offline-first with IndexedDB.** Gyms often have poor signal, so the app never assumes a network connection. I used IndexedDB instead of `localStorage` because it stores structured objects, is asynchronous, and has much larger storage limits. All database access goes through `db.js`, so the storage details live in one place.

**Hash routing.** Routes like `#/library` don't need any server configuration. The app can be served as plain static files, and the browser's back button still works.

**Building routines inside the Library.** My first version had a separate "Create Routine" screen. While using it, I found that jumping between that screen and the exercise list felt disconnected, so I moved routine building into the Library's ROUTINES tab. Users can now switch between their draft and the exercise list without losing their place. Old `#/create-routine` links redirect to the new location.

**One shared floating action button.** Instead of each screen drawing its own button, a single FAB changes based on context. It always stays in the same spot, so users learn where to tap.

**Accessibility.** I aimed for WCAG 2.1 AA: semantic elements, ARIA labels on icon-only buttons, `aria-current` on the active tab, a focus-managed dialog, and a 375px mobile-first layout.

### Limitations and future work

History, Settings, and starting a live workout session (logging sets, a rest timer, and progress charts) are planned but not built yet. Their user stories are already written in `docs/user-stories/`.

### Use of AI tools

I designed the features of this app, decided how it should be structured, and wrote the functions and the direction for the code. I used AI tools (Claude Code by Anthropic) as an assistant to help me write the code faster. I reviewed and understand all of the code in this project.
