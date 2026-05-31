# Exercise Tracker PWA — Product Requirements Document

**Status:** Draft v1.0
**Date:** 2026-05-02
**Author:** PM Agent

---

## 1. Executive Summary

We're building a **mobile-first Progressive Web App** for gym-goers who want to log workouts, track progress, and train more consistently — without the friction of complex apps or the unreliability of paper logs. The app solves the core problem of broken workout flow: users forget what they lifted last session, lose track of sets mid-workout, and have no clear picture of whether they're improving. By minimising in-gym cognitive load and surfacing progress automatically, the app supports the single job-to-be-done: **help gym-goers improve performance over time**.

---

## 2. Problem Statement

### Who has this problem?
People who train at a gym regularly (or aspire to) and want to follow a structured programme, track their lifts, and see progress over time — but currently rely on memory, notes apps, or paper logs that don't give them useful feedback.

### What is the problem?
The gym workout experience is fragmented across five recurring pain points:

| Pain Point | Impact |
|---|---|
| **Can't remember last session's weight/reps** | Guessing at starting weights wastes warm-up sets and undermines progressive overload |
| **Too many steps to start logging** | Breaking focus before a workout begins kills momentum and motivation |
| **Losing track of sets completed** | Mid-exercise confusion disrupts flow and leads to incomplete or duplicated sets |
| **Forgetting rest time** | Resting too long or too short affects performance quality and session pacing |
| **No visibility into progress** | Without trend data, users can't tell if training is working — leading to demotivation and dropout |

### Why is it painful?
Training at the gym requires sustained focus. Every time a user has to think about the app — searching for history, counting sets manually, navigating menus — it costs attention that should be spent on executing the workout. The result is lower performance, frustration, and eventually abandonment of the tracking habit.

### Evidence (from user research — Miro board JTBD map)
- Users express a clear emotional job: *"Feel confident training effectively"* and *"Reduce uncertainty during workouts"*
- Social jobs point to accountability: *"Demonstrate effort over time"*, *"Show commitment to self-improvement"*
- Functional pain is consistent across every stage of the workout journey: pre-workout, during, between sets, post-workout, and later analysis

---

## 3. Target Users & Personas

### Primary Persona: The Consistent Gym-Goer
- **Profile:** Trains 3–5x/week, follows a structured programme (e.g. PPL, 5/3/1, hypertrophy block)
- **Tech savviness:** Comfortable with mobile apps; doesn't want to learn a complex tool
- **Goals:** Hit progressive overload consistently, see strength gains over months
- **Pain points:** Relies on memory between sessions, loses track mid-workout, has no single view of progress
- **Behaviour:** Currently using a notes app, spreadsheet, or nothing — and it's not working

### Secondary Persona: The Returning Beginner
- **Profile:** Trains 1–3x/week, less structured, building the habit
- **Goals:** Show up consistently, feel like progress is happening
- **Pain points:** Doesn't know what to do next, easily discouraged by lack of visible progress
- **Behaviour:** Drops apps that are too complex; needs quick wins and positive feedback

### Jobs-to-Be-Done (core)
- **Functional:** Log sets/reps/weight without breaking flow; review history to plan next session; track progress over weeks and months
- **Emotional:** Feel confident and in control during workouts; feel accomplished after finishing; trust that training is effective
- **Social:** Demonstrate discipline and improvement over time (to self, trainer, or workout partners)

---

## 4. Strategic Context

### Why this product?
Most gym tracking apps (Strong, Hevy, MyFitnessPal) are either feature-bloated, require accounts/subscriptions, or don't work offline. This app is:
- **Frictionless by default** — no signup, no paywall, works without internet
- **Privacy-first** — all data stays on device
- **Focused** — optimised for the in-gym experience, not social or coaching features

### Why now?
PWA capabilities (offline storage, home screen install, service workers) are now mature enough to deliver a native-quality experience without an app store. The combination of IndexedDB for local persistence and Vite + vite-plugin-pwa makes this buildable by a small team without backend infrastructure.

