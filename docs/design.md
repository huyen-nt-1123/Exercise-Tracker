---
name: Kinetic Bubble
colors:
  surface: '#f2fcf1'
  surface-dim: '#d3ddd2'
  surface-bright: '#f2fcf1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf6eb'
  surface-container: '#e7f0e6'
  surface-container-high: '#e1ebe0'
  surface-container-highest: '#dbe5db'
  on-surface: '#151e17'
  on-surface-variant: '#3b4a3f'
  inverse-surface: '#2a332c'
  inverse-on-surface: '#eaf3e9'
  outline: '#6b7b6e'
  outline-variant: '#bacbbc'
  surface-tint: '#006d3e'
  primary: '#006d3e'
  on-primary: '#ffffff'
  primary-container: '#2deb90'
  on-primary-container: '#006539'
  inverse-primary: '#1ae389'
  secondary: '#1730e6'
  on-secondary: '#ffffff'
  secondary-container: '#3b50fe'
  on-secondary-container: '#e6e6ff'
  tertiary: '#b4126b'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffbcd3'
  on-tertiary-container: '#ab0264'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#58ffa5'
  primary-fixed-dim: '#1ae389'
  on-primary-fixed: '#00210f'
  on-primary-fixed-variant: '#00522d'
  secondary-fixed: '#dfe0ff'
  secondary-fixed-dim: '#bdc2ff'
  on-secondary-fixed: '#000a64'
  on-secondary-fixed-variant: '#0022db'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cc'
  on-tertiary-fixed: '#3e0021'
  on-tertiary-fixed-variant: '#8d0051'
  background: '#f2fcf1'
  on-background: '#151e17'
  surface-variant: '#dbe5db'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.5'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  stat-number:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  margin-page: 20px
  gutter: 12px
  touch-target-min: 48px
  container-padding: 16px
---

## Brand & Style

The design system is built on a "Fun, Animated, Bubbly" vibe, prioritizing momentum and positive reinforcement. The brand personality is that of an enthusiastic personal trainer—approachable, high-energy, and deeply encouraging. To support the "no-signup, offline-first" requirement, the visual language is lightweight, using CSS-based effects rather than heavy assets to ensure instant loading.

The style is a hybrid of **Tactile** and **Modern** aesthetics. It utilizes "squishy" physical metaphors, where elements feel like they have physical volume and bounce. Micro-interactions should feel elastic, rewarding every tap with a subtle scale-down effect to mimic the pressing of a soft, physical button. The goal is to make tracking a workout feel less like data entry and more like a playful, tactile game.

## Colors

The palette is high-energy and saturates the UI with motivation. The primary color is an "Energetic Lime," used for the main action buttons and success states. A "Vibrant Electric Blue" serves as the secondary color for secondary actions and navigation elements.

For muscle group categorization, a rainbow of playful accent colors is used to provide quick visual scanning during a workout. PR celebrations utilize a "Golden Glow" to signify achievement. Neutral tones are kept cool and crisp (light grays and soft blues) to ensure the vibrant primary colors pop without causing eye strain in high-brightness gym environments.

## Typography

This design system employs **Lexend** for all headings, labels, and numeric data. Lexend was specifically designed for readability and has an athletic, clear cadence that excels during movement. For body text and descriptions, **Plus Jakarta Sans** provides a softer, friendlier counterpoint that maintains the bubbly aesthetic while ensuring legibility.

Numeric data (reps, sets, weight) should always be rendered in bold Lexend to ensure they can be read at arm's length while the user is exercising.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for one-handed mobile use. It uses a 4-column mobile grid with generous outer margins to prevent accidental taps near the bezel.

The spacing rhythm is based on an 8px base unit. Larger internal paddings (20px+) are used within cards to contribute to the "airy" and lightweight feel. Elements are vertically stacked with significant breathing room to keep the UI from feeling cluttered during high-intensity intervals.

## Elevation & Depth

This design system uses **Ambient Shadows** and **Tonal Layers** to create a sense of "soft volume." Instead of harsh black shadows, elevations are defined by soft, diffused dropshadows tinted with the primary or secondary color (e.g., a lime-tinted shadow under a lime button).

Depth is used to denote interactivity:
- **Level 0 (Base):** The background color, flat and stable.
- **Level 1 (Cards):** Soft white surfaces with a subtle 4px blur shadow.
- **Level 2 (Interactive):** Elements that "pop" off the screen with a 12px blur shadow, suggesting they can be pressed or moved.
- **Active State:** When pressed, elements should visually "sink" (shadow decreases, scale reduces to 0.95), creating a tactile, bouncy feedback loop.

## Shapes

The shape language is strictly **Pill-shaped**. There are no sharp corners in this design system. All interactive containers, buttons, and input fields use maximum border-radii to reinforce the bubbly, friendly vibe.

Progress bars and sliders must feature rounded caps. Selection states (like active days in a calendar) should be perfect circles or soft-rectangles with at least a 16px radius.

## Components

### Buttons & Inputs
- **Primary Action:** Large, pill-shaped buttons with a subtle gradient and a soft bottom-shadow to create a "3D bubble" effect.
- **Input Fields:** Thick borders (2px) with large internal padding. The active state should trigger a slight "expand" animation of the border thickness.

### Cards & Lists
- **Exercise Cards:** Large rounded corners (32px). Cards should use background tinting based on the muscle group being worked.
- **Workout Lists:** Items separated by generous vertical gutters rather than thin lines, appearing as distinct "pods" of information.

### Feedback & PRs
- **Celebration Chips:** When a PR is hit, use "Confetti Chips"—small, colorful, pill-shaped labels that float upward with an elastic animation.
- **Progress Bubbles:** Circular indicators that fill up with a liquid-like animation as the user completes sets.

### Workout Specifics
- **The "Big Green Button":** A persistent, floating action button for "Start Workout" or "Finish Set" that remains anchored and pulsates slightly when a rest timer is active.
- **Offline Indicator:** A friendly, pill-shaped toast that appears at the top to reassure the user that "Workout being saved locally."
