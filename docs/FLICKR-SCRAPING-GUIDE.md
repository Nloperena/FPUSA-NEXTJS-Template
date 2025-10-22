# 🔍 Flickr Album Scraping Guide

Complete guide to scraping your Flickr album photos and updating the project data.

---

## 📋 **Method 1: Browser Console (Easiest)**

### Step 1: Open Flickr Album
Visit each of these URLs in your browser:

#### Highlight Projects:
1. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456
2. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720300655381
3. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720309667386
4. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720313910761
5. https://www.flickr.com/photos/furniturepackagesusa/albums/72157710133541282
6. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720320587147

#### Standard Projects:
7. https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016
8. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720303794132
9. https://www.flickr.com/photos/furniturepackagesusa/albums/72157711887679752
10. https://www.flickr.com/photos/furniturepackagesusa/albums/72157710956178362

### Step 2: Open Browser Console
- **Windows/Linux**: Press `F12` or `Ctrl+Shift+J`
- **Mac**: Press `Cmd+Option+J`

### Step 3: Run Scraper Script
1. Open `scripts/browser-scraper.js`
2. Copy all the code
3. Paste into browser console
4. Press `Enter`

### Step 4: Save Output
- Data is **automatically copied** to your clipboard!
- Paste into a text file: `album-[number].json`
- Repeat for all 10 albums

---

## 🤖 **Method 2: Node.js Automation (Full Automation)**

### Step 1: Run the Scraper
```bash
cd FPUSA-NEXTJS-Template
node scripts/scrape-flickr-albums.js
```

### Step 2: Wait for Completion
- Script will fetch all 10 albums automatically
- Takes ~20-30 seconds (2-second delay between requests)
- Outputs:
  - `src/data/scraped-flickr-projects.json` (raw data)
  - `src/data/flickr-projects-scraped.ts` (ready-to-use TypeScript)

### Step 3: Replace Current Data
```bash
# Backup current file
mv src/data/flickr-projects-full.ts src/data/flickr-projects-full-backup.ts

# Use scraped data
mv src/data/flickr-projects-scraped.ts src/data/flickr-projects-full.ts
```

---

## 📊 **What Gets Scraped**

For each album, you'll get:

```json
{
  "id": "72177720316430456",
  "title": "Champions Gate Luxury Estate",
  "albumUrl": "https://www.flickr.com/...",
  "photoCount": 25,
  "coverPhoto": "https://live.staticflickr.com/...",
  "photos": [
    {
      "id": "53675134748",
      "title": "Living Room",
      "url": "https://live.staticflickr.com/65535/53675134748_abc123_b.jpg",
      "urlLarge": "https://live.staticflickr.com/65535/53675134748_abc123_k.jpg",
      "secret": "abc123",
      "server": "65535",
      "farm": 66,
      "width": 1024,
      "height": 768
    }
    // ... more photos
  ]
}
```

---

## 🔧 **Manual Data Entry (If Scripts Fail)**

If automation doesn't work, manually extract photo URLs:

### Step 1: Visit Album Page
Go to any Flickr album URL

### Step 2: View Photo Source
1. Right-click on a photo
2. Select "Open image in new tab"
3. Copy URL from address bar

### Step 3: Update Data File
Edit `src/data/flickr-projects-full.ts`:

```typescript
{
  id: 'project-1',
  title: 'Your Project Name',
  location: 'Orlando, FL',
  category: 'highlight',
  albumUrl: 'https://www.flickr.com/photos/.../albums/...',
  coverPhoto: 'PASTE_FIRST_PHOTO_URL_HERE',
  description: 'Your description',
  photos: [
    { 
      id: '1', 
      url: 'PASTE_PHOTO_URL_HERE', 
      title: 'Living Room', 
      width: 1024, 
      height: 768 
    },
    // Add more photos...
  ]
}
```

---

## 🎯 **Photo URL Format**

Flickr photo URLs follow this pattern:
```
https://live.staticflickr.com/[server]/[photo-id]_[secret]_[size].jpg
```

**Size codes:**
- `_b.jpg` = Large (1024px) ← **Use this for main display**
- `_k.jpg` = Large 2048 (2048px)
- `_o.jpg` = Original size
- `_c.jpg` = Medium 800 (800px)

**Example:**
```
https://live.staticflickr.com/65535/53675134748_1b70d631f4_b.jpg
                              ↑       ↑              ↑       ↑
                           server  photo-id       secret  size
```

---

## ✅ **Verification Checklist**

After scraping, verify:

- [ ] All 10 albums scraped
- [ ] Each album has 4-25+ photos
- [ ] Cover photos load correctly
- [ ] Photo URLs are valid (test in browser)
- [ ] Titles are descriptive
- [ ] No broken links

---

## 🚀 **Testing Scraped Data**

### Step 1: Update Import
In `src/app/page.tsx`:
```typescript
import { projects } from '@/data/flickr-projects-full';
```

### Step 2: Restart Dev Server
```bash
npm run dev
```

### Step 3: Check Browser
1. Navigate to homepage
2. Scroll to "Our Projects V3"
3. Verify photos load
4. Click any project → Gallery modal
5. Check all photos appear

---

## 🐛 **Troubleshooting**

### Images Not Loading
- **Problem**: 404 errors on photo URLs
- **Solution**: Check photo IDs and secrets are correct

### Script Errors
- **Problem**: Node script fails
- **Solution**: Run browser method instead (more reliable)

### Wrong Album Title
- **Problem**: Generic title like "Album"
- **Solution**: Manually set title in scraped data

### Missing Photos
- **Problem**: Only 1-2 photos extracted
- **Solution**: 
  1. Make sure album is public
  2. Try browser method
  3. Manually extract URLs

---

## 📝 **Example Output**

After scraping, your data will look like:

```typescript
export const projects: Project[] = [
  {
    id: '72177720316430456',
    title: 'Luxury Vacation Home - Champions Gate',
    location: 'Champions Gate, FL',
    category: 'highlight',
    albumUrl: 'https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456',
    coverPhoto: 'https://live.staticflickr.com/65535/53675134748_1b70d631f4_b.jpg',
    description: 'Complete luxury transformation...',
    photos: [
      { id: '53675134748', url: 'https://live.staticflickr.com/65535/53675134748_1b70d631f4_b.jpg', title: 'Living Room', width: 1024, height: 768 },
      { id: '53675267494', url: 'https://live.staticflickr.com/65535/53675267494_84d1e7a0a0_b.jpg', title: 'Kitchen', width: 1024, height: 768 },
      // ... more photos
    ]
  },
  // ... 9 more projects
];
```

---

## 🎉 **You're Done!**

Once all albums are scraped:
1. Real Flickr photos will display in parallax section
2. Gallery modal shows actual project photos
3. No more Unsplash placeholders!

---

## 💡 **Pro Tips**

- **Batch Processing**: Open all 10 tabs, run browser scraper on each
- **Naming**: Use descriptive titles (helps with SEO)
- **Order**: Keep highlight projects first (7), then standard (4)
- **Quality**: Use `_b.jpg` size for good balance of quality/speed

---

**Need help?** Check the scripts folder for examples:
- `scripts/browser-scraper.js` - Browser console script
- `scripts/scrape-flickr-albums.js` - Node.js automation


