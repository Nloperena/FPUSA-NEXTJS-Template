# 🚀 Activate Premium Package Selector

## What's New?

You now have a **completely redesigned, production-ready package selector** featuring:

✨ **Sticky left rail** with package navigation (desktop)  
✨ **Multi-layer parallax** on scrolling panels  
✨ **Progressive enhancement** (CSS Scroll Timeline + JS fallback)  
✨ **Full accessibility** (keyboard nav, reduced motion, ARIA)  
✨ **Built-in quote estimator** with live calculations  
✨ **SEO optimized** with Schema.org markup  

---

## 🎯 Activation Steps

### Step 1: Add Font Awesome (Choose One Method)

#### **Method A: CDN (Quickest)**

Add to `src/app/layout.tsx` in the `<head>`:

```tsx
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
/>
```

#### **Method B: NPM (Recommended)**

```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

Then update icon imports in `PremiumPackageSelector.tsx` (see `docs/FontAwesome-Setup.md`).

---

### Step 2: Verify the Component is Integrated

The component is **already integrated** into `page-diet.tsx`:

```tsx
import PremiumPackageSelector from '@/components/PremiumPackageSelector';

// ...in your JSX:
<PremiumPackageSelector />
```

---

### Step 3: Test in Development

```bash
npm run dev
```

Visit `http://localhost:3000` and navigate to your homepage.

**What to look for:**
- ✅ Sticky rail on the left (desktop)
- ✅ Parallax scrolling on package panels
- ✅ Active rail card highlights as you scroll
- ✅ "Get Fast Quote" opens estimator modal
- ✅ Theme rooms add-ons below rail

---

### Step 4: Accessibility Testing

#### Keyboard Navigation
1. **Tab** through the page
2. Press **Space** or **Enter** on rail cards → should scroll to panel
3. Click "Get Fast Quote" → press **Escape** → modal closes
4. Check **focus rings** are visible (orange outline)

#### Reduced Motion
1. Open DevTools
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Type "Emulate CSS prefers-reduced-motion"
4. Select "reduce"
5. Refresh page → parallax should be disabled

---

### Step 5: Performance Audit

Run Lighthouse in DevTools:
1. Open DevTools (`F12`)
2. Go to "Lighthouse" tab
3. Select "Desktop" + all categories
4. Click "Analyze page load"

**Expected Scores:**
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 95+

---

## 🎨 Customization

### Change Package Images

Edit `PACKAGES` array in `src/components/PremiumPackageSelector.tsx`:

```tsx
const PACKAGES: Package[] = [
  {
    id: 'refresh',
    title: 'Refresh Package',
    // ... other fields
    image: 'https://your-custom-image-url.com/refresh.jpg',
    imageAlt: 'Your descriptive alt text'
  },
  // ... more packages
];
```

**Image Requirements:**
- Format: JPEG/WebP/AVIF
- Size: 1200×1600px (portrait orientation)
- Quality: 80-90%
- Hosting: Unsplash, Cloudinary, your CDN

---

### Change Pricing

Edit `ROOM_PRICES` in the `EstimatorModal` function:

```tsx
const PRICES = {
  living: [4000, 7500],   // [min, max] in dollars
  primary: [3500, 6500],
  kids: [4500, 8500],
  dining: [2500, 5000],
  theme: [6000, 18000]
};
```

---

### Change Colors

Replace Tailwind classes:

| Element | Current | Change To |
|---------|---------|-----------|
| Primary Orange | `bg-[#F16022]` | `bg-[#YOUR_COLOR]` |
| Deep Navy | `bg-[#1B3764]` | `bg-[#YOUR_COLOR]` |
| Body Text | `text-gray-600` | `text-gray-700` |

Or update `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#F16022',
      secondary: '#1B3764',
    }
  }
}
```

Then use: `bg-primary`, `text-secondary`

---

### Adjust Parallax Speed

In `useParallaxFallback` hook:

```tsx
// Slower parallax (subtle):
const translateY = scrollProgress * -6;  // was -12

// Faster parallax (dramatic):
const translateY = scrollProgress * -20; // was -12
```

---

## 🔄 Rollback (If Needed)

To switch back to the V2 package selector:

```tsx
// In page-diet.tsx
import FPUSAPackages from '@/components/FPUSAPackages-v2';

// Replace:
<PremiumPackageSelector />
// With:
<section className="py-24 bg-gradient-to-br from-[#F5F5DC] to-white">
  <FPUSAPackages />
</section>
```

---

## 🐛 Common Issues

### 1. Icons Not Showing
**Problem**: Seeing □ squares instead of icons  
**Solution**: Font Awesome not loaded. Add CDN link to `<head>` (see Step 1)

### 2. Rail Not Sticky
**Problem**: Rail scrolls with page instead of sticking  
**Solution**: Check parent container isn't `overflow: hidden`

### 3. Parallax Jerky
**Problem**: Scrolling feels laggy  
**Solution**: Reduce parallax multipliers or enable reduced motion

### 4. Modal Won't Close
**Problem**: Pressing ESC doesn't close estimator  
**Solution**: Click outside modal or check console for JS errors

### 5. Images Not Loading
**Problem**: Broken image placeholders  
**Solution**: 
- Check image URLs are valid
- Verify CORS headers (if external images)
- Try different image hosting service

---

## 📊 Browser Support

| Browser | Scroll Timeline | Fallback |
|---------|----------------|----------|
| Chrome 115+ | ✅ Native | — |
| Edge 115+ | ✅ Native | — |
| Safari 17+ | ✅ Native | — |
| Firefox 110+ | ❌ | ✅ JS Fallback |
| Safari iOS | ⚠️ Partial | ✅ JS Fallback |
| Chrome Android | ✅ Native | — |

All browsers get a working experience; modern browsers get enhanced animations.

---

## 📱 Mobile Behavior

On screens < 1024px:
- Rail becomes **horizontal scroll** (top)
- Panels **stack vertically**
- Parallax is **reduced** or disabled
- Sticky CTA bar appears at **bottom**

Test on:
- iPhone 13/14/15 (390×844)
- Galaxy S22/S23 (360×800)
- iPad (768×1024)

---

## 🎯 Next Steps

1. ✅ Add Font Awesome (Step 1)
2. ✅ Test in dev mode (Step 3)
3. ✅ Run accessibility checks (Step 4)
4. ✅ Run Lighthouse audit (Step 5)
5. 🎨 Customize images/colors (Optional)
6. 🚀 Deploy to production

---

## 📚 Additional Resources

- Full Documentation: `docs/PremiumPackageSelector-README.md`
- Font Awesome Setup: `docs/FontAwesome-Setup.md`
- Component Source: `src/components/PremiumPackageSelector.tsx`

---

**Questions or issues? Check the docs or review the inline code comments.**

---

✨ **Enjoy your new premium package selector!** ✨


