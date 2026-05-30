---
epic: routine-builder
story: 001
title: View home empty state and start building first routine
status: ready
---

## Story

**As a** returning beginner opening the app for the first time  
**I want to** see a welcoming home screen that guides me to create my first workout routine  
**So that** I know exactly what to do next and don't feel lost or overwhelmed

---

## Background

This is the entry point for new users with no saved routines. The Figma "Home - Empty State" screen shows:
- "Your fitness journey starts here." headline
- Supporting copy: "You haven't planned any workouts yet. Let's build your first routine."
- A prominent "Build Your First Workout" CTA button
- Two bento-style quick suggestion cards: **Quick Start** (log an empty session) and **AI Generator** (suggest a routine based on goals)
- Decorative illustration area

This screen transitions to the Create Routine screen when the user taps "Build Your First Workout".

---

## Acceptance Criteria

### Scenario 1: First-time user sees empty state
```gherkin
Given the user has no saved routines in the app
When they open the app or navigate to the Home tab
Then they see the empty state heading "Your fitness journey starts here."
And they see the supporting copy about having no planned workouts
And they see the "Build Your First Workout" primary CTA button
And they see the "Quick Start" and "AI Generator" suggestion cards
And the bottom navigation bar is visible with Home active
```

### Scenario 2: Tapping "Build Your First Workout" navigates to create routine
```gherkin
Given the user is on the Home empty state screen
When they tap the "Build Your First Workout" button
Then they are navigated to the Create Routine screen
And the screen heading reads "NEW PROGRAM / Create Routine"
```

### Scenario 3: Tapping "Quick Start" begins a blank session
```gherkin
Given the user is on the Home empty state screen
When they tap the "Quick Start" card
Then they are navigated to a blank active workout session with no pre-loaded exercises
```

### Scenario 4: Home shows dashboard instead of empty state once a routine exists
```gherkin
Given the user has at least one saved routine
When they navigate to the Home tab
Then they do NOT see the empty state
And they see the Home Dashboard screen with today's session card
```

---

## data-testid Values

- `home-empty-state` — the main empty state container section
- `home-empty-headline` — "Your fitness journey starts here." heading text
- `home-empty-subtext` — supporting body copy
- `build-first-workout-btn` — primary CTA button "Build Your First Workout"
- `quick-start-card` — "Quick Start" bento suggestion card
- `ai-generator-card` — "AI Generator" bento suggestion card
- `home-illustration` — decorative illustration container (decorative, `aria-hidden`)
