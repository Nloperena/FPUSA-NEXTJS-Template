#!/usr/bin/env node

/**
 * Setup script for Why Choose Us component images
 * Generates placeholder images and directory structure
 *
 * Usage: node scripts/setup-why-us-images.js
 */

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images/why');

// Create directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`✓ Created directory: ${imagesDir}`);
} else {
  console.log(`✓ Directory exists: ${imagesDir}`);
}

// Generate placeholder images using a simple canvas-based approach
// These are minimal WebP placeholders that can be replaced with real images

const createPlaceholderInfo = (number, title) => `
This is a placeholder image for Why Choose Us card #${number}
Title: ${title}

Replace this with actual image content.
Recommended size: 1200x800px or larger
Formats: WebP (.webp) and AVIF (.avif)

Cards:
01 - Industry Veteran (22+ Years of Excellence)
02 - Client Trusted (5-Star Client Reviews)
03 - Tailored Approach (Custom Design Solutions)
04 - Guaranteed Quality (Quality & Reliability)
05 - No Extra Cost (Free Professional Photography)
06 - Social Impact (Giving Back to Community)
`;

const cardDescriptions = [
  { num: '01', title: 'Industry Veteran - 22+ Years of Excellence' },
  { num: '02', title: 'Client Trusted - 5-Star Client Reviews' },
  { num: '03', title: 'Tailored Approach - Custom Design Solutions' },
  { num: '04', title: 'Guaranteed Quality - Quality & Reliability' },
  { num: '05', title: 'No Extra Cost - Free Professional Photography' },
  { num: '06', title: 'Social Impact - Giving Back to Community' },
];

// Create placeholder text files for each layer
cardDescriptions.forEach(({ num, title }) => {
  const bgFile = path.join(imagesDir, `bg-${num}.placeholder.txt`);
  const midFile = path.join(imagesDir, `mid-${num}.placeholder.txt`);

  if (!fs.existsSync(bgFile)) {
    fs.writeFileSync(bgFile, createPlaceholderInfo(num, `${title} - Background Layer`));
    console.log(`✓ Created: ${path.basename(bgFile)}`);
  }

  if (!fs.existsSync(midFile)) {
    fs.writeFileSync(midFile, createPlaceholderInfo(num, `${title} - Mid Layer`));
    console.log(`✓ Created: ${path.basename(midFile)}`);
  }
});

// Create a manifest file
const manifestContent = `# Why Choose Us Component - Image Assets Manifest

## Required Images

This directory should contain the following image pairs for the Why Choose Us component:

### Background Layers (BG)
- bg-01.webp (+ .avif)  - Industry Veteran: 22+ Years of Excellence
- bg-02.webp (+ .avif)  - Client Trusted: 5-Star Client Reviews
- bg-03.webp (+ .avif)  - Tailored Approach: Custom Design Solutions
- bg-04.webp (+ .avif)  - Guaranteed Quality: Quality & Reliability
- bg-05.webp (+ .avif)  - No Extra Cost: Free Professional Photography
- bg-06.webp (+ .avif)  - Social Impact: Giving Back to Community

### Mid Layers (Vignettes/Textures)
- mid-01.webp (+ .avif) - Industry Veteran vignette
- mid-02.webp (+ .avif) - Client Trusted vignette
- mid-03.webp (+ .avif) - Tailored Approach vignette
- mid-04.webp (+ .avif) - Guaranteed Quality vignette
- mid-05.webp (+ .avif) - No Extra Cost vignette
- mid-06.webp (+ .avif) - Social Impact vignette

### Foreground Layers (FG)
- Generated in-component as numbered badges (01–06)
- No files required

## Image Specifications

**BG Layers:**
- Dimensions: 1200×800px (or 2x@600×400px for mobile)
- Format: WebP (primary) + AVIF (preferred)
- Opacity in component: 10%
- Content: Room/space hero images relevant to each theme
- Recommendation: Use bright, high-contrast lifestyle photography

**MID Layers:**
- Dimensions: 1200×800px
- Format: WebP + AVIF
- Opacity in component: 15%
- Content: Vignette overlays, texture masks, or subtle gradients
- Recommendation: Dark overlays for depth effect

## Conversion Guide

### Option 1: Using Squoosh (Online, no setup)
1. Visit https://squoosh.app/
2. Upload your image
3. Convert to WebP (quality: 85)
4. Download as .webp
5. Convert again to AVIF (quality: 75)
6. Download as .avif

### Option 2: Using CLI tools
\`\`\`bash
# Install imagemin CLI tools
npm install --save-dev imagemin imagemin-webp imagemin-avif

# Convert PNG images to WebP
npx imagemin public/images/why/*.png --plugin=webp --out-dir=public/images/why/

# Convert PNG images to AVIF
npx imagemin public/images/why/*.png --plugin=avif --out-dir=public/images/why/
\`\`\`

### Option 3: Using ImageMagick (if installed)
\`\`\`bash
# WebP conversion
mogrify -format webp -quality 85 public/images/why/*.jpg

# AVIF conversion
mogrify -format avif -quality 75 public/images/why/*.jpg
\`\`\`

## File Naming Convention

- Always use lowercase
- Always use two-digit card numbers (01, 02, ..., 06)
- Format: \`{layer}-{number}.{format}\`
  - Example: \`bg-01.webp\`, \`mid-03.avif\`

## File Size Targets

Aim for optimal file sizes:
- BG layers: 100–150KB (WebP)
- MID layers: 50–80KB (WebP)
- AVIF versions: 20–30% smaller than WebP

## Testing

Verify images are loading:
1. Open the page in your browser
2. Open DevTools (F12)
3. Go to Network tab
4. Look for \`/images/why/\` requests
5. All 12 images should load successfully
6. Check file sizes and load times

## Additional Notes

- Images use \`loading="lazy"\` for performance
- First panel images can be preloaded in \`<head>\`
- Picture elements provide AVIF/WebP with WebP fallback
- Mobile images reorder (image on left for small screens)
- Parallax layers have will-change optimization

---
Last updated: $(date)
See docs/WHY-CHOOSE-US-GUIDE.md for full component documentation
`;

const manifestFile = path.join(imagesDir, 'README.md');
if (!fs.existsSync(manifestFile)) {
  fs.writeFileSync(manifestFile, manifestContent);
  console.log(`✓ Created: README.md with full setup instructions`);
} else {
  console.log(`✓ README.md already exists`);
}

console.log(`
✅ Setup Complete!

Next steps:
1. Replace placeholder files with actual images:
   - Download or create 6 background images (1200×800px)
   - Create or find 6 vignette overlay images
   
2. Convert images to WebP and AVIF:
   - Use Squoosh (https://squoosh.app/) for easy conversion
   - Or use CLI tools (see README.md for commands)
   
3. Place images in: ${imagesDir}
   - Follow naming convention: bg-01.webp, mid-01.webp, etc.
   
4. Test the component:
   - npm run dev (or your dev command)
   - Navigate to the page with WhyChooseUs component
   - Scroll and verify all 6 cards load properly

For detailed guidance, see:
- ${path.join(imagesDir, 'README.md')}
- docs/WHY-CHOOSE-US-GUIDE.md
`);
