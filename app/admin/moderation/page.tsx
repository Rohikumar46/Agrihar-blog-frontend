"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PendingBlogList } from '@/components/moderation/pending-blog-list';
import {
  approvePendingBlog,
  fetchPendingBlogs,
  rejectPendingBlog,
  type ModerationBlog,
  fetchMe,
} from '@/lib/api';
import { clearStoredToken, getStoredToken } from '@/lib/auth';
import { saveModerationPreview } from '@/lib/moderation-preview';

export default function AdminModerationPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pendingBlogs, setPendingBlogs] = useState<ModerationBlog[]>([]);
  const [actioningId, setActioningId] = useState('');
  const [rejectBlogId, setRejectBlogId] = useState('');
  const [rejectMessage, setRejectMessage] = useState('');

  async function loadPending(authToken: string) {
    const blogs = await fetchPendingBlogs(authToken);
    setPendingBlogs(blogs);
  }

  useEffect(() => {
    const storedToken = getStoredToken();

    if (!storedToken) {
      router.replace('/admin/login');
      return;
    }

    setToken(storedToken);

    fetchMe(storedToken)
      .then((response) => {
        if (response.user.role !== 'admin') {
          throw new Error('Admin access required');
        }
        return loadPending(storedToken);
      })
      .catch((authError) => {
        setError(authError instanceof Error ? authError.message : 'Authentication failed');
        clearStoredToken();
        router.replace('/admin/login');
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, [router]);

  function handlePreview(blog: ModerationBlog) {
    saveModerationPreview(blog);
    router.push('/admin/moderation/preview');
  }

  async function handleApprove(id: string) {
    setError('');
    setSuccess('');
    setActioningId(id);

    try {
      await approvePendingBlog(token, id);
      setPendingBlogs((prev) => prev.filter((blog) => blog._id !== id));
      setSuccess('Blog approved successfully.');
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : 'Failed to approve blog');
    } finally {
      setActioningId('');
    }
  }

  async function handleReject() {
    setError('');
    setSuccess('');

    if (!rejectBlogId || !rejectMessage.trim()) {
      setError('Reject message is required.');
      return;
    }

    setActioningId(rejectBlogId);

    try {
      await rejectPendingBlog(token, rejectBlogId, rejectMessage.trim());
      setPendingBlogs((prev) => prev.filter((blog) => blog._id !== rejectBlogId));
      setRejectBlogId('');
      setRejectMessage('');
      setSuccess('Blog rejected successfully.');
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : 'Failed to reject blog');
    } finally {
      setActioningId('');
    }
  }

  if (checkingAuth) {
    return <div className="p-8 text-center text-slate-600">Checking admin session...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7fbf5]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d5a27]">Admin Moderation</p>
            <h1 className="text-2xl font-bold text-slate-900">Pending Blog Submissions</h1>
          </div>
          <Link href="/admin" className="text-sm font-medium text-[#f97316] hover:text-[#ea580c]">
            Back to admin panel
          </Link>
        </div>

        {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        {success && <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>}

        {rejectBlogId && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="mb-2 text-sm font-medium text-amber-900">Rejection message</p>
            <Input
              placeholder="Explain why this blog is rejected"
              value={rejectMessage}
              onChange={(event) => setRejectMessage(event.target.value)}
            />
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="destructive" disabled={actioningId === rejectBlogId} onClick={handleReject}>
                Confirm reject
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setRejectBlogId('');
                  setRejectMessage('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <PendingBlogList
            blogs={pendingBlogs}
            actioningId={actioningId}
            onPreview={handlePreview}
            onApprove={handleApprove}
            onStartReject={(id) => {
              setRejectBlogId(id);
              setRejectMessage('');
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
