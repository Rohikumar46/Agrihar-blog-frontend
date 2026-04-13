// ─── Types ───────────────────────────────────────────────────────────────────

export interface ApiBlog {
  _id: string;
  slug: string;
  title: string;
  subTitle?: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  author: string;
  authorEmail?: string;
  authorName?: string;
  authorImage?: string;
  authorLinkedIn?: string;
  status?: 'draft' | 'pending' | 'approved' | 'rejected';
  adminMessage?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ModerationBlog = ApiBlog;

export interface PublicSubmitPayload {
  title: string;
  imageUrl: string;
  authorName: string;
  authorImage?: string;
  authorLinkedIn: string;
  content: string;
  category: string;
}

export interface AuthorBlogPayload {
  title: string;
  content: string;
  authorName: string;
  subTitle?: string;
  category?: string;
  imageUrl?: string;
  authorImage?: string;
  authorLinkedIn?: string;
  excerpt?: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
  author?: string;
  isPublished?: boolean;
}

// ─── Internals ────────────────────────────────────────────────────────────────

const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';

function getApiBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL;
  return (fromEnv && fromEnv.trim()) || DEFAULT_API_BASE_URL;
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    cache: 'no-store',
  });

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}`;
    try {
      const errorJson = (await response.json()) as { message?: string };
      throw new Error(errorJson.message || fallbackMessage);
    } catch {
      throw new Error(fallbackMessage);
    }
  }

  return response.json();
}

async function fetchJsonWithAuth<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}`;
    try {
      const errorJson = (await response.json()) as { message?: string };
      throw new Error(errorJson.message || fallbackMessage);
    } catch {
      throw new Error(fallbackMessage);
    }
  }

  return response.json();
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

interface AdminLoginResponse {
  token: string;
  tokenType: 'Bearer';
  expiresIn: string;
  user: { email: string; role: string };
}

interface AuthorAccessResponse {
  token: string;
  tokenType: 'Bearer';
  expiresIn: string;
  user: { email: string; role: string };
}

interface MeResponse {
  user: {
    sub: string;
    role: string;
    email?: string;
    username?: string;
    iat: number;
    exp: number;
  };
}

