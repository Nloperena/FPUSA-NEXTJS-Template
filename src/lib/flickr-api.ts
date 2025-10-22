// Flickr API utilities for fetching project photos

import { FlickrPhoto, FlickrProject } from '@/data/flickr-projects';

const FLICKR_API_KEY = process.env.NEXT_PUBLIC_FLICKR_API_KEY || '';
const FLICKR_API_BASE = 'https://api.flickr.com/services/rest/';

interface FlickrApiResponse {
  photoset?: {
    photo: any[];
    title: string;
    total: string;
  };
  photos?: {
    photo: any[];
  };
  stat: string;
  message?: string;
}

/**
 * Fetch photos from a Flickr photoset/album
 */
export async function fetchFlickrAlbum(albumId: string): Promise<FlickrPhoto[]> {
  if (!FLICKR_API_KEY) {
    console.warn('Flickr API key not found. Set NEXT_PUBLIC_FLICKR_API_KEY in .env.local');
    return [];
  }

  try {
    const params = new URLSearchParams({
      method: 'flickr.photosets.getPhotos',
      api_key: FLICKR_API_KEY,
      photoset_id: albumId,
      extras: 'url_o,url_l,url_c,url_z,url_m,description,original_format',
      format: 'json',
      nojsoncallback: '1'
    });

    const response = await fetch(`${FLICKR_API_BASE}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Flickr API error: ${response.statusText}`);
    }

    const data: FlickrApiResponse = await response.json();

    if (data.stat !== 'ok' || !data.photoset) {
      console.error('Flickr API error:', data.message);
      return [];
    }

    return data.photoset.photo.map(photo => ({
      id: photo.id,
      title: photo.title,
      description: photo.description?._content,
      url_o: photo.url_o,
      url_l: photo.url_l,
      url_c: photo.url_c,
      url_z: photo.url_z,
      url_m: photo.url_m,
      width: photo.width_o || photo.width_l,
      height: photo.height_o || photo.height_l,
      secret: photo.secret,
      server: photo.server,
      farm: photo.farm
    }));
  } catch (error) {
    console.error('Error fetching Flickr album:', error);
    return [];
  }
}

/**
 * Fetch a single photo's info
 */
export async function fetchFlickrPhoto(photoId: string): Promise<FlickrPhoto | null> {
  if (!FLICKR_API_KEY) {
    console.warn('Flickr API key not found');
    return null;
  }

  try {
    const params = new URLSearchParams({
      method: 'flickr.photos.getSizes',
      api_key: FLICKR_API_KEY,
      photo_id: photoId,
      format: 'json',
      nojsoncallback: '1'
    });

    const response = await fetch(`${FLICKR_API_BASE}?${params.toString()}`);
    const data = await response.json();

    if (data.stat !== 'ok') {
      return null;
    }

    const sizes = data.sizes?.size || [];
    const largeSize = sizes.find((s: any) => s.label === 'Large') || sizes[sizes.length - 1];

    return {
      id: photoId,
      title: '',
      url_l: largeSize?.source,
      width: largeSize?.width,
      height: largeSize?.height
    };
  } catch (error) {
    console.error('Error fetching Flickr photo:', error);
    return null;
  }
}

/**
 * Populate a project with photos from Flickr API
 */
export async function populateProjectPhotos(project: FlickrProject): Promise<FlickrProject> {
  const photos = await fetchFlickrAlbum(project.albumId);
  
  return {
    ...project,
    photos,
    photoCount: photos.length
  };
}

/**
 * Populate multiple projects with photos
 */
export async function populateAllProjects(projects: FlickrProject[]): Promise<FlickrProject[]> {
  const promises = projects.map(project => populateProjectPhotos(project));
  return Promise.all(promises);
}

/**
 * Get the best available image URL from a photo
 */
export function getBestImageUrl(photo: FlickrPhoto, preferredSize: 'original' | 'large' | 'medium' = 'large'): string {
  if (preferredSize === 'original' && photo.url_o) return photo.url_o;
  if (preferredSize === 'large' && photo.url_l) return photo.url_l;
  if (photo.url_c) return photo.url_c;
  if (photo.url_z) return photo.url_z;
  if (photo.url_m) return photo.url_m;
  
  // Fallback: construct URL from farm/server/id/secret
  if (photo.farm && photo.server && photo.secret) {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
  }
  
  return '/placeholder-image.jpg';
}

/**
 * Cache photos in localStorage for faster loading
 */
export function cacheProjectPhotos(projectId: string, photos: FlickrPhoto[]) {
  if (typeof window === 'undefined') return;
  
  try {
    const cacheKey = `flickr_project_${projectId}`;
    const cacheData = {
      photos,
      timestamp: Date.now(),
      expiresIn: 24 * 60 * 60 * 1000 // 24 hours
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to cache project photos:', error);
  }
}

/**
 * Get cached photos if available and not expired
 */
export function getCachedProjectPhotos(projectId: string): FlickrPhoto[] | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cacheKey = `flickr_project_${projectId}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    const isExpired = Date.now() - cacheData.timestamp > cacheData.expiresIn;
    
    if (isExpired) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return cacheData.photos;
  } catch (error) {
    console.warn('Failed to retrieve cached photos:', error);
    return null;
  }
}


