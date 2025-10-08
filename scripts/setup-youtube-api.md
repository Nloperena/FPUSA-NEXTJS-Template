# YouTube API Setup Guide

To scrape ALL videos from the Furniture Packages USA channel (636+ videos), you need to set up a YouTube API key.

## Step 1: Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key

## Step 2: Set Environment Variable

### Windows (PowerShell):
```powershell
$env:YOUTUBE_API_KEY="your_api_key_here"
```

### Windows (Command Prompt):
```cmd
set YOUTUBE_API_KEY=your_api_key_here
```

### Linux/Mac:
```bash
export YOUTUBE_API_KEY="your_api_key_here"
```

## Step 3: Run the API Scraper

```bash
npm run api-scrape
```

## Alternative: Manual Video ID Extraction

If you don't want to use the API, you can manually extract video IDs from the channel page:

1. Go to https://www.youtube.com/@FurniturePackagesUSAvideo/videos
2. Scroll down to load all videos (this may take a while)
3. Right-click and "View Page Source"
4. Search for "videoId" to find all video IDs
5. Copy the video IDs and add them to the scraper

## Current Status

- **Current videos scraped**: 30-49 (only recent videos)
- **Total videos on channel**: 636+ (10+ years of content)
- **Missing**: 580+ videos including many testimonials

The YouTube API is the most reliable way to get ALL videos from the channel.



