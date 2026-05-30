Write a user story for the Exercise Tracker PWA.

Epic and feature to write: $ARGUMENTS

Steps:
1. Read `docs/prd.md` to confirm the epic exists and understand scope
2. Read existing stories in `docs/user-stories/` to find the next story number for this epic and avoid overlap
3. Write the story file and save it to `docs/user-stories/<epic>-<story-number>-<slug>.md`

Required story format:

```
---
epic: <epic-slug>
story: <zero-padded-3-digit-number>
title: <one-line description>
status: draft
---

## Story

**As a** <persona>
**I want to** <goal>
**So that** <benefit>

---

## Background

<2-4 sentences of context: what screen/flow this is in, what already exists, any MVP constraints>

---

## Acceptance Criteria

### Scenario 1: <name>
```gherkin
Given <precondition>
When <action>
Then <outcome>
And <outcome>
```

<add more scenarios as needed>

---

## data-testid Values

- `<testid>` — <what it identifies>
```

Rules:
- Do not write code
- Every interactive element needs a data-testid
- Acceptance criteria must be specific enough for a developer to implement without asking questions
- Mark status as `draft` — PM reviews before changing to `ready`
