---
epic: routine-builder
story: 007
title: Shared floating action button with context-driven icon and action
status: done
---

## Story

**As a** user moving through the app's core flows
**I want to** a consistent floating action button (FAB) in the bottom-right of the screen whose icon and action match what I'm doing
**So that** the primary action on any screen is always in the same, reachable place and behaves predictably

---

## Background

The Figma design defines a single FAB style ("Floating Action Button", node 76:199): a 64×64px circle, primary-container green `#2deb90`, anchored to the bottom-right above the tab bar, with a soft green glow shadow (`0px 8px 10px rgba(45,235,144,0.1), 0px 10px 25px rgba(45,235,144,0.2)`). The Figma labels it "Only on Home", where it acts as the create/start action.

This story generalises that single element into a **shared, reusable FAB component** used across the app, where only the **icon and action change by context**. The component's position, size, colour, shadow, and tap target stay identical everywhere so it reads as the same control. The first two concrete contexts are defined below; future screens (e.g. active workout logging) can register their own icon + action against the same component.

The FAB is the primary entry into routine building (Home) and the primary way to return from adding exercises to the routine draft to save it (routine build flow, see story 006). Colours and spacing come from the tokens in `src/styles/main.css` / `docs/design.md` — no hardcoded values.

---

## Acceptance Criteria

### Scenario 1: FAB renders with the shared appearance
```gherkin
Given the FAB is shown on any screen that registers it
Then it is a 64×64px circular button anchored to the bottom-right, sitting above the bottom navigation bar
And it uses the primary-container green fill and the green glow shadow from the design tokens
And it has an accessible label describing its current action
And it has a minimum 44×44px tap target (WCAG 2.1 AA)
```

### Scenario 2: Home context shows a "create" FAB
```gherkin
Given the user is on the Home screen
Then the FAB displays a "plus" (+) icon
And its accessible label reads "Build a routine" (or equivalent)
When the user taps the FAB
Then they are taken into routine build mode on the Library ROUTINES tab (story 006)
```

### Scenario 3: Routine-build / Add-Exercises context shows a "confirm" FAB
```gherkin
Given the user is building a routine and is on the EXERCISES tab adding exercises (story 006)
Then the FAB displays a check (✓) icon
And its accessible label reads "Done adding exercises" (or equivalent)
When the user taps the FAB
Then they return to the routine build view on the ROUTINES tab
And the exercises they PLANned are shown in the plan-targets list, ready to review and save
```

### Scenario 4: Icon and action swap by context without a new component
```gherkin
Given the FAB is the same shared component across screens
When the active context changes (e.g. from Home to the Add-Exercises step)
Then only the icon and the action (and accessible label) change
And the size, position, colour, and shadow remain identical
```

### Scenario 5: FAB is hidden where no primary action is defined
```gherkin
Given the user is on a screen that does not register a FAB action (e.g. the saved-routines list with no build in progress, History, Settings)
Then the FAB is not shown
```

### Scenario 6: Keyboard and screen-reader access
```gherkin
Given a user navigating by keyboard or screen reader
When they reach the FAB
Then it is focusable and activatable via Enter/Space
And its accessible label announces the current action, not a generic "button"
```

---

## data-testid Values

- `fab` — the shared floating action button element (single instance; its icon/label change by context)
- `fab-icon` — the icon container inside the FAB (swaps between plus / check / future icons)

> Note: tests identify the FAB by `data-testid="fab"` and assert its current action via the accessible label / `aria-label`, since the same element is reused across contexts.
