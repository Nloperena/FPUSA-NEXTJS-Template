# 📦 Asset Copy Guide

## Quick Copy Commands

Run these commands from the **ForzaBuilt** root directory:

### Windows PowerShell

```powershell
# Navigate to the root directory
cd "C:\Users\nimro\Downloads\01_Projects\BusinessProjects\Forza\ForzaBuilt"

# Copy videos
Copy-Item "WebsiteRebuild2\ForzaBuilt.com\public\*.mp4" "Next.js template\public\" -Force

# Copy product images folder
Copy-Item "WebsiteRebuild2\ForzaBuilt.com\public\product-images" "Next.js template\public\" -Recurse -Force

# Copy logos folder
Copy-Item "WebsiteRebuild2\ForzaBuilt.com\public\logos" "Next.js template\public\" -Recurse -Force

# Copy gradients folder
Copy-Item "WebsiteRebuild2\ForzaBuilt.com\public\Gradients and Triangles" "Next.js template\public\" -Recurse -Force

# Copy PNG images
Copy-Item "WebsiteRebuild2\ForzaBuilt.com\public\*.png" "Next.js template\public\" -Force

# Copy SVG images
Copy-Item "WebsiteRebuild2\ForzaBuilt.com\public\*.svg" "Next.js template\public\" -Force
```

### Linux / Mac / Git Bash

```bash
# Navigate to the root directory
cd ~/Downloads/01_Projects/BusinessProjects/Forza/ForzaBuilt

# Copy videos
cp WebsiteRebuild2/ForzaBuilt.com/public/*.mp4 "Next.js template/public/"

# Copy product images folder
cp -r WebsiteRebuild2/ForzaBuilt.com/public/product-images "Next.js template/public/"

# Copy logos folder
cp -r WebsiteRebuild2/ForzaBuilt.com/public/logos "Next.js template/public/"

# Copy gradients folder
cp -r "WebsiteRebuild2/ForzaBuilt.com/public/Gradients and Triangles" "Next.js template/public/"

# Copy PNG images
cp WebsiteRebuild2/ForzaBuilt.com/public/*.png "Next.js template/public/"

# Copy SVG images
cp WebsiteRebuild2/ForzaBuilt.com/public/*.svg "Next.js template/public/"
```

## 📋 Required Assets

### Videos (Essential)
- ✅ `ForzaLionLoop-1-2.mp4` - Hero video
- ✅ `forzaTRuck2-Compressed.mp4` - Transportation
- ✅ `ForzaBoatLoop-Compressed.mp4` - Marine
- ✅ `Final-Construction-Page-Banner-Video-1.mp4` - Construction
- ✅ `Final-Industrial-Page-Banner-Video.mp4` - Industrial
- ✅ `ForzaTurbineLoop-Compressed.mp4` - Composites
- ✅ `Final-Forza-Insulation-Header-Video_1.mp4` - Insulation

### Logos (Essential)
- ✅ `logos/Transportation-Icon-2.png`
- ✅ `logos/Marine-Icon.png`
- ✅ `logos/Construction-Icon.png`
- ✅ `logos/Industrial-Icon.png`
- ✅ `logos/Composite-Icon.png`
- ✅ `logos/Insulation-Icon.png`

### Images (Essential)
- ✅ `Industrail Bundle HeroImg.png` - For light2 mode
- ✅ `Forza-Bond-Product-Line.png` - Products section
- ✅ `Forza-Seal-Product-Line.png` - Products section
- ✅ `tape-lineup-final-1.png` - Products section

### Background Assets (Essential)
- ✅ `Gradients and Triangles/Small Science Triangles.png`
- ✅ `Gradients and Triangles/Small Science Triangles 2.png`

### Optional (For full site)
- Product images folder (163 files)
- All other PNG/SVG files

## ✅ Verification Checklist

After copying, verify these files exist:

```
Next.js template/public/
├── ForzaLionLoop-1-2.mp4                           ✅
├── forzaTRuck2-Compressed.mp4                      ✅
├── ForzaBoatLoop-Compressed.mp4                    ✅
├── Final-Construction-Page-Banner-Video-1.mp4      ✅
├── Final-Industrial-Page-Banner-Video.mp4          ✅
├── ForzaTurbineLoop-Compressed.mp4                 ✅
├── Final-Forza-Insulation-Header-Video_1.mp4       ✅
├── Industrail Bundle HeroImg.png                   ✅
├── Forza-Bond-Product-Line.png                     ✅
├── Forza-Seal-Product-Line.png                     ✅
├── tape-lineup-final-1.png                         ✅
├── logos/
│   ├── Transportation-Icon-2.png                   ✅
│   ├── Marine-Icon.png                             ✅
│   ├── Construction-Icon.png                       ✅
│   ├── Industrial-Icon.png                         ✅
│   ├── Composite-Icon.png                          ✅
│   └── Insulation-Icon.png                         ✅
└── Gradients and Triangles/
    ├── Small Science Triangles.png                 ✅
    └── Small Science Triangles 2.png               ✅
```

## 🚀 After Copying

1. **Install dependencies:**
   ```bash
   cd "Next.js template"
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   http://localhost:3000

## 🐛 Troubleshooting

**Videos not playing:**
- Check if .mp4 files are in `public/` folder
- Check browser console for 404 errors
- Verify file names match exactly (case-sensitive)

**Logos not showing:**
- Verify `public/logos/` folder exists
- Check file extensions (.png not .PNG)

**Gradients missing:**
- Check folder name is exact: `Gradients and Triangles`
- Verify both triangle images are present

## 📊 File Sizes (Approximate)

- Videos: ~50-100MB total
- Logos: ~1-2MB total
- Product images: ~50MB (if copying all)
- Gradients: ~500KB

**Total essential assets: ~60-80MB**

## ✅ Quick Test

After copying and running, test:

1. ✅ Hero video plays
2. ✅ Industries section shows 6 cards with logos
3. ✅ Hover over industry cards plays videos
4. ✅ Theme switcher buttons appear (bottom-right, after 2 seconds)
5. ✅ Switch between Dark/Light/Light 2.0 modes
6. ✅ Products section shows 3 product lines

If all tests pass, you're ready to go! 🎉




