# Sticky Card Stacking Effect – Visual Guide

## How It Works

### Desktop View (lg+)

When you scroll through the Why Choose Us section on desktop:

```
Initial State (Card 1 entering viewport center):
┌─────────────────────────────────────┐
│           Header Area               │
├─────────────────────────────────────┤
│  Rail │     ┌──────────────────┐    │
│ ────  │     │                  │    │
│  01   │     │  Card 01 Active  │    │ ← Card 01 centered (z-index: 100)
│  ──   │     │  (sticky at 50%) │    │
│       │     └──────────────────┘    │
│       │                             │
└─────────────────────────────────────┘
```

### After Scrolling (Card 2 pushing Card 1 up)

```
┌─────────────────────────────────────┐
│  Card 01                            │
│ ┌──────────────────┐   (z: 20)     │ ← Pushed up, fading out
│ │  Card 01 Fades   │               │
│ └──────────────────┘               │
├─────────────────────────────────────┤
│  Rail │     ┌──────────────────┐    │
│ ────  │     │                  │    │
│  02   │     │  Card 02 Active  │    │ ← Card 02 centered (z-index: 100)
│  ──   │     │  (sticky at 50%) │    │
│       │     └──────────────────┘    │
│       │                             │
└─────────────────────────────────────┘
```

## The CSS Magic

### Sticky Positioning

```css
/* Desktop: cards stick to viewport center */
lg:sticky lg:top-1/2 lg:-translate-y-1/2

/* Mobile: normal scroll (no sticky) */
/* Stacking behavior disabled on small screens */
```

**Breakdown:**
- `lg:sticky` – Enable sticky on large screens only
- `lg:top-1/2` – Stick at 50% from viewport top
- `lg:-translate-y-1/2` – Shift up by 50% of card height = perfect center alignment

### Z-Index Stacking

```javascript
// Calculated in updateActivePanel() on each scroll frame:

const distanceFromViewportCenter = panelCenterY - viewportCenterY;
const zIndex = Math.max(1, 100 - Math.round(Math.abs(distanceFromViewportCenter) / 10));

// Result:
// - Card at center: z-index = 100 (fully visible)
// - Card 50px above: z-index = 95 (behind, slightly visible)
// - Card 100px below: z-index = 90 (further behind)
// - Card way off screen: z-index = 1 (minimum)
```

**Effect:**
- Active card (closest to center) always visible on top
- Cards gradually fade and push behind as you scroll past them
- Smooth stacking without abrupt layer changes

## Animation Details

### Card Transforms (Continuous on Scroll)

As each card enters and leaves the center band:

**Lift (Y-axis translate):**
```
Far from center:   translateY(20px)  ← Lifts up slightly
Getting closer:    translateY(10px)  ← Moving down
At center:         translateY(0px)   ← Fully centered
Getting past:      translateY(-10px) ← Moving down more
Far below center:  translateY(-20px) ← Pushed down
```

**Scale (size):**
```
Far:    scale(0.96)  ← Slightly smaller
Center: scale(1.00)  ← Full size
```

**Opacity (visibility):**
```
Far:    opacity(0.35)  ← Dimmed
Center: opacity(1.00)  ← Fully visible
```

### Parallax Layers (Different Speeds)

Inside each card, 3 image layers move at different rates:

```
BG Layer (slowest):   8× viewport delta
                      ┌─ Most parallax effect

MID Layer (medium):   4× viewport delta
                      ├─ Medium depth

FG Layer (fastest):   1.5× viewport delta
                      └─ Subtle depth

= Creates depth illusion of 3D scene
```

## Rail Synchronization

The left rail stays in sync:

```javascript
// Active card detected by: "closest to viewport center"
const minDist = Infinity;
const newActiveIndex = panels.reduce((min, panel, idx) => {
  const dist = getDistanceFromCenter(panel);
  return dist < min ? idx : min;
});

// Updates:
- Rail step gets aria-current="step"
- Progress bar fills from 0–100%
- Pin moves to corresponding position
- Glow effect on active step
```

## Interaction Flow

### On Initial Load

1. Page renders with all 6 card panels
2. First card (01) is closest to viewport center → becomes active
3. Rail step 01 highlighted
4. Progress bar at ~17% (1 of 6)
5. Pin at top

### As User Scrolls Down

```
Scroll → Card 01 moves up and fades
      → Card 02 enters center viewport
      → Rail updates to step 02
      → Progress bar fills to ~33%
      → Pin moves down
      → Card 01 pushes behind (lower z-index)

Continue → Card 02 leaves center
        → Card 03 enters
        → Repeat for all 6 cards
        → At 65% through Card 06 → CTA reveals
```

### Rail Step Click

```javascript
// User clicks step 03:

button.addEventListener('click', () => {
  panels[2].scrollIntoView({ behavior: 'smooth', block: 'center' });
  // = Scroll to Card 03 centered in viewport
  // Smooth 300ms animation
});
```

**Result:** Clicking rail steps smooth-scrolls to that card with it centered

## Keyboard Navigation

```
Tab → Focus moves through rail steps
Enter → Scrolls to that card (same as click)
```

## Mobile Behavior

On mobile (`< lg`):

```css
/* No sticky positioning */
lg:sticky  /* Ignored on small screens */

/* Result: Normal vertical scroll */
/* Cards don't stick or stack */
/* All scroll animations still work */
```

Cards display in a normal scrollable column, one after another.

## Performance Optimization

### RAF Throttling

```javascript
window.addEventListener('scroll', () => {
  rafId = requestAnimationFrame(() => {
    updateActivePanel();  // All calculations happen here
    // Runs max 60 times per second (1 per frame)
  });
});

// Without this: scroll handler fires 100+ times per second = janky
// With RAF: smooth 60 FPS motion
```

### will-change Property

```css
/* Applied to animated elements */
will-change: transform;

/* Tells browser to optimize these layers
   = faster GPU acceleration
   = smoother parallax effect */
```

### Z-Index Calculation

Happens once per frame (not continuously) = efficient layer management

## Reduced Motion Support

If user has `prefers-reduced-motion: reduce`:

```javascript
if (prefersReduced) {
  // No sticky effect (removes animation)
  // Cards scroll normally
  // Z-index stays at 1 (all same layer)
  // Parallax disabled
  // Layout remains readable
}
```

**Result:** Accessible experience for users with motion sensitivity

## Visual Checklist

As you scroll through the section, you should see:

- ✅ Cards stick to center of viewport on desktop
- ✅ Each new card slides in from bottom
- ✅ Previous card fades and slides up
- ✅ All 3 image layers parallax at different speeds
- ✅ Rail pin and progress bar move smoothly
- ✅ Active rail step highlights
- ✅ Cards scale up and become more opaque when centered
- ✅ Smooth 60 FPS animation (no jank/stutter)
- ✅ On mobile: normal scroll (no sticking)

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Cards not sticking | Only works on `lg+` (1024px+) | Test on desktop |
| Cards overlapping strangely | Z-index not calculating right | Check scroll position |
| Parallax too strong/weak | Layer speeds need adjustment | See customization guide |
| Animation janky | RAF throttling not working | Check browser dev tools for frame rate |
| Parallax disabled on reduced motion | Expected behavior | Turn off reduced motion in accessibility |

---

**This is the "Red Bull microsite" effect** – one featured card in the center, others stack behind it, creating a premium, interactive storytelling experience.
