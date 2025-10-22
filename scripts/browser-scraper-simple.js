// PASTE THIS INTO BROWSER CONSOLE ON A FLICKR ALBUM PAGE
// Press F12, paste this code, press Enter

(async function() {
  console.clear();
  console.log('%c🔍 FLICKR SCRAPER STARTING...', 'color: #4CAF50; font-size: 20px; font-weight: bold;');
  
  // Get album info
  const albumUrl = window.location.href.split('/with/')[0];
  const albumId = albumUrl.match(/albums\/(\d+)/)?.[1];
  const albumTitle = document.querySelector('.photo-list-page-heading')?.textContent?.trim() ||
                     document.querySelector('h1')?.textContent?.trim() ||
                     'Untitled';
  
  console.log(`\n📂 Album: ${albumTitle}`);
  console.log(`🔗 URL: ${albumUrl}`);
  console.log(`🆔 ID: ${albumId}\n`);
  
  // Extract photos from page
  let photos = [];
  
  // Method 1: Try to get from modelExport JSON
  try {
    const scripts = document.querySelectorAll('script');
    for (const script of scripts) {
      const content = script.textContent;
      if (content.includes('modelExport')) {
        const modelMatch = content.match(/modelExport:\s*(\{.+?\})\s*,\s*reqId:/s);
        if (modelMatch) {
          const modelData = JSON.parse(modelMatch[1]);
          const photoData = modelData['photoset-photos-90'] || 
                           modelData['photo-models-90'];
          
          if (photoData?._data) {
            photos = photoData._data.map((p, idx) => ({
              id: p.id || `photo-${idx}`,
              title: p.title || `Photo ${idx + 1}`,
              url: `https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}_b.jpg`,
              urlLarge: `https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}_k.jpg`,
              width: p.width || 1200,
              height: p.height || 800,
              server: p.server,
              secret: p.secret,
              farm: p.farm
            }));
            break;
          }
        }
      }
    }
  } catch (e) {
    console.warn('⚠️  Could not parse modelExport, trying fallback...', e.message);
  }
  
  // Method 2: Fallback - scrape from DOM
  if (photos.length === 0) {
    console.log('📸 Using DOM scraping method...');
    const imgElements = document.querySelectorAll('.photo-list-photo-view, [data-defer-src*="staticflickr"]');
    photos = Array.from(imgElements).map((el, idx) => {
      const img = el.tagName === 'IMG' ? el : el.querySelector('img');
      let src = img?.src || img?.getAttribute('data-defer-src') || '';
      
      // Convert to _b size (large)
      src = src.replace(/_[a-z]\.(jpg|png)$/i, '_b.jpg');
      
      return {
        id: `photo-${idx + 1}`,
        title: img?.alt || `Photo ${idx + 1}`,
        url: src,
        width: 1200,
        height: 800
      };
    }).filter(p => p.url && p.url.includes('staticflickr'));
  }
  
  console.log(`✅ Found ${photos.length} photos!\n`);
  
  if (photos.length === 0) {
    console.error('%c❌ NO PHOTOS FOUND!', 'color: #f44336; font-size: 16px; font-weight: bold;');
    console.log('\n💡 Try these steps:');
    console.log('1. Make sure the album page is fully loaded');
    console.log('2. Scroll down to load all images');
    console.log('3. Run this script again');
    return;
  }
  
  // Create result object
  const result = {
    id: albumId,
    title: albumTitle,
    albumUrl: albumUrl,
    photoCount: photos.length,
    coverPhoto: photos[0]?.url || '',
    photos: photos.slice(0, 30) // Limit to first 30 photos
  };
  
  // Pretty print result
  const jsonStr = JSON.stringify(result, null, 2);
  
  console.log('%c📋 SCRAPED DATA:', 'color: #2196F3; font-size: 16px; font-weight: bold;');
  console.log(jsonStr);
  
  // Try to copy to clipboard
  try {
    await navigator.clipboard.writeText(jsonStr);
    console.log('\n%c✅ DATA COPIED TO CLIPBOARD!', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
    console.log('Paste it into a file: album-' + albumId + '.json');
  } catch (e) {
    console.log('\n%c⚠️  Could not auto-copy. Please copy the JSON above manually.', 'color: #FF9800; font-size: 14px;');
  }
  
  // Return for manual access
  window.flickrScrapedData = result;
  console.log('\n💾 Data also saved to: window.flickrScrapedData');
  
  return result;
})();


