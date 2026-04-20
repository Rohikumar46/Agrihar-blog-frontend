"use client";

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Linkedin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  approvePendingBlog,
  rejectPendingBlog,
  fetchMe,
  formatDate,
  type ModerationBlog,
} from '@/lib/api';
import { clearStoredToken, getStoredToken } from '@/lib/auth';
import { loadModerationPreview, clearModerationPreview } from '@/lib/moderation-preview';

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function stripMarkdownHeadings(text: string) {
  return text.replace(/^#{1,6}\s+/gm, '').trim();
}

function PlainBlock({ text }: { text: string }) {
  const t = text.trim();
  if (t.startsWith('#### '))
    return <h4 className="mt-6 mb-2 text-lg font-bold text-[#1e3d1a] tracking-tight">{t.slice(5)}</h4>;
  if (t.startsWith('### '))
    return <h3 className="mt-8 mb-3 text-xl font-bold text-[#1e3d1a] tracking-tight">{t.slice(4)}</h3>;
  if (t.startsWith('## '))
    return <h2 className="mt-10 mb-4 text-2xl font-bold text-[#1e3d1a] tracking-tight">{t.slice(3)}</h2>;
  if (t.startsWith('# '))
    return <h1 className="mt-12 mb-5 text-3xl font-bold text-[#1e3d1a] tracking-tight">{t.slice(2)}</h1>;

  return (
    <p className="text-[16px] leading-[1.85] text-slate-700">
      {t.split('\n').map((line, j, arr) =>
        j < arr.length - 1
          ? <span key={j}>{line}<br /></span>
          : <span key={j}>{line}</span>
      )}
    </p>
  );
}

function renderContent(content: string, bodyImage?: string) {
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  if (isHtml) {
    return (
      <div
        className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-[#1e3d1a] prose-headings:tracking-tight
          prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-5
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-[16px] prose-p:leading-[1.85] prose-p:text-slate-700
          prose-strong:text-slate-900
          prose-ul:text-slate-700 prose-ol:text-slate-700
          prose-li:leading-relaxed prose-li:my-1
          prose-img:rounded-xl prose-img:shadow-md prose-img:my-8"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const blocks = content.split(/\n{2,}/).filter(Boolean);
  const insertAfter = Math.max(1, Math.floor(blocks.length * 0.45));

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <Fragment key={i}>
          <PlainBlock text={block} />
          {bodyImage && i === insertAfter - 1 && (
            // eslint-disable-next-line @next/next/no-img-element
            <figure className="my-6 overflow-hidden rounded-xl">
              <img
                src={bodyImage}
                alt="Blog illustration"
                className="w-full rounded-xl object-cover shadow-md"
              />
            </figure>
          )}
        </Fragment>
      ))}
      {bodyImage && blocks.length === 0 && (
        <figure className="my-6 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bodyImage}
            alt="Blog illustration"
            className="w-full rounded-xl object-cover shadow-md"
          />
        </figure>
      )}
    </div>
  );
}

