import type { ModerationBlog } from './api';

const STORAGE_KEY = 'agrihar-moderation-preview';

export function saveModerationPreview(blog: ModerationBlog): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(blog));
}

export function loadModerationPreview(): ModerationBlog | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ModerationBlog) : null;
  } catch {
    return null;
  }
}

export function clearModerationPreview(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
