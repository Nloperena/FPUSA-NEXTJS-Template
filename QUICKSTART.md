# 🚀 Quick Start Guide

## Get Running in 3 Steps

### Step 1: Install Dependencies
```bash
cd "Next.js template"
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
Next.js template/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies & scripts
│   ├── tsconfig.json             # TypeScript config
│   ├── next.config.mjs           # Next.js config
│   ├── tailwind.config.ts        # Tailwind config
│   ├── postcss.config.js         # PostCSS config
│   ├── components.json           # shadcn/ui config
│   └── .eslintrc.json            # ESLint rules
│
├── 📚 Documentation
│   ├── README.md                 # Project overview
│   ├── SETUP.md                  # Detailed setup guide
│   ├── MIGRATION_GUIDE.md        # React Router → Next.js
│   ├── PROJECT_SUMMARY.md        # What's included
│   └── QUICKSTART.md             # This file
│
├── 📂 src/
│   │
│   ├── 📂 app/ (Next.js App Router)
│   │   ├── layout.tsx            # Root layout (Header + Footer)
│   │   ├── page.tsx              # Home page (/)
│   │   ├── globals.css           # Global styles
│   │   │
│   │   ├── 📂 about/
│   │   │   └── page.tsx          # About page (/about)
│   │   │
│   │   ├── 📂 contact/
│   │   │   └── page.tsx          # Contact page (/contact)
│   │   │
│   │   ├── 📂 industries/
│   │   │   └── page.tsx          # Industries page (/industries)
│   │   │
│   │   └── 📂 products/
│   │       └── page.tsx          # Products page (/products)
│   │
│   ├── 📂 components/
│   │   ├── Header.tsx            # Site header
│   │   ├── Footer.tsx            # Site footer
│   │   ├── theme-provider.tsx   # Dark mode provider
│   │   │
│   │   └── 📂 ui/
│   │       ├── button.tsx        # Button component
│   │       ├── input.tsx         # Input component
│   │       └── textarea.tsx      # Textarea component
│   │
│   └── 📂 lib/
│       └── utils.ts              # Utility functions
│
└── 📂 public/
    ├── 📂 images/                # Your images here
    ├── 📂 fonts/                 # Custom fonts here
    └── placeholder.svg           # Placeholder image

```

---

## 🎯 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

---

## 🎨 Using Brand Colors

### In Tailwind Classes
```tsx
<div className="bg-forza-primary">      {/* Blue background */}
<div className="text-forza-accent">     {/* Orange text */}
<div className="border-forza-accent">   {/* Orange border */}
```

### Color Values
- **Regal Blue**: `#115B87` → `bg-forza-primary`
- **Blaze Orange**: `#F16022` → `bg-forza-accent`

---

## 🧩 Adding More UI Components

Install shadcn/ui components as needed:

```bash
# Dialog/Modal
npx shadcn-ui@latest add dialog

# Card component
npx shadcn-ui@latest add card

# Accordion
npx shadcn-ui@latest add accordion

# Tabs
npx shadcn-ui@latest add tabs

# Toast notifications
npx shadcn-ui@latest add toast

# Carousel
npx shadcn-ui@latest add carousel
```

---

## 📄 Creating New Pages

### Simple Page
Create `src/app/my-page/page.tsx`:

```tsx
export const metadata = {
  title: 'My Page | ForzaBuilt',
  description: 'Page description',
};

export default function MyPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-forza-primary">
          My Page
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          Page content goes here
        </p>
      </div>
    </div>
  );
}
```

### Dynamic Page
Create `src/app/product/[id]/page.tsx`:

```tsx
interface PageProps {
  params: { id: string };
}

export default function ProductPage({ params }: PageProps) {
  return <div>Product ID: {params.id}</div>;
}
```

---

## 🔗 Navigation

### Link Component
```tsx
import Link from 'next/link';

<Link href="/products">Products</Link>
```

### Programmatic Navigation
```tsx
"use client";

import { useRouter } from 'next/navigation';

export default function MyComponent() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/products');
  };
  
  return <button onClick={handleClick}>Go to Products</button>;
}
```

---

## 🖼️ Images

### Using Next.js Image
```tsx
import Image from 'next/image';

<Image 
  src="/images/logo.png" 
  alt="Logo"
  width={200}
  height={100}
  priority  // For above-the-fold images
/>
```

---

## 🎭 Client vs Server Components

### Server Component (Default)
```tsx
// No directive needed - server component by default
export default function ServerComponent() {
  // Can fetch data directly
  return <div>Server rendered</div>;
}
```

### Client Component
```tsx
"use client"; // Add this directive

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Use "use client" when you need:**
- useState, useEffect, or other React hooks
- Browser APIs (window, document, etc.)
- Event handlers (onClick, onChange, etc.)

---

## 🚦 Current Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Home page with hero |
| `/products` | `app/products/page.tsx` | Products overview |
| `/industries` | `app/industries/page.tsx` | Industries served |
| `/about` | `app/about/page.tsx` | About ForzaBuilt |
| `/contact` | `app/contact/page.tsx` | Contact form |

---

## ✅ Pre-configured Features

- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Forza brand colors
- ✅ Responsive header with mobile menu
- ✅ Footer with company info
- ✅ Dark mode support
- ✅ SEO optimization
- ✅ Image optimization
- ✅ Path aliases (@/ imports)

---

## 🔧 Common Tasks

### Add a new component
1. Create file in `src/components/MyComponent.tsx`
2. Import where needed: `import MyComponent from '@/components/MyComponent'`

### Add a new page
1. Create folder in `src/app/my-page/`
2. Add `page.tsx` inside
3. Access at `/my-page`

### Add global styles
Edit `src/app/globals.css`

### Update navigation
Edit `src/components/Header.tsx`

### Update footer
Edit `src/components/Footer.tsx`

---

## 🐛 Troubleshooting

### Port already in use
```bash
npm run dev -- -p 3001
```

### Clear cache and reinstall
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Module not found
```bash
npm install
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org/docs)

---

## 🎉 You're Ready!

Your Next.js template is ready to go. Start building! 🚀

**Need detailed help?**
- Setup issues → Read `SETUP.md`
- Migration help → Read `MIGRATION_GUIDE.md`
- Full overview → Read `PROJECT_SUMMARY.md`




