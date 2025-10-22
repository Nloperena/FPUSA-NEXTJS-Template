# Font Awesome Setup for PremiumPackageSelector

The `PremiumPackageSelector` component uses Font Awesome icons. Here's how to integrate them:

---

## Option 1: CDN (Quickest)

Add to `app/layout.tsx` or your main layout:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Option 2: NPM Package (Recommended for Production)

### 1. Install Font Awesome

```bash
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
```

### 2. Update the Component

Replace `<i>` tags with React components:

```tsx
// At top of PremiumPackageSelector.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSparkles,
  faCalculator,
  faTimes,
  faCheckCircle,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

// Replace icon usage:
// OLD: <i className="fas fa-sparkles text-[#F16022] text-lg"></i>
// NEW: <FontAwesomeIcon icon={faSparkles} className="text-[#F16022] text-lg" />
```

### 3. Global Config (Optional)

Create `lib/fontawesome.ts`:

```tsx
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Prevent Font Awesome from adding its CSS since we're using Tailwind
config.autoAddCss = false;
```

Import in `app/layout.tsx`:

```tsx
import '@/lib/fontawesome';
```

---

## Icons Used in Component

| Icon | Class Name | Purpose |
|------|------------|---------|
| ✨ Sparkles | `fa-sparkles` | Theme rooms header |
| 🧮 Calculator | `fa-calculator` | Estimator buttons |
| ✖️ Times/X | `fa-times` | Close modal button |
| ✔️ Check Circle | `fa-check-circle` | Feature bullets |
| → Arrow Right | `fa-arrow-right` | CTA buttons |

---

## Testing Icon Display

Add this test component:

```tsx
export default function IconTest() {
  return (
    <div className="p-8 space-y-4">
      <div><i className="fas fa-sparkles text-2xl text-red-500"></i> Sparkles</div>
      <div><i className="fas fa-calculator text-2xl text-blue-500"></i> Calculator</div>
      <div><i className="fas fa-times text-2xl text-gray-500"></i> Times</div>
      <div><i className="fas fa-check-circle text-2xl text-green-500"></i> Check Circle</div>
      <div><i className="fas fa-arrow-right text-2xl text-orange-500"></i> Arrow Right</div>
    </div>
  );
}
```

If icons appear as squares □, Font Awesome isn't loaded properly.

---

## Performance Notes

- **CDN**: Faster initial setup, but adds external dependency
- **NPM**: Better for production (bundled, cached, tree-shakeable)
- **File size**: Free Solid = ~900KB, but only loads icons you use with NPM

---

## Troubleshooting

### Icons not showing (□ squares)
1. Check network tab for failed FA CSS load
2. Verify CDN link or npm package installed
3. Clear browser cache and hard reload

### Icons too small/large
Use Tailwind text utilities:
```tsx
className="text-sm"   // Small
className="text-lg"   // Large
className="text-2xl"  // Extra large
```

### Icons wrong color
Font Awesome inherits text color:
```tsx
className="text-[#F16022]"  // Orange
className="text-gray-500"   // Gray
```

---

## Alternative: Replace with Lucide (Already in Project)

If Font Awesome isn't needed elsewhere, you can replace FA icons with Lucide:

```tsx
import {
  Sparkles,      // fa-sparkles
  Calculator,    // fa-calculator
  X,             // fa-times
  CheckCircle,   // fa-check-circle
  ArrowRight     // fa-arrow-right
} from 'lucide-react';

// Usage:
<Sparkles className="text-[#F16022] text-lg" />
<Calculator className="text-lg" />
```

**Update component imports and replace all `<i>` tags with Lucide components.**

---

## Recommendation

For this project, use **CDN for quick testing**, then migrate to **NPM for production**.