/** Super Admin login — email + password */
export async function loginAdmin(email: string, password: string): Promise<AdminLoginResponse> {
  return fetchJson<AdminLoginResponse>('/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

/** Author access — email only, no password */
export async function authorAccess(email: string): Promise<AuthorAccessResponse> {
  return fetchJson<AuthorAccessResponse>('/auth/author/access', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export async function fetchMe(token: string): Promise<MeResponse> {
  return fetchJsonWithAuth<MeResponse>('/auth/me', token, { method: 'GET' });
}

// ─── Public blog routes ───────────────────────────────────────────────────────

interface PublicPaginatedResponse {
  data: ApiBlog[];
}

interface PublicBlogResponse {
  data: ApiBlog;
}

export async function fetchPublicBlogs(params?: {
  page?: number;
  limit?: number;
  category?: string;
  q?: string;
}): Promise<ApiBlog[]> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.category) query.set('category', params.category);
  if (params?.q) query.set('q', params.q);

  const path = query.toString() ? `/blog?${query}` : '/blog';
  const data = await fetchJson<PublicPaginatedResponse>(path);
  return data.data || [];
}

export async function fetchPublicBlogBySlug(slug: string): Promise<ApiBlog | null> {
  try {
    const response = await fetchJson<PublicBlogResponse>(`/blog/${encodeURIComponent(slug)}`);
    return response.data;
  } catch {
    return null;
  }
}

export async function submitPublicBlog(payload: PublicSubmitPayload): Promise<ApiBlog> {
  const response = await fetchJson<{ data: ApiBlog }>('/blog/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.data;
}

// ─── Author routes (requires author JWT) ──────────────────────────────────────

interface AuthorPaginatedResponse {
  data: ApiBlog[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export async function fetchMyBlogs(token: string): Promise<ApiBlog[]> {
  const data = await fetchJsonWithAuth<AuthorPaginatedResponse>('/author/blogs', token, { method: 'GET' });
  return data.data || [];
}

export async function fetchMyBlog(token: string, id: string): Promise<ApiBlog> {
  const data = await fetchJsonWithAuth<{ data: ApiBlog }>(`/author/blogs/${id}`, token, { method: 'GET' });
  return data.data;
}

export async function createAuthorBlog(token: string, payload: AuthorBlogPayload): Promise<ApiBlog> {
  const data = await fetchJsonWithAuth<{ data: ApiBlog }>('/author/blogs', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.data;
}

export async function updateAuthorBlog(token: string, id: string, payload: Partial<AuthorBlogPayload>): Promise<ApiBlog> {
  const data = await fetchJsonWithAuth<{ data: ApiBlog }>(`/author/blogs/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return data.data;
}

// ─── Admin moderation routes (requires admin JWT) ─────────────────────────────

interface AdminPaginatedResponse {
  data: ApiBlog[];
}

export async function fetchPendingBlogs(token: string): Promise<ModerationBlog[]> {
  const response = await fetchJsonWithAuth<AdminPaginatedResponse>('/admin/blogs/pending', token, { method: 'GET' });
  return response.data || [];
}

export async function fetchAllAdminBlogs(token: string, status?: string): Promise<ModerationBlog[]> {
  const path = status ? `/admin/blogs?status=${status}` : '/admin/blogs';
  const response = await fetchJsonWithAuth<AdminPaginatedResponse>(path, token, { method: 'GET' });
  return response.data || [];
}

export async function approvePendingBlog(token: string, id: string): Promise<ModerationBlog> {
  const response = await fetchJsonWithAuth<{ data: ModerationBlog }>(`/admin/blog/${id}/approve`, token, { method: 'PUT' });
  return response.data;
}

export async function rejectPendingBlog(token: string, id: string, message: string): Promise<ModerationBlog> {
  const response = await fetchJsonWithAuth<{ data: ModerationBlog }>(`/admin/blog/${id}/reject`, token, {
    method: 'PUT',
    body: JSON.stringify({ message }),
  });
  return response.data;
}

// ─── Old admin blog routes (kept for /api/blogs compatibility) ────────────────

interface PaginatedResponse {
  data: ApiBlog[];
}

export async function fetchBlogs(params?: {
  page?: number;
  limit?: number;
  category?: string;
  q?: string;
  tag?: string;
  includeDrafts?: boolean;
  token?: string;
}): Promise<ApiBlog[]> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.category) query.set('category', params.category);
  if (params?.q) query.set('q', params.q);
  if (params?.tag) query.set('tag', params.tag);
  if (params?.includeDrafts) query.set('includeDrafts', 'true');

  const path = query.toString() ? `/blogs?${query}` : '/blogs';
  const data = await fetchJson<PaginatedResponse>(path, {
    headers: params?.token ? { Authorization: `Bearer ${params.token}` } : undefined,
  });
  return data.data || [];
}

export async function fetchBlogBySlug(slug: string): Promise<ApiBlog | null> {
  try {
    return await fetchJson<ApiBlog>(`/blogs/slug/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

export async function createBlog(token: string, payload: CreateBlogPayload): Promise<ApiBlog> {
  return fetchJsonWithAuth<ApiBlog>('/blogs', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateBlog(token: string, id: string, payload: Partial<CreateBlogPayload>): Promise<ApiBlog> {
  return fetchJsonWithAuth<ApiBlog>(`/blogs/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteBlog(token: string, id: string): Promise<{ message: string }> {
  return fetchJsonWithAuth<{ message: string }>(`/blogs/${id}`, token, { method: 'DELETE' });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatCategory(value: string) {
  return value.replace(/-/g, ' ').toUpperCase();
}

export function formatDate(value: string) {
  try {
    return new Date(value).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return value;
  }
}

export function estimateReadTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));
  return `${minutes} min read`;
}

export function toArticleCard(blog: ApiBlog) {
  return {
    slug: blog.slug,
    image: blog.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop',
    category: formatCategory(blog.category),
    categoryColor: '#2d5a27',
    title: blog.title,
    description: blog.excerpt || blog.content.slice(0, 120),
    date: formatDate(blog.createdAt),
    readTime: estimateReadTime(blog.content),
    badge: blog.tags?.[0] ? blog.tags[0].toUpperCase() : undefined,
    badgeColor: '#f97316',
  };
}