### Platform
Progressive Web App — installable on iOS and Android from the browser, works fully offline, no app store required.

---

## 5. Solution Overview

### Core Concept
A lightweight, offline-first workout logging app that surfaces the right information at the right moment in the workout journey — so users spend more time training and less time managing the app.

### Core User Flow

```
1. PRE-WORKOUT
   └─ Open app → see today's planned session (or start fresh)
   └─ Review last session's weights/reps inline → set today's targets

2. START SESSION (one tap)
   └─ Load routine or start blank session
   └─ See exercise list, set order, target weights

3. DURING EXERCISE
   └─ Log set: tap reps + weight (large controls, minimal input)
   └─ Auto-start rest timer on set completion
   └─ See last session's result inline for comparison

4. BETWEEN SETS
   └─ Rest countdown visible + haptic/audio alert at end
   └─ View form notes / cues for next set
   └─ Adjust next set weight based on performance

5. MID-WORKOUT
   └─ Progress bar shows sets completed vs. planned
   └─ Live session summary (volume, time elapsed)
   └─ Alert if falling behind planned timing

6. POST-WORKOUT
   └─ Completion screen with session summary
   └─ Highlight PRs and milestones
   └─ One-tap save to history

7. LATER (recovery + analysis)
   └─ Trend charts by exercise (strength, volume over time)
   └─ Weekly summaries
   └─ Suggested next session based on history
```

---

## 6. Key Features (Epics)

### Epic 1 — Workout Logging *(core, MVP)*
Log exercises, sets, reps, and weight in real time. Large tap targets, minimal input steps, inline display of last session's performance for the same exercise.

**Key capability:** A user can complete an entire workout — start to save — without leaving the logging screen.

### Epic 2 — Exercise Library *(core, MVP)*
A built-in library of common exercises (searchable, categorised by muscle group). Users can also add custom exercises.

**Key capability:** Find any exercise in under 5 seconds.

### Epic 3 — Rest Timer *(core, MVP)*
Automatic rest timer that starts when a set is logged. Configurable duration per exercise. Haptic and audio alert when rest is complete.

**Key capability:** User never has to look at a clock during rest — the app manages rest timing automatically.

### Epic 4 — Session Progress & History *(core, MVP)*
Progress bar during session (sets done / sets planned). Post-workout summary (total volume, duration, exercises, PRs). Browsable session history.

**Key capability:** After every session, user sees concrete evidence of effort. Over time, they can browse any past workout.

### Epic 5 — Routine Builder *(v2)*
Create and save reusable workout templates. Schedule sessions across the week. Load a routine at session start.

**Key capability:** User arrives at the gym, taps their routine, and starts immediately — no planning required on the day.

**Navigation model:** Routine building lives *inside* the Exercise Library screen's ROUTINES tab as a sub-view, rather than as a standalone screen. The ROUTINES tab toggles between the saved-routines list and a build view (name + planned exercises); adding exercises switches to the EXERCISES tab, and the user can return to the ROUTINES tab at any time to review what they've added before saving. The in-progress routine is held in app state and only committed to IndexedDB on save. A back/discard control abandons the draft (with confirmation when it has content). See user stories `routine-builder-06` and `routine-builder-08`.

**Shared patterns:** Two reusable UI patterns are introduced here and reused app-wide:
- **Bento card** — the single content-card style (white surface, 32px radius, soft green glow, muscle-group accent) shared by exercise, target, and routine cards. See `routine-builder-03`.
- **Floating action button (FAB)** — one shared bottom-right control whose icon and action change by context (e.g. `+` to build on Home, `✓` to confirm/return when adding exercises). See `routine-builder-07`.

### Epic 6 — Progress & Trends *(v2)*
Exercise-level strength and volume charts over time. Personal record tracking. Plateau detection. Weekly summaries. Suggested progressive overload targets.

**Key capability:** User can see at a glance whether a lift is trending up, flat, or declining — and the app suggests what to target next.

