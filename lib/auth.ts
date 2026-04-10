import { AUTH_TOKEN_KEY } from './auth-constants';

function getCookieValue(name: string) {
  if (typeof window === 'undefined') {
    return '';
  }

  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${name}=`));

  if (!cookie) {
    return '';
  }

  return decodeURIComponent(cookie.split('=').slice(1).join('='));
}

function buildCookieString(name: string, value: string, maxAgeSeconds: number) {
  if (typeof window === 'undefined') {
    return '';
  }

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

export function getStoredToken() {
  if (typeof window === 'undefined') {
    return '';
  }

  return localStorage.getItem(AUTH_TOKEN_KEY) || getCookieValue(AUTH_TOKEN_KEY) || '';
}

export function setStoredToken(token: string) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  document.cookie = buildCookieString(AUTH_TOKEN_KEY, token, 604800);
}

export function clearStoredToken() {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  document.cookie = buildCookieString(AUTH_TOKEN_KEY, '', 0);
}
