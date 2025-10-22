# Why Choose Us Component – Quick Reference

## 🚀 Quick Start (30 seconds)

```tsx
import WhyChooseUs from '@/components/WhyChooseUs';

// In your page or layout:
<WhyChooseUs />
```

That's it! Component is self-contained and handles all interactions.

## 📋 Implementation Checklist

- [ ] Component imported into page
- [ ] `/public/images/why/` directory created
- [ ] 6 background images converted to WebP/AVIF
- [ ] 6 vignette/mid images converted to WebP/AVIF
- [ ] Run setup script: `node scripts/setup-why-us-images.js`
- [ ] Tested scrolling and animations
- [ ] Verified images load (DevTools → Network)
- [ ] Tested on mobile device

## 🎨 Common Customizations

### Change Brand Color (Orange)

Find & Replace in `WhyChooseUs.tsx`:

| Find | Replace With |
|------|--------------|
| `#F16022` | Your primary color |
| `#E55A1A` | Your secondary color |

Example: Change from orange to teal:
```tsx
#F16022 → #06B6D4  (cyan-500)
#E55A1A → #0891B2  (cyan-600)
```

### Change Background Gradient

Current:
```tsx
bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950
```

Tailwind presets:
```tsx
// Dark slate (current)
bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950

// Dark blue
bg-gradient-to-b from-blue-900 via-blue-950 to-slate-950

// Deep purple
bg-gradient-to-b from-purple-900 via-purple-950 to-slate-950

// Charcoal (minimal)
bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900
```

### Update Copy Text

All 6 reasons are hardcoded. Quick find & replace:

```tsx
// Reason 01
"22+ Years of Excellence" → your title
"Over two decades..." → your description
"1,000+ properties..." → your stat

// Repeat for reasons 02–06
```

Better approach: Extract to data structure:
```tsx
const reasons = [
  {
    num: '01',
    title: 'Your Title',
    body: 'Your description',
    stat: 'Your stat line',
  },
  // ... 5 more
];

// Then map in JSX
{reasons.map((r, i) => (
  <article data-panel key={i}>
    <h3>{r.title}</h3>
    <p>{r.body}</p>
    <div>{r.stat}</div>
  </article>
))}
```

### Adjust Parallax Effect Strength

In `updateActivePanel()` function:

```javascript
// Current settings
if (layerType === 'bg') parallaxRatio = 8;     // Slowest
else if (layerType === 'mid') parallaxRatio = 4;  // Medium
else if (layerType === 'fg') parallaxRatio = 1.5; // Fastest

// Make stronger parallax (more depth)
if (layerType === 'bg') parallaxRatio = 12;    // Much slower
else if (layerType === 'mid') parallaxRatio = 6;   // Medium-fast
else if (layerType === 'fg') parallaxRatio = 2;    // Faster

// Make subtle parallax (barely noticeable)
if (layerType === 'bg') parallaxRatio = 3;
else if (layerType === 'mid') parallaxRatio = 1.5;
else if (layerType === 'fg') parallaxRatio = 0.5;
```

### Change When CTA Reveals

In `updateActivePanel()` function:

```javascript
// Current: reveals at 65% through last card
const ctaRevealThreshold = 0.65;

// Earlier reveal (50% through)
const ctaRevealThreshold = 0.5;

// Later reveal (80% through)
const ctaRevealThreshold = 0.8;

// At very end (90%)
const ctaRevealThreshold = 0.9;
```

### Adjust Card Lift Animation

In `updateActivePanel()` function:

```javascript
// Current settings
const liftY = 20 * (1 - eased);     // Max 20px lift
const scale = 0.96 + 0.04 * eased;  // 0.96 → 1.00
const opacity = 0.35 + 0.65 * eased; // 0.35 → 1.00

// Subtle effect
const liftY = 8 * (1 - eased);      // Only 8px lift
const scale = 0.98 + 0.02 * eased;  // 0.98 → 1.00
const opacity = 0.6 + 0.4 * eased;  // 0.6 → 1.00

// Dramatic effect
const liftY = 40 * (1 - eased);     // 40px lift
const scale = 0.9 + 0.1 * eased;    // 0.9 → 1.00
const opacity = 0.2 + 0.8 * eased;  // 0.2 → 1.00
```

## 🖼️ Image Setup

### Quick Setup (3 minutes)

```bash
# 1. Create placeholder structure
node scripts/setup-why-us-images.js

# 2. Visit Squoosh.app
# 3. Upload 6 background images (1200×800px)
#    Convert to WebP (quality 85) → save as bg-01.webp, etc.
# 4. Upload 6 vignette images
#    Convert to WebP (quality 85) → save as mid-01.webp, etc.
# 5. Create AVIF versions (quality 75) → save as .avif

# 6. Place all 12 images in: public/images/why/
```

### Image Requirements at a Glance

