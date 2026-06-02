# Design: View / Edit / Delete routines + FAB on routines list

**Date:** 2026-06-01
**Status:** Approved (pending spec review)

## Problem

On the Library ROUTINES tab, saved routines can be created and started, but:

1. There is no quick way to create a new routine once the list is non-empty — the
   shared FAB is deliberately hidden on the saved-routines list (story 007, scenario 5),
   and the only create entry point is the empty-state "Build a Routine" button.
2. There is no way to review the exercises inside a saved routine. The routine card
   is only actionable via its Start button.
3. There is no way to delete a routine.

This is a mobile-first PWA, so the primary interaction is tapping.

## Goals

- Add a `+` FAB to the saved-routines list that enters routine-build mode.
- Make a routine card tappable to open the routine in the existing create-routine
  flow, pre-loaded, so the user can review exercises and edit them in place.
- Editing an existing routine updates it in place (same `id`); the save action reads
  "Save Changes".
- Add the ability to delete a routine, from two entry points (the card and the
  edit view), each guarded by a confirmation dialog.

## Non-Goals

- No PM user stories are authored as part of this work (can follow separately to keep
  `docs/` in sync).
- No reordering of exercises within a routine.
- No "duplicate routine" feature.

## Design

### 1. FAB on the saved-routines list

`src/components/Fab.js` — `getContext()` gains a new context:

- **When:** `location.hash` starts with `#/library`, `store.libraryTab === 'routines'`,
  and `store.buildingRoutine === false`.
- **Icon:** `icons.plus`. **Label:** "Build a routine".
- **Action:** `store.buildingRoutine = true; store.libraryTab = 'routines'` then
  re-render in place (`emitChange()` + `rerenderScreen()`), matching how the Home
  FAB enters build mode but without a route change (already on `#/library`).

The existing empty-state "Build a Routine" button remains. The FAB is hidden again
while building (the existing exercises-tab "confirm" context already covers that step,
and the build view has its own back/save controls).

### 2. Tap a routine → open in create-routine flow (edit in place)

**Store (`src/utils/store.js`):**

- `draftRoutine` gains two fields, both `null` by default: `id`, `createdAt`.
- `clearDraft()` resets them to `null` along with `name`/`exercises`.

**Routine card (`src/components/ExerciseLibraryScreen.js`):**

- The card body is tappable. Clicking it (anywhere except the Start and Delete
  buttons) loads the routine into the draft and enters build mode:
  ```js
  store.draftRoutine = {
    id: routine.id,
    createdAt: routine.createdAt ?? null,
    name: routine.name,
    exercises: routine.exercises.map(e => ({
      exerciseId: e.exerciseId, sets: e.sets, reps: e.reps,
    })),
    showNameError: false,
  }
  store.buildingRoutine = true
  emitChange()
  switchTab('routines') // re-renders into the build view
  ```
- The Start button and Delete button call `event.stopPropagation()` so they do not
  trigger the card-open behavior.

**Build view (`src/components/CreateRoutineScreen.js`):**

- When `draft.id` is set (editing):
  - Header label/title read "Edit Routine" (instead of "New Program" / "Create Routine").
  - Save button text reads "Save Changes" (instead of "Save Routine").
  - A "Delete Routine" button is shown (see section 3).
- **Save:** build the routine with `id: draft.id ?? crypto.randomUUID()` and
  `createdAt: draft.createdAt ?? new Date().toISOString()`. `saveRoutine` is already an
  upsert via `db.put`, so an existing `id` updates in place. Success toast text stays
  "Routine saved!" (or "Changes saved!" when editing — minor, decide in implementation).
- **Back / discard:** when `draft.id` is set, the confirmation dialog copy changes to
  "Discard changes?" / "Your unsaved changes will be lost." (the routine itself is not
  removed). New-routine flow keeps "Discard this routine?".

### 3. Delete routine + confirmation

**db (`src/utils/db.js`):**

```js
export async function deleteRoutine(id) {
  const db = await getDb()
  return db.delete('routines', id)
}
```

**Entry point A — routine card:** a delete (trash) control on each routine card,
`data-testid="routine-card-delete-btn"`, `aria-label="Delete <name>"`. Click stops
propagation and opens the delete confirmation dialog.

**Entry point B — edit view:** a "Delete Routine" button shown only when `draft.id`
is set, `data-testid="delete-routine-btn"`. Opens the same dialog.

**Confirmation dialog:** mirrors the accessibility pattern of the existing
`openDiscardDialog` in `CreateRoutineScreen.js` — overlay, `role="dialog"`,
`aria-modal="true"`, focus moved into the dialog, two-button focus trap, Escape
cancels, overlay click cancels, focus returns to the trigger on cancel.

- Title: "Delete this routine?"
- Body: "<name> will be permanently removed."
- Actions: "Delete" (confirm, `delete-confirm-btn`) and "Cancel" (`delete-cancel-btn`).
- On confirm: `await deleteRoutine(id)`, close the dialog, `clearDraft()` + exit build
  mode if the delete came from the edit view, then return to the saved-routines list
  (re-render the routines tab), and show a "Routine deleted" toast (reusing the
  existing toast helper).

The dialog is reused for both entry points; the only difference is the trigger element
that receives focus on cancel.

## Data model impact

`Routine` is unchanged on disk. `draftRoutine` (app state only) gains `id` and
`createdAt` to carry an existing routine's identity through the edit flow.

## data-testid values

- `fab` (reused) — `+` create FAB on the routines list.
- `routine-card` (reused) — tappable card body opens the edit view.
- `routine-card-delete-btn` — delete control on each routine card.
- `delete-routine-btn` — "Delete Routine" button in the edit view.
- `delete-routine-dialog` — confirmation dialog container.
- `delete-confirm-btn` — confirm delete.
- `delete-cancel-btn` — cancel.

## Accessibility

- FAB keeps its existing 64×64 tap target and `aria-label`.
- Card body becomes a button-like tappable region with an appropriate role/label, or
  remains a div with a keyboard-activatable handler — implementation must keep it
  reachable and activatable by keyboard and announce "Open <name>".
- Delete confirmation dialog follows the established focus-trap pattern.

## Testing notes (QE-owned, not built here)

- FAB visible on routines list when not building; tapping enters build mode.
- Tapping a card opens the routine pre-loaded; editing sets/reps + save updates the
  same routine (count of routines unchanged).
- Delete from card and from edit view both remove the routine; cancel keeps it.
- Works offline (all reads/writes go through IndexedDB).

## Open / deferred decisions

- Save-toast copy when editing ("Routine saved!" vs "Changes saved!") — implementer's
  choice, low impact.
- Whether to author matching PM user stories afterward — pending user direction.
