# Migration Guide: React Router to Next.js

This guide helps you migrate components from the WebsiteRebuild2 project (React + Vite + React Router) to this Next.js template.

## Key Differences

### Routing

| React Router | Next.js |
|-------------|---------|
| `<Link to="/page">` | `<Link href="/page">` |
| `useNavigate()` | `useRouter()` from `next/navigation` |
| `useParams()` | `params` prop in page components |
| `useLocation()` | `usePathname()` from `next/navigation` |

### Components

| Feature | React Router | Next.js |
|---------|-------------|---------|
| **Client Components** | Default | Add `"use client"` |
| **Server Components** | N/A | Default in Next.js |
| **Meta Tags** | `<Helmet>` | `export const metadata` |
| **Images** | `<img>` | `<Image>` from `next/image` |

## Step-by-Step Migration

### 1. Converting Pages

#### Before (React Router)
```tsx
// src/pages/Products.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Products = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Products</h1>
      </main>
      <Footer />
    </>
  );
};

export default Products;
```

#### After (Next.js)
```tsx
// src/app/products/page.tsx
export const metadata = {
  title: 'Products | ForzaBuilt',
  description: 'Browse our products',
};

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
    </div>
  );
}
```

> **Note**: Header and Footer are in `layout.tsx`, no need to include them in each page.

### 2. Converting Navigation Links

#### Before
```tsx
import { Link } from 'react-router-dom';

<Link to="/products">Products</Link>
```

#### After
```tsx
import Link from 'next/link';

<Link href="/products">Products</Link>
```

### 3. Converting Dynamic Routes

#### Before (React Router)
```tsx
// Route definition
<Route path="/product/:productId" element={<ProductDetail />} />

// Component
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  return <div>Product: {productId}</div>;
};
```

#### After (Next.js)
```tsx
// File: src/app/product/[productId]/page.tsx
interface PageProps {
  params: { productId: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  return <div>Product: {params.productId}</div>;
}
```

### 4. Converting Client Components

If your component uses:
- `useState`, `useEffect`, or other React hooks
- Browser APIs (window, document, etc.)
- Event handlers

You need to add `"use client"` at the top:

#### Before
```tsx
import { useState } from 'react';

const MyComponent = () => {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(!open)}>Toggle</button>;
};
```

#### After
```tsx
"use client"; // Add this line

import { useState } from 'react';

const MyComponent = () => {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(!open)}>Toggle</button>;
};
```

### 5. Converting Images

#### Before
```tsx
<img src="/logo.png" alt="Logo" />
```

#### After
```tsx
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={200} 
  height={100}
/>
```

### 6. Converting Meta Tags

#### Before (with react-helmet)
```tsx
import { Helmet } from 'react-helmet-async';

const MyPage = () => (
  <>
    <Helmet>
      <title>My Page</title>
      <meta name="description" content="Page description" />
    </Helmet>
    <div>Content</div>
  </>
);
```

#### After (Next.js)
```tsx
export const metadata = {
  title: 'My Page',
  description: 'Page description',
};

export default function MyPage() {
  return <div>Content</div>;
}
```

### 7. Converting Navigation Hooks

#### Before
```tsx
import { useNavigate, useLocation } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goToProducts = () => {
    navigate('/products');
  };
  
  return <div>Current: {location.pathname}</div>;
};
```

#### After
```tsx
"use client";

import { useRouter, usePathname } from 'next/navigation';

const MyComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const goToProducts = () => {
    router.push('/products');
  };
  
  return <div>Current: {pathname}</div>;
};
```

## Component Checklist

When migrating a component, check:

- [ ] Replace React Router `Link` with Next.js `Link`
- [ ] Add `"use client"` if using hooks or browser APIs
- [ ] Update image imports to use Next.js `Image`
- [ ] Convert `useNavigate` to `useRouter`
- [ ] Convert `useParams` to page props
- [ ] Update path references (`/` instead of `#/`)
- [ ] Remove unnecessary Header/Footer imports (in layout)
- [ ] Update meta tags to use Next.js metadata

## Common Patterns

### Loading States

```tsx
"use client";

import { Suspense } from 'react';

export default function MyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
```

### Error Boundaries

Create `error.tsx` in your app directory:

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Loading UI

Create `loading.tsx` in your app directory:

```tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

## Data Fetching

### Client-Side (with useState/useEffect)

```tsx
"use client";

import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data?.name}</div>;
}
```

### Server-Side (recommended)

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function MyPage() {
  const data = await getData();
  return <div>{data.name}</div>;
}
```

## Testing Your Migration

1. ✅ Component renders without errors
2. ✅ Links navigate correctly
3. ✅ Images load properly
4. ✅ Forms submit correctly
5. ✅ No console errors
6. ✅ Mobile responsive
7. ✅ SEO meta tags present

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [shadcn/ui Components](https://ui.shadcn.com)

## Need Help?

If you encounter issues during migration:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review this migration guide
3. Compare with working examples in this template
4. Contact the development team

---

**Good luck with your migration! 🚀**




