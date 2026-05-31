---
screen: create-routine-flow
epic: routine-builder
status: draft
---

## Purpose

Guide a first-time user from an empty home screen through naming a routine, adding
exercises from the library, setting per-exercise targets, and saving — the core
"create a new routine first" flow that unlocks the rest of the app.

Routine building lives **inside the Exercise Library screen's ROUTINES tab** as a
build view (see story 006), so the user can switch to the EXERCISES tab to add
exercises and return to the ROUTINES tab at any time to review what they've added
before saving. A shared floating action button (FAB, story 007) provides the
primary action on each step, and a back/discard control (story 008) abandons the
draft.

## Flow Overview

```
Home (Empty State)
      │  tap "Build Your First Workout"  (or Home FAB ⊕)
      ▼
Library › ROUTINES tab — Build View (empty)  ◀──────────────┐
      │  tap "Add Exercises"                                │ draft persists
      ▼                                                     │ in app state
Library › EXERCISES tab (browse + PLAN)                     │
      │  tap floating ✓ FAB  (or tap ROUTINES tab)          │
      ▼                                                     │
Library › ROUTINES tab — Build View (with exercises) ───────┘
      │  adjust set/rep steppers
      │  tap "Save"
      ▼
Library › ROUTINES tab — Saved List — new "Push Day" card visible

  ↩ back/discard (✕) on the Build View → confirm "Discard?" → Saved List
```

Companion interactive prototype: [create-routine-flow.html](create-routine-flow.html)
(open in a browser; screens are clickable). **Note:** the HTML prototype still depicts
the older standalone-screen flow and has not yet been updated to this IA.

## Layout (375px / mobile-first)

### Screen 1 — Home, Empty State

```
┌─────────────────────────────┐
│ (o)  FLEXLOG                 │  ← Top app bar (avatar + wordmark)
├─────────────────────────────┤
│  Your fitness                │
│  journey starts here.        │  ← Headline
│                              │
│  You haven't planned any     │
│  workouts yet. Let's build   │  ← Subtext
│  your first routine.         │
│                              │
│  ┌────────────┐ ┌──────────┐ │
│  │ Quick Start│ │ AI Gen.  │ │  ← Bento suggestion cards
│  │ empty sess.│ │ by goals │ │
│  └────────────┘ └──────────┘ │
│                              │
│  [ Build Your First Workout ]│  ← Primary CTA → ROUTINES build view
│                        ┌───┐ │
│                        │ ⊕ │ │  ← FAB (Home context): build a routine
│                        └───┘ │
└─────────────────────────────┘
   [Home] [Library] [History] [⚙]   ← Tab bar (Home active)
```

### Screen 2 — Library › ROUTINES tab, Build View (empty)

```
┌─────────────────────────────┐
│ (o)  FLEXLOG                 │
├─────────────────────────────┤
│ [ ROUTINES ] [ EXERCISES ]   │  ← tab strip (ROUTINES active, build view)
│ (✕)                          │  ← back / discard control
│  NEW PROGRAM                 │  ← label-caps
│  Create Routine              │  ← headline
│  ┌─────────────────────────┐ │
│  │ Routine Name            │ │
│  │ ( e.g., Push Day      ) │ │  ← pill input
│  └─────────────────────────┘ │
│  Plan Targets                │
│  Set your goals for today.   │
│  ┌─────────────────────────┐ │
│  │   No exercises added yet │ │  ← empty state
│  │   Tap below to build     │ │
│  └─────────────────────────┘ │
│  [   + Add Exercises   ]     │  ← switches to EXERCISES tab
│  [        Save Routine      ]│  ← disabled until name + ≥1 exercise
└─────────────────────────────┘
   [Home] [Library] [History] [⚙]   (Library active)
```

### Screen 3 — Library › EXERCISES tab (bento cards + ✓ FAB)

```
┌─────────────────────────────┐
│ (o)  FLEXLOG                 │
├─────────────────────────────┤
│ [ ROUTINES ] [ EXERCISES ]   │  ← tab strip (EXERCISES active)
│ ( Search exercises...   )[≡] │  ← search + filter
│ Exercise Library   48 Results│
│  ┌─────────────────────────┐ │  ← BENTO CARD (32px radius, glow, border)
│  │ Barbell Bench Press  (＋)│ │  ← name + 40px circular expand btn
│  │ ⬡ Chest / Triceps        │ │  ← muscle chip
│  │ ◷ Last: 185lbs           │ │  ← last-performance hint w/ icon
│  │ [  3 Sets ][ 10 Reps ]   │ │  ← filled pills (share row width)
│  │ [        PLAN          ] │ │  ← PLAN tinted by muscle group
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │ Weighted Pull Ups   (＋) │ │  ← Back/Biceps → blue PLAN accent
│  │ … [ 4 Sets ][ 8 Reps ]   │ │
│  │ [        PLAN          ] │ │
│  └─────────────────────────┘ │
│  [ + Add Custom Exercise ]   │
│                        ┌───┐ │
│                        │ ✓ │ │  ← FAB (add-exercises): return to build view
│                        └───┘ │
└─────────────────────────────┘
   [Home] [Library] [History] [⚙]   (Library active)
```

