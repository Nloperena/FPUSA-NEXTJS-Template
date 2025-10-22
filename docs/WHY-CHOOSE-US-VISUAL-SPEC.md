# Why Choose Us – Visual Specification

## Color Palette

### Primary Colors
- **Primary Accent**: `#F16022` (Brand Orange)
  - RGB: `241, 96, 34`
  - Usage: CTA buttons, progress fill, highlights, icons
  - Hover: `#E55A1A` (darker)

- **Secondary Accent**: `#E55A1A`
  - RGB: `229, 90, 26`
  - Usage: Button hover, icon backgrounds

### Background Gradient
```
from-slate-700 (color-stop 0%)
  ↓
via-slate-800 (color-stop 50%)
  ↓
to-slate-950 (color-stop 100%)
```

### Text Colors
- **Primary Text**: `#FFFFFF` (white)
  - Headings, titles, high emphasis
  - Color: `rgb(255, 255, 255)`

- **Secondary Text**: `#D1D5DB` (gray-300)
  - Body copy, descriptions
  - Color: `rgb(209, 213, 219)`

- **Tertiary Text**: `#9CA3AF` (gray-400)
  - Meta text, labels, helper text
  - Color: `rgb(156, 163, 175)`

### Background Overlays
- **Card Background**: `bg-gray-800/40` (opacity: 40%)
  - Subtle dark overlay on cards
  - Creates depth with transparency

- **Rail Background**: `bg-gray-800/50` (opacity: 50%)
  - Slightly darker for rail area

- **Button Hover**: `hover:bg-gray-700/60` (opacity: 60%)
  - Step button hover state

## Typography

### Font Stack
```css
font-family: system-ui, -apple-system, sans-serif;
/* Uses default system fonts for optimal performance */
```

### Font Sizes & Weights

#### Header Section
- **Main Headline**: 4xl (md), 5xl (lg), 6xl (xl)
  - Text: "The Difference That Makes All The Difference"
  - Weight: 700 (bold)
  - Line-height: 1.25

- **Subheading**: lg (base), xl (md)
  - Text: "We create experiences..."
  - Weight: 400 (normal)
  - Color: gray-300

#### Card Section
- **Card Title**: 3xl (md), 4xl (lg)
  - Examples: "22+ Years of Excellence"
  - Weight: 700 (bold)
  - Color: white

- **Card Body**: base (md), lg (lg)
  - Main content paragraphs
  - Weight: 400 (normal)
  - Color: gray-300
  - Line-height: 1.625 (relaxed)

- **Card Meta**: sm (base)
  - "1,000+ properties designed..."
  - Weight: 600 (semibold)
  - Background: `[#F16022]/10`
  - Padding: px-4 py-2

#### Rail Section
- **Rail Step Label**: sm
  - "01 Industry Veteran"
  - Weight: 600 (semibold)
  - Number: 02 digits, orange color

- **Stat Number**: 4xl (md), 5xl (lg)
  - "22+", "1,000+", "5.0"
  - Weight: 700 (bold)
  - Font-variant: tabular-nums
  - Color: #F16022

#### CTA Section
- **CTA Headline**: 3xl (md), 4xl (lg)
  - "Ready to Transform Your Rental?"
  - Weight: 700 (bold)

- **CTA Description**: lg
  - Weight: 400 (normal)
  - Color: gray-300

- **CTA Button Text**: base
  - Weight: 600 (semibold)
  - "Get Free Design Consultation"

## Spacing & Layout

### Section Padding
- **Vertical**: `py-24` (6rem = 96px)
- **Horizontal**: `px-4` (sm), `px-6` (md), `px-8` (lg)
- **Container Max**: `max-w-7xl` (80rem = 1280px)

### Component Spacing

#### Header Section
- Headline → Subheading: `mb-4` (1rem)
- Subheading → Energy Line: `mb-8` (2rem)
- Energy Line → Content: `mb-24` (6rem)

#### Layout Grid (Desktop)
```
Left Rail (lg: 1/4)    |    Right Content (lg: 3/4)
     Sticky               6 scrollable cards
     Progress Bar         Stacked vertically
     6 Step Buttons       gap-y: 16 (4rem)
```

- Grid gap: `gap-8` (2rem desktop), `gap-12` (3rem lg)
- Left rail sticky: `lg:sticky lg:top-20`

