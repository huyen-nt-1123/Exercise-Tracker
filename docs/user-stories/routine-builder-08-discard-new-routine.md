---
epic: routine-builder
story: 008
title: Discard a new routine with a back button
status: done
---

## Story

**As a** user who started building a routine but changed my mind
**I want to** a back/discard control that abandons the in-progress routine
**So that** I can leave the build flow without saving a half-finished routine, and without losing work by accident

---

## Background

When building a routine inside the Library ROUTINES tab (story 006), the draft routine (name + planned exercises) is held in app state until the user saves it (story 005). This story adds a **back/discard control** to the build view so the user can exit and throw the draft away.

To avoid accidental loss of work, discarding shows a confirmation dialog **only when the draft has content** (a name and/or at least one exercise). If the draft is empty, the back control exits immediately with no dialog. On discard, the draft is cleared and the ROUTINES tab returns to the saved-routines list state.

---

## Acceptance Criteria

### Scenario 1: Back control is present in the build view
```gherkin
Given the user is in the routine build view (story 006)
Then a back/discard control is visible at the top of the build view
And it has an accessible label such as "Discard routine"
```

### Scenario 2: Discarding a draft with content asks for confirmation
```gherkin
Given the user is building a routine
And the draft has a name and/or at least one added exercise
When they tap the back/discard control
Then a confirmation dialog is shown with the message "Discard this routine?"
And the dialog offers a "Discard" (confirm) action and a "Keep editing" (cancel) action
```

### Scenario 3: Confirming the discard clears the draft and returns to the list
```gherkin
Given the discard confirmation dialog is open
When the user taps "Discard"
Then the draft routine (name and all added exercises) is cleared from app state
And the dialog closes
And the ROUTINES tab returns to the saved-routines list state (story 006)
And no new routine has been written to IndexedDB
```

### Scenario 4: Cancelling keeps the draft intact
```gherkin
Given the discard confirmation dialog is open
When the user taps "Keep editing" (or dismisses the dialog)
Then the dialog closes
And the build view is still shown with the name and exercises unchanged
```

### Scenario 5: Discarding an empty draft exits without a dialog
```gherkin
Given the user is in the build view
And the draft has no name and no added exercises
When they tap the back/discard control
Then no confirmation dialog is shown
And the ROUTINES tab returns to the saved-routines list state
```

### Scenario 6: Dialog is accessible
```gherkin
Given the confirmation dialog is open
Then focus moves into the dialog
And the dialog is dismissible with the keyboard (Escape cancels)
And focus returns to a sensible element after the dialog closes
```

---

## data-testid Values

- `discard-routine-btn` — back/discard control in the build view
- `discard-routine-dialog` — confirmation dialog container
- `discard-confirm-btn` — "Discard" action that clears the draft and exits
- `discard-cancel-btn` — "Keep editing" action that closes the dialog and keeps the draft
