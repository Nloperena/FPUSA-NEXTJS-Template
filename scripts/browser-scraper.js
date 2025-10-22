// BROWSER-BASED FLICKR SCRAPER
// Open a Flickr album page in your browser, paste this into the console, and run it!

(function() {
  console.log('🔍 Flickr Album Scraper Starting...');
  
  // Extract album title
  const albumTitle = document.querySelector('.album-title')?.textContent?.trim() || 
                     document.querySelector('h1')?.textContent?.trim() || 
                     'Untitled Album';
  
  // Get album URL
  const albumUrl = window.location.href.split('/with/')[0];
  const albumId = albumUrl.match(/albums\/(\d+)/)?.[1] || 'unknown';
  
  // Extract modelExport JSON data (Flickr stores photo data here)
  const scriptTags = Array.from(document.querySelectorAll('script'));
  let photos = [];
  
  for (const script of scriptTags) {
    const content = script.textContent;
    if (content.includes('modelExport')) {
      try {
        // Extract the modelExport object
        const modelMatch = content.match(/modelExport:\s*({.+?})\s*,\s*reqId:/s);
        if (modelMatch) {
          const modelData = JSON.parse(modelMatch[1]);
          
          // Find photo data (different keys used)
          const photosetData = modelData['photoset-photos-90'] || 
                              modelData['photo-models-90'] ||
                              modelData['photoset-models-90'];
          
          if (photosetData && photosetData._data) {
            photos = photosetData._data.map(photo => ({
              id: photo.id,
              title: photo.title || 'Photo',
              url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
              urlLarge: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_k.jpg`,
              urlOriginal: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_o.jpg`,
              secret: photo.secret,
              server: photo.server,
              farm: photo.farm,
              width: photo.width || 1024,
              height: photo.height || 768
            }));
            break;
          }
        }
      } catch (e) {
        console.warn('Error parsing modelExport:', e);
      }
    }
  }
  
  // Fallback: Try extracting from visible images
  if (photos.length === 0) {
    console.log('Using fallback method: extracting from DOM...');
    const imgElements = document.querySelectorAll('img[src*="staticflickr"]');
    photos = Array.from(imgElements).map((img, index) => {
      const src = img.src;
      // Convert to large version
      const largeUrl = src.replace(/_[a-z]\.(jpg|png)/i, '_b.jpg');
      return {
        id: `photo-${index}`,
        title: img.alt || `Photo ${index + 1}`,
        url: largeUrl,
        width: img.naturalWidth || 1024,
        height: img.naturalHeight || 768
      };
    });
  }
  
  const result = {
    id: albumId,
    title: albumTitle,
    albumUrl: albumUrl,
    photoCount: photos.length,
    coverPhoto: photos[0]?.url || '',
    photos: photos
  };
  
  console.log('✅ Scraped Album Data:');
  console.log(`   Title: ${albumTitle}`);
  console.log(`   Photos: ${photos.length}`);
  console.log(`   Album ID: ${albumId}`);
  console.log('\n📋 Copy the data below:\n');
  console.log(JSON.stringify(result, null, 2));
  
  // Copy to clipboard
  const jsonString = JSON.stringify(result, null, 2);
  navigator.clipboard.writeText(jsonString).then(() => {
    console.log('\n✅ Data copied to clipboard!');
  }).catch(() => {
    console.log('\n⚠️  Could not copy automatically. Please copy the JSON above manually.');
  });
  
  return result;
})();