### Screen 4 — Library › ROUTINES tab, Build View (with exercises + steppers)

```
┌─────────────────────────────┐
│ (o)  FLEXLOG                 │
├─────────────────────────────┤
│ [ ROUTINES ] [ EXERCISES ]   │  ← ROUTINES active (build view)
│ (✕)                          │  ← back / discard control
│  NEW PROGRAM                 │
│  Create Routine              │
│  ( Push Day              )   │  ← filled input
│  Plan Targets                │
│  ┌─────────────────────────┐ │  ← bento-style target card
│  │ Bench Press          (x) │ │  ← remove btn
│  │ CHEST & TRICEPS          │ │
│  │ SETS [-] 4 [+]           │ │  ← stepper
│  │ REPS [-]10 [+]           │ │
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │ Overhead Press    3x12   │ │
│  └─────────────────────────┘ │
│  [ + Add Exercises ]         │
│  [        Save Routine      ]│  ← Save persists routine
└─────────────────────────────┘
   [Home] [Library] [History] [⚙]   (Library active)
```

### Screen 5 — Library › ROUTINES tab, Saved List (after save)

```
┌─────────────────────────────┐
│ (o)  FLEXLOG                 │
├─────────────────────────────┤
│ [ ROUTINES ] [ EXERCISES ]   │  ← ROUTINES active (list view)
│ My Saved Workouts            │
│  ┌─────────────────────────┐ │
│  │ Push Day            ▶    │ │  ← tap to open, ▶ quick-start
│  │ Focus: Chest, Shoulders, │ │
│  │ Triceps                  │ │
│  │ 3 EXERCISES · 9 TOTAL    │ │
│  └─────────────────────────┘ │
│                        ┌───┐ │
│                        │ ⊕ │ │  ← FAB: build another routine
│                        └───┘ │
└─────────────────────────────┘
   [Home] [Library] [History] [⚙]   (Library active)
```

## Element Inventory

### Screen 1 — Home, Empty State
- Top app bar — brand / profile — `app-header`
- Headline — orient the user — `home-empty-headline`
- Subtext — explain empty state — `home-empty-subtext`
- Quick Start card — log an empty session — `quick-start-card`
- AI Generator card — suggest a routine — `ai-generator-card`
- Build First Workout CTA — enter build view — `build-first-workout-btn`
- Empty state container — `home-empty-state`
- FAB (⊕, build a routine) — `fab` (story 007)
- Tab bar — global nav — `bottom-nav`

### Screen 2 — Library › ROUTINES tab, Build View (empty)
- Library root container — `exercise-library-screen`
- Routines tab — `routines-tab`
- Exercises tab — `exercises-tab`
- ROUTINES build-view wrapper — `library-routines-build-view` (story 006)
- Build view root — `create-routine-screen`
- Back / discard control — `discard-routine-btn` (story 008)
- Routine name label — `routine-name-label`
- Routine name input — `routine-name-input`
- Name validation error — `routine-name-error`
- Plan Targets heading — `plan-targets-heading`
- Exercise list empty state — `exercise-list-empty-state`
- Add Exercises button — `add-exercises-btn`
- Save routine button — `save-routine-btn`

### Screen 3 — Library › EXERCISES tab (bento cards)
- Routines tab / Exercises tab — `routines-tab` / `exercises-tab`
- Search input — `exercise-search-input`
- Filter button — `exercise-filter-btn`
- Results count — `exercise-results-count`
- Exercise bento card (repeated, `data-exercise-id`) — `exercise-card`
- Exercise name — `exercise-name`
- Card expand button (40px circle) — `exercise-card-expand-btn` (story 003)
- Muscle chip — `exercise-muscle-chip`
- Last performance hint — `exercise-last-hint`
- Sets display pill — `exercise-sets-display`
- Reps display pill — `exercise-reps-display`
- PLAN button (muscle-tinted) — `exercise-plan-btn`
- Search empty state — `exercise-library-empty-state`
- FAB (✓, return to build view) — `fab` (story 007)

