export interface ApiBlog {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  author: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse {
  data: ApiBlog[];
}

interface LoginResponse {
  token: string;
  tokenType: 'Bearer';
  expiresIn: string;
  user: {
    username: string;
    role: string;
  };
}

interface MeResponse {
  user: {
    sub: string;
    role: string;
    username: string;
    iat: number;
    exp: number;
  };
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
    throw new Error(`Request failed with status ${response.status}`);
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

export async function loginAdmin(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const fallbackMessage = `Login failed with status ${response.status}`;

    try {
      const errorJson = (await response.json()) as { message?: string };
      throw new Error(errorJson.message || fallbackMessage);
    } catch {
      throw new Error(fallbackMessage);
    }
  }

  return response.json();
}

export async function fetchMe(token: string): Promise<MeResponse> {
  return fetchJsonWithAuth<MeResponse>('/auth/me', token, { method: 'GET' });
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
  return fetchJsonWithAuth<{ message: string }>(`/blogs/${id}`, token, {
    method: 'DELETE',
  });
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

  const queryString = query.toString();
  const path = queryString ? `/blogs?${queryString}` : '/blogs';
  const data = await fetchJson<PaginatedResponse>(path, {
    headers: params?.token
      ? {
          Authorization: `Bearer ${params.token}`,
        }
      : undefined,
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
