# ForzaBuilt Next.js Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager

## Installation Steps

### 1. Install Dependencies

Open your terminal in the project root and run:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory (optional for now):

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=https://api.example.com
```

### 3. Copy Assets from WebsiteRebuild2

You'll need to copy some assets from the original project:

#### Copy Images
```bash
# Copy product images
cp -r ../WebsiteRebuild2/ForzaBuilt.com/public/product-images ./public/

# Copy logos
cp -r ../WebsiteRebuild2/ForzaBuilt.com/public/logos ./public/

# Copy any other needed images
cp ../WebsiteRebuild2/ForzaBuilt.com/public/*.png ./public/
cp ../WebsiteRebuild2/ForzaBuilt.com/public/*.svg ./public/
```

#### Copy Fonts (if using custom fonts)
```bash
cp -r ../WebsiteRebuild2/ForzaBuilt.com/public/fonts/* ./public/fonts/
```

### 4. Run Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

To create a production build:

```bash
npm run build
npm start
```

## Project Structure

```
Next.js template/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── industries/        # Industries page
│   │   └── products/          # Products page
│   ├── components/            # React components
│   │   ├── ui/               # UI components (shadcn)
│   │   ├── Header.tsx        # Site header
│   │   ├── Footer.tsx        # Site footer
│   │   └── theme-provider.tsx
│   └── lib/                  # Utility functions
│       └── utils.ts
├── public/                    # Static assets
│   ├── images/
│   └── fonts/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Key Features

### What's Included

✅ **Next.js 14 with App Router** - Modern React framework
✅ **TypeScript** - Type safety throughout
✅ **Tailwind CSS** - Utility-first styling
✅ **shadcn/ui Components** - High-quality UI components
✅ **Responsive Design** - Mobile-first approach
✅ **SEO Optimized** - Meta tags and proper structure
✅ **Dark Mode Support** - Theme provider included

### Essential Components

- **Button** - Primary UI button component
- **Input** - Form input component
- **Textarea** - Form textarea component
- **Header** - Site navigation with mobile menu
- **Footer** - Site footer with company info

### Pages Included

1. **Home** (`/`) - Landing page with hero section
2. **Products** (`/products`) - Products overview
3. **Industries** (`/industries`) - Industries served
4. **About** (`/about`) - About the company
5. **Contact** (`/contact`) - Contact form

## Adding More Components

### Using shadcn/ui

To add more components from shadcn/ui:

```bash
npx shadcn-ui@latest add [component-name]
```

Example:
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add accordion
```

## Migrating Additional Features

### To Add Components from WebsiteRebuild2

1. **Copy the component file** to `src/components/`
2. **Update imports**:
   - Change `@/components/...` paths if needed
   - Remove React Router imports, use Next.js `Link` instead
   - Replace `useNavigate()` with Next.js navigation

3. **Convert React Router to Next.js**:
   ```tsx
   // Before (React Router)
   import { Link } from 'react-router-dom';
   
   // After (Next.js)
   import Link from 'next/link';
   ```

4. **Handle Client Components**:
   - Add `"use client"` directive at the top if using hooks or browser APIs

### Example Migration

```tsx
// WebsiteRebuild2 component
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function MyComponent() {
  const [state, setState] = useState(false);
  return <Link to="/page">Link</Link>;
}

// Next.js version
"use client"; // Add this for useState

import Link from 'next/link';
import { useState } from 'react';

export default function MyComponent() {
  const [state, setState] = useState(false);
  return <Link href="/page">Link</Link>;
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Deploy automatically

### Other Platforms

- **Netlify**: Supports Next.js
- **AWS Amplify**: Full Next.js support
- **Self-hosted**: Use `npm run build` and `npm start`

## Customization

### Brand Colors

Brand colors are defined in `src/app/globals.css`:

```css
--forza-regal-blue: #115B87;
--forza-blaze-orange: #F16022;
--forza-blue-velvet: #115B87;
--forza-slate-grey: #BFBFBF;
```

Use them with Tailwind classes:
- `text-forza-primary`
- `text-forza-accent`
- `bg-forza-primary`
- `bg-forza-accent`

### Fonts

The project uses:
- **Poppins** - Primary font (loaded from Google Fonts)
- **Inter** - Secondary font (loaded from Google Fonts)

Add custom fonts in `public/fonts/` and update `src/app/layout.tsx`

## Troubleshooting

### Common Issues

**Issue**: Module not found errors
**Solution**: Run `npm install` again

**Issue**: Port already in use
**Solution**: Change port with `npm run dev -- -p 3001`

**Issue**: Images not loading
**Solution**: Ensure images are in `public/` directory

## Support

For questions or issues:
- Email: info@forzabuilt.com
- Phone: (712) 482-4400

## Next Steps

1. ✅ Install dependencies
2. ✅ Copy necessary assets
3. ✅ Run development server
4. 🔄 Migrate additional components as needed
5. 🔄 Add product data
6. 🔄 Configure API endpoints
7. 🔄 Deploy to production

---

**Happy Coding! 🚀**