### Epic 7 — Offline Support *(cross-cutting, MVP)*
Full functionality without a network connection. Data persists in IndexedDB. Service worker caches app shell.

**Key capability:** App loads and works identically whether the user has gym WiFi or not.

---

## 7. Success Metrics

### Primary Metric
**Session completion rate** — % of started sessions that are saved to history
- Baseline: unknown (new product)
- Target: ≥ 80% of started sessions saved within first 30 days of use

### Secondary Metrics
| Metric | Target |
|---|---|
| Time-to-first-set-logged (from app open) | ≤ 60 seconds |
| Rest timer adoption | ≥ 70% of sessions use rest timer |
| Return rate (user logs workout again within 7 days) | ≥ 60% |
| Sessions per active user per week | ≥ 2 |

### Proxy for Long-Term Retention
- User has ≥ 10 sessions logged (habit formation threshold)
- User views progress/history at least once per week

### Guardrail Metrics
- App load time (cold start, offline): ≤ 2 seconds
- Accessibility: WCAG 2.1 AA — zero critical violations

---

## 8. Out of Scope (MVP)

| Feature | Rationale |
|---|---|
| User accounts / cloud sync | Adds backend complexity; local-first is the MVP constraint |
| Social features (sharing, leaderboards) | Not core to the JTBD; secondary persona need only |
| Nutrition tracking | Out of scope for this product |
| AI coaching or form analysis | Future consideration once usage patterns are established |
| Wearable integration (Apple Watch, Garmin) | Nice-to-have; not MVP |
| Video tutorials / exercise animations | Resource-intensive; library text cues are sufficient for v1 |
| Paid subscription / monetisation | Not in scope for initial build |

---

## 9. Constraints

| Constraint | Detail |
|---|---|
| **Mobile-first** | Designed at 375px width; all core flows must work on a small screen with one hand |
| **Offline-capable** | Every feature must work without a network connection (PWA + IndexedDB) |
| **No login required (MVP)** | All data stored locally; no user accounts in v1 |
| **Accessibility** | WCAG 2.1 AA minimum — all interactive elements keyboard/screen-reader accessible |
| **Tech stack** | Vanilla JS, Vite, vite-plugin-pwa, IndexedDB, Playwright (for QE) |
| **No native app** | PWA only — no App Store or Play Store submission in scope |

---

## 10. Dependencies & Risks

### Dependencies
- `vite-plugin-pwa` for service worker generation and offline support
- IndexedDB as the sole persistence layer (no backend)
- Playwright for end-to-end testing (QE agent)

### Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| IndexedDB storage limits on iOS Safari | Medium | Test storage limits early; document ceiling to users |
| PWA install prompt inconsistency across browsers | Medium | Design so app works fully in browser without install |
| Users don't return after first session | High | Invest in post-workout completion screen and progress visibility (Epic 4) from day one |
| Scope creep into social/coaching features | Medium | Strict out-of-scope list; defer to v2 roadmap |

---

## 11. Open Questions

| Question | Owner | Status |
|---|---|---|
| What is the default exercise library? (which exercises, how many at launch?) | PM | Open |
| Should rest timer duration be set per-exercise or per-session? | PM + Dev | Open |
| How should progressive overload suggestions work in MVP? (manual target vs. auto-suggest) | PM | Open |
| What is the onboarding experience for a brand-new user with no history? | PM + Design | Open |
| Should the app support multiple users on the same device (profile switching)? | PM | Deferred to v2 |

---

## 12. Next Steps

1. **Wireframes** — sketch core screens: home, active session, set logging, rest timer, post-workout summary (`/wireframe`)
2. **User story map** — map the full journey into epics and stories (`/user-story-mapping`)
3. **Epic breakdown** — start with Epic 1 (Workout Logging) and Epic 3 (Rest Timer) as MVP foundation (`/epic-breakdown-advisor`)
4. **Persona detail** — flesh out primary persona with discovery questions (`/proto-persona`)
5. **Dev handoff** — first user stories ready for Cursor once wireframes approved
