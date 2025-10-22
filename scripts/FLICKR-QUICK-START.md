# Quick Start: Extract Flickr Photos

## ✅ EASIEST METHOD (Recommended)

### Step 1: Get the HTML
1. Open one of your Flickr album links in Chrome/Edge
2. Press `Ctrl+U` (or `Cmd+Option+U` on Mac) to view page source
3. Press `Ctrl+A` to select all, then `Ctrl+C` to copy

### Step 2: Paste and Extract
1. Open `paste-html-here.js`
2. Find the line that says `PASTE THE FULL HTML HERE`
3. Replace it with your copied HTML (between the backticks)
4. Update the `ALBUM_INFO` section with the correct album details:
   ```javascript
   const ALBUM_INFO = {
     id: 'your-album-id',
     title: 'Your Album Title',
     location: 'Location, FL',
     category: 'highlight' // or 'standard'
   };
   ```

### Step 3: Run the Script
```bash
node FPUSA-NEXTJS-Template/scripts/paste-html-here.js
```

The script will output:
- ✅ All photo URLs found
- ✅ A complete TypeScript object you can copy directly into your project

### Step 4: Add to Project
1. The script will print a TypeScript object
2. Copy that object
3. Add it to the `projects` array in `src/data/flickr-projects-full.ts`

---

## 🔄 Repeat for All Albums

Do this for each of the 11 Flickr albums:

**Highlight Projects:**
1. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456
2. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720300655381
3. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720309667386
4. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720313910761
5. https://www.flickr.com/photos/furniturepackagesusa/albums/72157710133541282
6. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720320587147
7. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720316430456

**Standard Projects:**
8. https://www.flickr.com/photos/furniturepackagesusa/albums/72157719863774016
9. https://www.flickr.com/photos/furniturepackagesusa/albums/72177720303794132
10. https://www.flickr.com/photos/furniturepackagesusa/albums/72157711887679752
11. https://www.flickr.com/photos/furniturepackagesusa/albums/72157710956178362

---

## 📝 Example Usage

### Input (in paste-html-here.js):
```javascript
const HTML_CONTENT = `
<!DOCTYPE html>
<html>
... your copied Flickr HTML ...
</html>
`;

const ALBUM_INFO = {
  id: 'champions-gate-luxury',
  title: 'Champions Gate Luxury Estate',
  location: 'Champions Gate, FL',
  category: 'highlight'
};
```

### Output:
```typescript
{
  "id": "champions-gate-luxury",
  "title": "Champions Gate Luxury Estate",
  "location": "Champions Gate, FL",
  "category": "highlight",
  "albumUrl": "YOUR_FLICKR_ALBUM_URL",
  "coverPhoto": "https://live.staticflickr.com/65535/53675134748_abc123_b.jpg",
  "description": "Complete vacation rental transformation...",
  "photos": [
    {
      "id": "photo-1",
      "url": "https://live.staticflickr.com/65535/53675134748_abc123_b.jpg",
      "title": "Champions Gate Luxury Estate - Photo 1",
      "width": 1024,
      "height": 683
    },
    // ... more photos
  ]
}
```

---

## 🚀 After Extracting All Albums

Once you have all 11 project objects, open `src/data/flickr-projects-full.ts` and replace the `projects` array with your extracted data.

Then the photos will automatically appear in the parallax section on your homepage!

---

## 💡 Tips

- **High Resolution**: The script automatically uses `_b.jpg` size (1024px width) for best quality
- **Duplicates**: The script removes duplicate photos automatically
- **Missing Photos**: If no photos are found, make sure you copied the COMPLETE page source
- **Album URL**: Don't forget to update the `albumUrl` field after extracting!


