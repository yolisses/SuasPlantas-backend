import { google } from 'googleapis';
import { GOOGLE_CLOUD_API_KEY } from '../config/env';

export async function getImagesSuggestions(text:string) {
  const customSearch = google.customsearch('v1');
  const result = await customSearch.cse.list({
    num: 4,
    q: text,
    hl: 'br',
    gl: 'br',
    safe: 'active',
    searchType: 'image',
    cx: '64c4d7a5d78d392ee',
    key: GOOGLE_CLOUD_API_KEY,
    rights: 'cc_publicdomain',
  });
  const images = result.data.items.map((item) => ({
    original: item.link,
    thumbnail: item.image.thumbnailLink,
  }));
  return images;
}
