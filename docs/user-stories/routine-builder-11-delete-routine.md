---
epic: routine-builder
story: 011
title: Delete a saved routine with confirmation
status: done
---

## Story

**As a** user whose routine list has grown stale
**I want to** delete a routine I no longer use, with a confirmation step
**So that** I can keep my saved routines relevant without fear of removing one by accident

---

## Background

Saved routines live as Routine Cards in the Library ROUTINES tab (story 005) and can now be opened for editing (story 009), but there is no way to remove one. This story adds a destructive delete action from two entry points: a delete control on each routine card, and a "Delete Routine" button inside the edit view (story 009). Both open the same confirmation dialog, which follows the accessibility pattern established by the discard dialog (story 008): focus moves in, Escape cancels, focus returns on cancel. Deletion removes the routine from IndexedDB. Because the action is irreversible in the MVP (no undo), confirmation is always required.

---

## Acceptance Criteria

### Scenario 1: Delete control on the routine card
```gherkin
Given the user is on the Library ROUTINES tab with a saved routine "Push Day"
Then each routine card shows a delete control with accessible label "Delete Push Day"
When the user taps the delete control
Then a confirmation dialog is shown
And the underlying card is not opened for editing (the tap does not also open the routine)
```

### Scenario 2: Delete button in the edit view
```gherkin
Given the user has opened "Push Day" for editing (story 009)
Then a "Delete Routine" button is visible in the build view
When the user taps it
Then the same delete confirmation dialog is shown
```

### Scenario 3: Confirmation dialog content
```gherkin
Given the delete confirmation dialog is open for "Push Day"
Then it is titled "Delete this routine?"
And its body reads "Push Day will be permanently removed."
And it offers a "Delete" (confirm) action and a "Cancel" action
```

### Scenario 4: Confirming the delete removes the routine
```gherkin
Given the delete confirmation dialog is open for "Push Day"
When the user taps "Delete"
Then "Push Day" is removed from IndexedDB
And the dialog closes
And the user is returned to the saved-routines list, which no longer shows "Push Day"
And a brief "Routine deleted" toast is shown
```

### Scenario 5: Cancelling keeps the routine
```gherkin
Given the delete confirmation dialog is open for "Push Day"
When the user taps "Cancel" or presses Escape
Then the dialog closes
And "Push Day" still appears in the saved-routines list
And no data is removed from IndexedDB
```

### Scenario 6: Deletion persists after reopening the app
```gherkin
Given the user has deleted "Push Day"
When they close and reopen the app and return to the ROUTINES tab
Then "Push Day" is still absent from the saved-routines list
```

### Scenario 7: Dialog is accessible
```gherkin
Given the delete confirmation dialog is open
Then focus moves into the dialog
And the dialog is dismissible with the keyboard (Escape cancels)
And focus returns to the control that opened it after it closes
```

---

## data-testid Values

- `routine-card-delete-btn` — delete control on each routine card (identify the routine via the card's `data-routine-id`)
- `delete-routine-btn` — "Delete Routine" button inside the edit view
- `delete-routine-dialog` — confirmation dialog container
- `delete-confirm-btn` — "Delete" action that removes the routine
- `delete-cancel-btn` — "Cancel" action that closes the dialog and keeps the routine
- `save-routine-success-toast` — transient toast (reused) showing "Routine deleted"
