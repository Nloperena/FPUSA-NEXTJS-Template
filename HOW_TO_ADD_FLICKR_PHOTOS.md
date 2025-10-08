# 📸 How to Add Your Flickr Photos

Your Flickr account has **12,174 photos** available at:
https://www.flickr.com/photos/furniturepackagesusa/

## 🔑 Option 1: Use Flickr API (Recommended)

### Step 1: Get API Key
1. Visit: https://www.flickr.com/services/apps/create/apply/
2. Apply for a non-commercial API key (it's free)
3. You'll get an API Key and Secret

### Step 2: Get Your Photos
Use this API endpoint:
```
https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=YOUR_API_KEY&user_id=furniturepackagesusa&format=json&nojsoncallback=1&per_page=500
```

Replace `YOUR_API_KEY` with your actual key.

### Step 3: Add Photos to Your Site
Edit `src/data/flickr-portfolio.ts` and add the photo URLs.

---

## 🖼️ Option 2: Manual Method

### Get Photo URLs from Your Flickr Page

1. **Visit your Flickr page**: https://www.flickr.com/photos/furniturepackagesusa/
2. **Right-click on any photo** → Open in new tab
3. **Right-click the large image** → Copy image address
4. **The URL will look like**: `https://live.staticflickr.com/xxxxx/xxxxx_xxxxx.jpg`

### Example Photo URL Format
```
https://live.staticflickr.com/65535/52422920691_a68c04a151_k.jpg
```

---

## 📝 Adding Photos to Your Site

Edit `src/data/flickr-portfolio.ts`:

```typescript
export const flickrPhotos: FlickrPhoto[] = [
  {
    id: "1",
    title: "Superhero Themed Bedroom",
    url: "https://live.staticflickr.com/xxxxx/xxxxx.jpg",
    category: "Kids Rooms"
  },
  {
    id: "2",
    title: "Modern Living Room",
    url: "https://live.staticflickr.com/xxxxx/xxxxx.jpg",
    category: "Living Spaces"
  },
  // Add more photos...
];
```

---

## 🎯 Quick Start with Sample Photos

I've created a portfolio page at `/flickr-portfolio` with:
- Parallax scrolling grid (like the designs page)
- Sample photos as placeholders
- Ready to accept your Flickr photos

### To View It:
```bash
npm run dev
```

Visit: [http://localhost:3000/flickr-portfolio](http://localhost:3000/flickr-portfolio)

---

## 📊 Flickr API Response Example

When you call the API, you'll get:

```json
{
  "photos": {
    "photo": [
      {
        "id": "52422920691",
        "title": "Living Room",
        "url_k": "https://live.staticflickr.com/65535/52422920691_a68c04a151_k.jpg"
      }
    ]
  }
}
```

---

## 🚀 Recommended Approach

1. **Get API key** from Flickr (5 minutes)
2. **Call the API** to get all 12,174 photo URLs
3. **Copy/paste** the URLs into `flickr-portfolio.ts`
4. **Deploy** your site with all photos

---

## ⚠️ Important

- Don't scrape Flickr (violates their terms of service)
- Use their free API instead (it's designed for this!)
- You can get up to 500 photos per API call
- Make multiple calls to get all 12,174 photos

---

## 💡 Alternative: Embed Flickr

You can also embed your Flickr gallery directly:

```tsx
<iframe 
  src="https://www.flickr.com/photos/furniturepackagesusa/embed" 
  width="100%" 
  height="800px"
/>
```

---

**Your portfolio page is ready - just add your Flickr photo URLs!** 📸