export default function ModerationPreviewPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [blog, setBlog] = useState<ModerationBlog | null>(null);
  const [ready, setReady] = useState(false);
  const [actioningId, setActioningId] = useState('');
  const [showReject, setShowReject] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedToken = getStoredToken();

    if (!storedToken) {
      router.replace('/admin/login');
      return;
    }

    fetchMe(storedToken)
      .then((response) => {
        if (response.user.role !== 'admin') {
          throw new Error('Admin access required');
        }

        const draft = loadModerationPreview();
        if (!draft) {
          router.replace('/admin/moderation');
          return;
        }

        setToken(storedToken);
        setBlog(draft);
        setReady(true);
      })
      .catch(() => {
        clearStoredToken();
        router.replace('/admin/login');
      });
  }, [router]);

  async function handleApprove() {
    if (!blog) return;
    setError('');
    setSuccess('');
    setActioningId(blog._id);

    try {
      await approvePendingBlog(token, blog._id);
      clearModerationPreview();
      setSuccess('Blog approved successfully.');
      setTimeout(() => router.replace('/admin/moderation'), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve blog');
    } finally {
      setActioningId('');
    }
  }

  async function handleReject() {
    if (!blog || !rejectMessage.trim()) {
      setError('Rejection message is required.');
      return;
    }
    setError('');
    setSuccess('');
    setActioningId(blog._id);

    try {
      await rejectPendingBlog(token, blog._id, rejectMessage.trim());
      clearModerationPreview();
      setSuccess('Blog rejected.');
      setTimeout(() => router.replace('/admin/moderation'), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject blog');
    } finally {
      setActioningId('');
    }
  }

  if (!ready) {
    return <div className="p-8 text-center text-slate-600">Loading preview...</div>;
  }

  if (!blog) return null;

  const heroImage =
    blog.imageUrl ||
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=700&fit=crop';

  const isActioning = actioningId === blog._id;

  return (
    <div className="min-h-screen bg-[#f7fbf5]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">

        {/* Top bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/admin/moderation"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to moderation
          </Link>

          <div className="flex flex-wrap gap-2">
            {success ? (
              <p className="rounded-md bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700">{success}</p>
            ) : (
              <>
                <Button
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-800"
                  disabled={isActioning || showReject}
                  onClick={handleApprove}
                >
                  {isActioning && !showReject ? 'Approving...' : 'Approve'}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={isActioning}
                  onClick={() => {
                    setShowReject((v) => !v);
                    setError('');
                    setRejectMessage('');
                  }}
                >
                  {showReject ? 'Cancel reject' : 'Reject'}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Rejection input */}
        {showReject && !success && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="mb-2 text-sm font-medium text-amber-900">Rejection message</p>
            <Input
              placeholder="Explain why this blog is being rejected…"
              value={rejectMessage}
              onChange={(e) => setRejectMessage(e.target.value)}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="destructive" disabled={isActioning} onClick={handleReject}>
                {isActioning ? 'Rejecting...' : 'Confirm reject'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowReject(false);
                  setRejectMessage('');
                  setError('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {error && !showReject && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        {/* Blog preview */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          {/* Hero image */}
          <div className="relative h-72 w-full sm:h-80">
            <Image
              src={heroImage}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4 p-6 sm:p-8">
            {/* Category + tags */}
            <div className="flex flex-wrap gap-2">
              {blog.category && (
                <span className="rounded-full bg-[#e8f5e3] px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#2d5a27]">
                  {blog.category}
                </span>
              )}
              {blog.tags?.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-0.5 text-xs text-slate-600">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & subtitle */}
            <h1 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">{blog.title}</h1>
            {blog.subTitle && (
              <p className="text-lg text-slate-600">{blog.subTitle}</p>
            )}

            {/* Author meta */}
            <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-4 text-sm text-slate-600">
              <span className="font-medium text-slate-800">
                {blog.authorName || blog.author || 'Unknown writer'}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{estimateReadTime(blog.content || '')}</span>
              </div>
              {blog.authorLinkedIn && (
                <a
                  href={blog.authorLinkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-medium text-[#2d5a27] hover:text-[#1e3d1a]"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
            </div>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm italic text-slate-600">
                {stripMarkdownHeadings(blog.excerpt)}
              </p>
            )}

            {/* Content */}
            <div className="pt-2">
              {renderContent(blog.content || 'No content provided.', blog.bodyImage)}
            </div>
          </div>
        </article>

        {/* Bottom action bar */}
        {!success && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-600">
              Submitted by <span className="font-medium text-slate-800">{blog.authorName || blog.author}</span>
              {blog.authorEmail && <span className="text-slate-500"> · {blog.authorEmail}</span>}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-emerald-700 hover:bg-emerald-800"
                disabled={isActioning || showReject}
                onClick={handleApprove}
              >
                {isActioning && !showReject ? 'Approving...' : 'Approve'}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                disabled={isActioning}
                onClick={() => {
                  setShowReject(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