#### Rail Styling
- Container height: `h-96` (24rem = 384px)
- Padding: `p-4` (1rem internal)
- Border: `border border-gray-700/50`
- Background: `bg-gray-800/50 rounded-lg`

#### Step Buttons
- Padding: `px-4 py-3` (0.75rem vertical)
- Border radius: `rounded-md`
- Gap between buttons: `space-y-2` (0.5rem)
- Styling: `bg-gray-700/30 hover:bg-gray-700/60`
- Transition: `transition-all duration-200`

#### Cards (Panels)
- Padding: `p-6` (sm), `p-8` (md/lg)
- Border: `border border-gray-700/50`
- Background: `bg-gray-800/40 backdrop-blur-sm`
- Border radius: `rounded-2xl`
- Overflow: `overflow-hidden` (for images)

#### Parallax Image Container
- Height: `h-64` (mobile), `min-h-80` (mobile), `h-full` (desktop)
- Border radius: `rounded-lg`
- Overflow: `overflow-hidden`

#### Grid Inside Card
- Columns: 1 (mobile), 2 (md/lg)
- Gap: `gap-6` (1.5rem)
- Reorder on mobile: `order-2` (mobile), `order-1` (desktop)

#### Stat Band
- Margin top: `mt-32` (8rem = 128px)
- Grid columns: 2 (base), 4 (md+)
- Gap: `gap-8` (md), `gap-12` (lg)
- Padding: `py-16` (md), `py-20` (lg)
- Border: `border-y border-gray-700/30`

#### CTA Section
- Margin top: `mt-20` (5rem = 80px)
- Padding bottom: `pb-16` (4rem = 64px)
- Max width: `max-w-2xl` (28rem = 448px)
- Gap between buttons: `gap-4` (1rem)

### Sizing Details

#### Progress Pin
- Width: `w-4` (1rem)
- Height: `h-4` (1rem)
- Border radius: `rounded-full`
- Transform: `translateY(-50%)` (visual center)

#### Progress Fill
- Width: animated 0% → 100%
- Height: full container
- Background gradient: `from-[#F16022] to-[#E55A1A]`
- Border radius: `rounded`

#### Energy Line (header gradient)
- Height: `h-0.5` (2px)
- Width: 100%
- Gradient: transparent → orange → transparent
- Glow shadow: `0 0 20px rgba(241, 96, 34, 0.6)`

#### CTA Buttons
- Padding: `px-8 py-4` (2rem horizontal, 1rem vertical)
- Border radius: `rounded-full` (pill shape)
- Primary button:
  - Background: `bg-[#F16022]`
  - Hover: `hover:bg-[#E55A1A]`
  - Shadow: `shadow-lg hover:shadow-xl`
  - Text: white, semibold
  
- Secondary button:
  - Border: `border-2 border-white`
  - Text: white, semibold
  - Hover: `hover:bg-white/10`

#### Focus Ring
- Style: `focus:outline-none focus:ring-2`
- Width: `ring-2` (2px)
- Color: `focus:ring-[#F16022]` or `focus:ring-white`
- Offset: `focus:ring-offset-2 focus:ring-offset-slate-900`

## Animation & Motion

### Scroll-Linked Animations

#### Card Lift/Scale/Opacity
- **Duration**: Continuous on scroll (no transition duration)
- **Distance**: 20px lift when far, 0px when centered
- **Scale**: 0.96 when far, 1.00 when centered
- **Opacity**: 0.35 when far, 1.00 when centered
- **Easing**: easeInOutQuad curve

#### Parallax Layers
- **BG Layer (data-layer="bg")**
  - Speed ratio: 8× viewport delta
  - Opacity: 10%
  - Direction: upward (opposite scroll)

- **MID Layer (data-layer="mid")**
  - Speed ratio: 4× viewport delta
  - Opacity: 15%
  - Direction: upward

- **FG Layer (data-layer="fg")**
  - Speed ratio: 1.5× viewport delta
  - Opacity: 8%
  - Slight scale change: ±0.02 based on distance

#### Progress Pin & Fill
- **Pin Movement**: 
  - Animated from top: 0% → 100%
  - Duration: `transition-all duration-300 ease-out`
  - Glow shadow: `0 0 12px rgba(241, 96, 34, 0.8)`

- **Fill Bar**:
  - Width: 0% → 100%
  - Duration: `transition-all duration-300 ease-out`
  - Always above bg track

