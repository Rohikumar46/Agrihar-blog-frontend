import { AUTHOR_TOKEN_KEY } from './auth-constants'

function getCookieValue(name: string) {
  if (typeof window === 'undefined') return ''
  const cookie = document.cookie.split('; ').find((item) => item.startsWith(`${name}=`))
  return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : ''
}

function buildCookieString(name: string, value: string, maxAgeSeconds: number) {
  if (typeof window === 'undefined') return ''
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`
}

export function getStoredAuthorToken() {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(AUTHOR_TOKEN_KEY) || getCookieValue(AUTHOR_TOKEN_KEY) || ''
}

export function setStoredAuthorToken(token: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(AUTHOR_TOKEN_KEY, token)
  document.cookie = buildCookieString(AUTHOR_TOKEN_KEY, token, 604800)
}

export function clearStoredAuthorToken() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTHOR_TOKEN_KEY)
  document.cookie = buildCookieString(AUTHOR_TOKEN_KEY, '', 0)
}
