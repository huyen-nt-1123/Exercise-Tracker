Create a wireframe document for the Exercise Tracker PWA.

Screen to wireframe: $ARGUMENTS

Steps:
1. Read `docs/prd.md` to understand scope and constraints for this screen
2. Read any existing user stories for this screen in `docs/user-stories/` to know what elements are required
3. Check `docs/wireframes/` for existing wireframes to maintain consistent conventions
4. Write the wireframe and save it to `docs/wireframes/<screen-name>.md`

Required wireframe format:

```
---
screen: <screen-name>
epic: <epic-slug>
status: draft
---

## Purpose

<One sentence: what the user is trying to accomplish on this screen>

## Layout (375px / mobile-first)

Use ASCII art to sketch the layout. Show:
- Navigation elements (tab bar, back button, header)
- Primary content area
- Key interactive elements (buttons, inputs, cards)
- Empty states if relevant

Example:
┌─────────────────────────┐
│  ← Back    Screen Title │  ← Header
├─────────────────────────┤
│                         │
│   [Content area]        │
│                         │
│  ┌───────────────────┐  │
│  │  Card / Section   │  │
│  └───────────────────┘  │
│                         │
│  [PRIMARY ACTION BTN]   │  ← Full-width CTA
└─────────────────────────┘
   [home] [log] [history]    ← Tab bar

## Element Inventory

List every element shown in the wireframe:
- Element name — purpose — data-testid value
- ...

## States

Describe each distinct state this screen can be in:
- **Default / loaded**: ...
- **Empty state**: ...
- **Loading**: ...
- **Error**: ...

## Navigation

- **Arrives from**: <screen(s) that link here>
- **Exits to**: <screen(s) reachable from here>

## Notes

Any layout decisions, edge cases, or constraints worth calling out.
```

Rules:
- Mobile-first: 375px is the base, note any breakpoints for larger screens
- Do not write code or component implementations
- Every named element should have a proposed data-testid value