### Screen 4 — Library › ROUTINES tab, Build View (with exercises)
- Plan Targets section — `plan-targets-section`
- Exercise target card (repeated, `data-exercise-id`) — `exercise-target-card`
- Target exercise name — `exercise-target-name`
- Target muscle label — `exercise-target-muscle`
- Sets decrement / value / increment — `sets-decrement-btn` / `sets-value` / `sets-increment-btn`
- Reps decrement / value / increment — `reps-decrement-btn` / `reps-value` / `reps-increment-btn`
- Remove exercise button — `remove-exercise-btn`
- Save routine button — `save-routine-btn`
- Success toast — `save-routine-success-toast`

### Screen 5 — Library › ROUTINES tab, Saved List
- ROUTINES list-view wrapper — `library-routines-list-view` (story 006)
- Routines list container — `routines-list`
- Routine card (repeated, `data-routine-id`) — `routine-card`
- Routine name — `routine-card-name`
- Focus subtext — `routine-card-focus`
- Exercise count badge — `routine-card-exercise-count`
- Total sets badge — `routine-card-set-count`
- Quick-start button — `routine-card-start-btn`
- FAB (⊕, build another) — `fab` (story 007)

### Discard confirmation (overlay on Screen 2 / 4)
- Confirmation dialog — `discard-routine-dialog` (story 008)
- Discard (confirm) — `discard-confirm-btn`
- Keep editing (cancel) — `discard-cancel-btn`

## States

- **Default / loaded**: ROUTINES tab shows the saved-routines list; EXERCISES tab
  shows seeded exercise bento cards.
- **Build view**: ROUTINES tab shows the Create Routine build view (name input +
  Plan Targets) instead of the saved list, entered via the FAB or the list's
  empty-state CTA.
- **Empty state**: Home shows "Your fitness journey starts here."; the build view
  shows "No exercises added yet" until at least one exercise is planned.
- **Filled / added**: Each PLANned exercise becomes a target card with steppers in
  the build view; Save enables once a name + ≥1 exercise exist.
- **Loading**: Library cards seed from IndexedDB; show a brief skeleton/placeholder
  while reading (no network — offline-first).
- **Error**: Empty name on save → inline `routine-name-error` ("Please give your
  routine a name") and focus the input; search with no matches → `exercise-library-empty-state`.
- **Discard**: tapping the back/discard control on a dirty draft opens
  `discard-routine-dialog` ("Discard this routine?"); an empty draft exits straight
  to the saved list with no dialog.
- **Success**: After save, `save-routine-success-toast` flashes and the ROUTINES tab
  returns to the saved list with the new card.

## Navigation

- **Arrives from**: Home empty state ("Build Your First Workout"), the Home FAB (⊕),
  or the ROUTINES list empty-state CTA — all open the ROUTINES tab build view.
- **Within the flow**:
  - Build view → EXERCISES tab (via "Add Exercises").
  - EXERCISES tab → build view (via the ✓ FAB, or by tapping the ROUTINES tab) —
    the draft (name + added exercises) is preserved.
  - Build view → saved-routines list (via "Save" — draft cleared, routine persisted).
  - Build view → saved-routines list (via back/discard ✕ — draft cleared, nothing
    persisted; confirmation shown when the draft has content).
- **Exits to**: Active Workout Logging (via a routine card's ▶ quick-start).

## Notes

- Routine building is a sub-view of the Library ROUTINES tab, not a standalone
  `#/create-routine` screen (story 006). The in-progress routine is held in app
  state, not committed to IndexedDB until Save.
- The routine name and added exercises must survive switching between the ROUTINES
  and EXERCISES tabs (story 006); the draft is only cleared on Save or Discard.
- Steppers default to 3 sets × 10 reps, clamp at a minimum of 1, and reject
  non-numeric input (story 004).
- Save is blocked without a name even when exercises are present (stories 002 & 005).
- The FAB is one shared component; only its icon/action change by context — ⊕ to
  build (Home / saved list), ✓ to return-and-save (add-exercises step) — see story 007.
- Exercise, target, and routine cards all use the shared **bento card** pattern
  (white surface, 32px radius, soft green glow, muscle-group accent) — see story 003.
- Colours/spacing reference the "Kinetic Bubble" tokens in `docs/design.md` and
  `src/styles/main.css` — primary `#006d3e`, primary-container `#2deb90`,
  surface `#f2fcf1`. Never hardcode values.
- The HTML prototype (`create-routine-flow.html`) is a throwaway click-through for
  stakeholder review and still reflects the older standalone-screen flow; production
  implementation lives in `src/` per the Dev Agent rules.
