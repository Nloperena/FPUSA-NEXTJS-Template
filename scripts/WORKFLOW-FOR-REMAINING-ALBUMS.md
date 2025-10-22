# Workflow for Remaining 10 Albums

## ✅ Album 1 Complete!
- **Champions Gate Luxury Estate** - 58 photos scraped and integrated

---

## 📋 For Each Remaining Album:

### Step 1: Get the HTML
1. Go to the Flickr album URL
2. Wait for ALL photos to load (scroll down)
3. Press **Ctrl+U** (View Page Source)
4. Press **Ctrl+A** then **Ctrl+C** (Copy All)

### Step 2: Save as HTML File
1. Create a new file: `album2.html` (or `album3.html`, etc.)
2. Paste the HTML content
3. Save in the `scripts/` folder

### Step 3: Update Album Info
Edit `scrape-from-file.js` and update the `ALBUM_INFO` section:
```javascript
const ALBUM_INFO = {
  id: 'windsor-resort',                    // ← Update ID
  title: 'Windsor Resort Estate',          // ← Update Title
  location: 'Windsor, FL',                 // ← Update Location
  category: 'highlight',                   // ← 'highlight' or 'standard'
  albumUrl: 'https://www.flickr.com/...'   // ← Update URL
};

// Update this line too:
const HTML_FILE = 'album2.html';           // ← Update filename
```

### Step 4: Run the Script
```bash
node FPUSA-NEXTJS-Template/scripts/scrape-from-file.js
```

You'll see output like:
```
✓ Found 42 photos

📋 TYPESCRIPT OBJECT (COPY THIS)

{
  "id": "windsor-resort",
  "title": "Windsor Resort Estate",
  ...
}
```

### Step 5: Copy the JSON
Copy the entire JSON object from the output

### Step 6: Update flickr-projects-full.ts
Open `src/data/flickr-projects-full.ts` and replace the corresponding project entry with your copied JSON

---

## 📝 Remaining Albums Checklist:

- [x] **Album 1**: Champions Gate Luxury (✅ DONE - 58 photos)
- [ ] **Album 2**: Windsor Resort - https://www.flickr.com/photos/furniturepackagesusa/albums/72177720300655381
- [ ] **Album 3**: Reunion Paradise - https://www.flickr.com/photos/furniturepackagesusa/albums/72177720309667386
- [ ] **Album 4**: Storey Lake - https://www.flickr.com/photos/furniturepackagesusa/albums/72177720313910761
- [ ] **Album 5**: Orlando Villa - https://www.flickr.com/photos/furniturepackagesusa/albums/72157710133541282
- [ ] **Album 6**: Kissimmee Estate - https://www.flickr.com/photos/furniturepackagesusa/albums/72177720320587147
- [ ] **Album 7**: Vacation Home 1 - https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016
- [ ] **Album 8**: Vacation Home 2 - https://www.flickr.com/photos/furniturepackagesusa/albums/72177720303794132
- [ ] **Album 9**: Vacation Home 3 - https://www.flickr.com/photos/furniturepackagesusa/albums/72157711887679752
- [ ] **Album 10**: Vacation Home 4 - https://www.flickr.com/photos/furniturepackagesusa/albums/72157710956178362

---

## 💡 Pro Tips

- **HTML File Size**: Each HTML file should be 300-600 KB
- **Photo Count**: Most albums have 20-60 photos
- **If No Photos Found**: Make sure you scrolled down on Flickr to load all photos before copying the HTML
- **Keep Files Organized**: Name files album2.html, album3.html, etc.
- **Batch Processing**: You can scrape 2-3 albums, then update the TypeScript file all at once

---

## 🎯 When You're Done

Once all 11 albums are scraped, your homepage will display:
- ✅ Real Flickr photos in the 3D parallax section
- ✅ Working modal galleries with all photos
- ✅ High-resolution images (1024px)
- ✅ Proper metadata for SEO

Your "Our Projects" section will look amazing! 🚀


