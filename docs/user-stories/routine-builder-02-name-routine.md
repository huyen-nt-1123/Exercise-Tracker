---
epic: routine-builder
story: 002
title: Name a new routine
status: ready
---

## Story

**As a** consistent gym-goer building a new workout plan  
**I want to** give my routine a meaningful name (e.g. "Push Day")  
**So that** I can identify it quickly when choosing what to do at the gym

---

## Background

The "Create Routine" Figma screen shows:
- Page heading: "NEW PROGRAM" (label-caps) + "Create Routine" (headline)
- A white card with a "Routine Name" label and a pill-shaped text input (placeholder: "e.g., Push Day")
- A "Plan Targets" section header below (for setting exercise targets — covered in story 004)
- An empty exercise list area (covered in story 003)
- An "Add Exercises" secondary-style button at the bottom

This screen is Step 1 of the routine creation flow, reached by tapping "Build Your First Workout" from the empty state or using the FAB on the Home Dashboard.

---

## Acceptance Criteria

### Scenario 1: User sees blank routine form
```gherkin
Given the user has navigated to the Create Routine screen
When the screen loads
Then they see the "NEW PROGRAM" label and "Create Routine" heading
And the routine name input is empty and shows placeholder text "e.g., Push Day"
And the exercise list shows the empty state placeholder "No exercises added yet"
And the "Add Exercises" button is visible
```

### Scenario 2: User enters a routine name
```gherkin
Given the user is on the Create Routine screen
When they tap the routine name input
Then the input receives focus and shows a visible focus border
When they type "Push Day"
Then the input displays "Push Day"
And the placeholder text is no longer visible
```

### Scenario 3: Routine name is required to save
```gherkin
Given the user is on the Create Routine screen
And the routine name input is empty
When they attempt to save the routine
Then an inline error message appears: "Please give your routine a name"
And the routine is not saved
And the name input is focused
```

### Scenario 4: Routine name persists if user navigates away and returns
```gherkin
Given the user has typed "Leg Day" into the routine name input
When they navigate to the Exercise Library to add exercises
And then return to the Create Routine screen
Then the routine name input still shows "Leg Day"
```

---

## data-testid Values

- `create-routine-screen` — root container of the Create Routine screen
- `create-routine-heading` — "Create Routine" heading text
- `routine-name-input` — the text input for the routine name
- `routine-name-label` — "Routine Name" label above the input
- `exercise-list-empty-state` — placeholder shown when no exercises have been added
- `add-exercises-btn` — "Add Exercises" secondary button
- `routine-name-error` — inline validation error message