| Layer | Format | Size | Opacity | Content |
|-------|--------|------|---------|---------|
| BG | WebP/AVIF | 1200×800 | 10% | Room/space hero photo |
| MID | WebP/AVIF | 1200×800 | 15% | Vignette overlay |
| FG | CSS | N/A | 8% | Numbered badge (auto) |

### File Size Targets

```
bg-01.webp:    100–150 KB
mid-01.webp:   50–80 KB
bg-01.avif:    60–80 KB (smaller than WebP)
mid-01.avif:   30–50 KB (smaller than WebP)
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Check `/public/images/why/` directory exists; verify file names (bg-01.webp, etc.) |
| Parallax looks wrong | Ensure `[data-layer]` attributes present; check prefers-reduced-motion setting |
| CTA won't show | Scroll to end of last card (panel 06); should appear at 65% scroll through |
| Rail pin stuck | Verify `[data-rail-pin]` and `[data-rail-fill]` have proper positioning |
| No animation on scroll | Check browser supports transform; test on Chrome first |
| Layout shift during countups | Verify `.font-tabular-nums` applied; use `font-mono` as fallback |

## 📊 Stat Countups

### Edit Stats Values

In the stat band section:

```tsx
<span data-count="22" data-decimals="0">0</span>      // 22 (integer)
<span data-count="1000" data-decimals="0">0</span>    // 1,000 (integer)
<span data-count="500000" data-decimals="0">0</span>  // 500,000 (integer)
<span data-count="5" data-decimals="1">0</span>       // 5.0 (1 decimal)
```

### Add Custom Stat

```tsx
<div className="text-center relative">
  <div data-sweep className="..."><!-- sweep bar --></div>
  <div className="text-4xl md:text-5xl font-bold text-[#F16022] mb-2 font-tabular-nums">
    <span data-count="999" data-decimals="0">0</span>  <!-- your number -->
    +
  </div>
  <div className="text-sm md:text-base font-semibold text-white mb-1">
    Your Metric Here
  </div>
  <div className="text-xs md:text-sm text-gray-400">Your Label</div>
</div>
```

## ♿ Accessibility

All built-in:

✅ Keyboard navigation (Tab, Enter)
✅ ARIA labels on buttons
✅ Semantic HTML (`<article>`, `<h3>`, `<p>`)
✅ Color contrast (WCAG AA+)
✅ Respects `prefers-reduced-motion: reduce`
✅ Images have alt text
✅ Screen reader friendly

No additional work needed!

## 📱 Mobile Behavior

- **Desktop (lg+):** Sticky rail on left, **cards stick and stack** as you scroll
- **Tablet (md):** Responsive, still sticky when space allows
- **Mobile (sm):** Full-width stack, rail above content
- **All sizes:** Scroll interactive, animations work

No responsive overrides needed—all included.

## 🎯 Active State Detection

Automatic! The component detects which card is closest to viewport center and:

1. ✅ Updates rail step to `aria-current="step"`
2. ✅ Fills progress bar from 0–100%
3. ✅ Animates pin along the bar
4. ✅ Adds glow effect to active step

No manual updating needed.

## 🔌 Integration Points

**Where to use:**
- Homepage, below hero
- Landing pages
- About page (marketing section)
- Sales page

**Don't use:**
- In modals (won't scroll properly)
- In horizontal scroll containers
- Inside overflow-hidden parents

## 📈 Performance Tips

✅ Built-in optimizations (RAF, will-change, lazy loading)
✅ Preload first 2 images for LCP improvement
✅ Compress images to < 150KB each
✅ Monitor Core Web Vitals in Lighthouse

Target metrics:
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## 🎓 Learning Resources

- **Component code:** `src/components/WhyChooseUs.tsx`
- **Full guide:** `docs/WHY-CHOOSE-US-GUIDE.md`
- **Image setup:** `scripts/setup-why-us-images.js`
- **Brand standards:** `src/styles/brandStandards.ts`

## 🚨 Common Mistakes

❌ Forgetting to add images → component renders but cards look empty
❌ Using wrong image dimensions → parallax looks off
❌ Not converting to WebP/AVIF → larger bundle size
❌ Placing inside overflow-hidden parent → parallax breaks
❌ Changing data attributes → scroll binding breaks

## 💡 Pro Tips

1. **Preload first images** in `<head>`:
   ```tsx
   <link rel="preload" as="image" href="/images/why/bg-01.webp" />
   ```

2. **Use placeholder images** while real ones load:
   ```html
   background-color: #334155; /* matches section bg */
   ```

3. **Test on real device**:
   ```bash
   npm run dev
   # On mobile, visit: http://your-ip:3000
   ```

4. **Monitor animations** in DevTools:
   ```
   F12 → Performance → Record while scrolling
   ```

5. **Extract to data structure** when adding 10+ variations

## 📞 Support

Issues? Check:
1. Browser console (F12) for JS errors
2. Network tab (F12) for missing images
3. `docs/WHY-CHOOSE-US-GUIDE.md` troubleshooting section
4. Component code comments for logic details