#### Stat Sweep Bars
- **Width**: 0% → 100% as stat band scrolls into view
- **Duration**: `transition-all duration-300`
- **Color**: Gradient `from-[#F16022] to-[#E55A1A]`
- **Height**: `h-1` (4px)

#### CTA Reveal
- **Trigger**: 65% scroll through last card
- **Duration**: `transition-all duration-700 ease-out`
- **Opacity**: 0 → 1
- **Visibility**: Hidden → visible
- **Effect**: Fade in and slide up subtly

#### CTA Magnetic Hover (Desktop)
- **Trigger**: `mousemove` on button
- **Transform**: `translate(x, y)` based on pointer position
- **Calculation**: (pointer offset × 0.15)
- **Max displacement**: ±~50px depending on button size
- **Reset**: On `mouseleave`, instant return to `translate(0, 0)`

#### Rail Step Button Hover
- **Background**: `hover:bg-gray-700/60` (from 30%)
- **Transition**: `transition-all duration-200`
- **Active state**: `aria-current="step"` → added `.active` class
- **Glow on active**: `box-shadow: 0 0 12px rgba(241, 96, 34, 0.8)` (implied)

### Transitions
- **Duration**: 200ms (fast), 300ms (standard), 500ms (cards), 700ms (CTA reveal)
- **Timing**: `ease-out` (for entrances), `linear` (for parallax), `ease` (standard)
- **Properties**: `transform`, `opacity`, `width`, `background-color`

### Reduced Motion
When `prefers-reduced-motion: reduce`:
- All animations → `duration: 0.01ms`
- Parallax transforms → `transform: none`
- Parallax layers → no transform
- Hover animations → no transform
- Scroll behavior → `scroll-behavior: auto`
- Layout remains intact, no jank

## Responsive Breakpoints

### Mobile (< 768px)
- **Grid**: Single column
- **Rail**: Full width, stacks above content
- **Image Size**: h-64 (16rem = 256px)
- **Font Sizes**: Reduced one step (text-3xl → text-2xl, etc.)
- **Padding**: 1rem (px-4)
- **Gap**: 1.5rem (gap-6)
- **Sticky**: None (regular scroll)

### Tablet (768px – 1024px)
- **Grid**: Grid ready, but may not have space for sticky
- **Rail**: May start to stick if viewport tall enough
- **Image**: h-full min-h-80
- **Font Sizes**: md sizes
- **Padding**: 1.5rem (px-6)
- **Gap**: 2rem (gap-8)

### Desktop (1024px+)
- **Grid**: 4-column (1/4 rail, 3/4 content)
- **Rail**: Sticky `lg:sticky lg:top-20`
- **Layout**: True side-by-side with parallax
- **Font Sizes**: lg sizes
- **Padding**: 2rem (px-8)
- **Gap**: 3rem (gap-12)

## Visual Hierarchy

### Primary Focus
1. Active card (lifted, scaled, full opacity)
2. Rail progress (fills to active card)
3. Animated pin (shows position)

### Secondary Focus
2. Stat countups (as scrolling)
3. CTA reveal (at end)

### Tertiary Elements
3. Inactive cards (dimmed, lower opacity)
4. Rail inactive steps (gray, no highlight)
5. Images (subtle, low opacity)

## Accessibility Contrast

### WCAG Compliance
- **White text on dark (slate-900)**: 11.5:1 (AAA)
- **Gray-300 on dark (slate-900)**: 7.2:1 (AAA)
- **Gray-400 on dark (slate-900)**: 4.8:1 (AA)
- **Orange (#F16022) on dark (slate-900)**: 5.1:1 (AA)
- **Orange on white**: 3.2:1 (AA for large text)

All text meets or exceeds WCAG AA standards.

## Layout Edge Cases

### Very Tall Screens (viewport > 1400px)
- Cards may be far apart
- Parallax effect more pronounced
- Pin moves more slowly between cards

### Very Short Screens (viewport < 600px)
- Rail buttons stack tightly
- Cards appear in quick succession
- Parallax still works, less dramatic

### Wide Cards (viewport width 1400px+)
- Image area becomes larger
- Text content still readable
- No overflow or wrapping issues (containers fluid)

## Print & Export
Component not designed for print. Optimized for screen only.

---

**Design System Version**: 1.0  
**Last Updated**: 2025  
**Component ID**: why-us-proof  
**Framework**: React + TailwindCSS
