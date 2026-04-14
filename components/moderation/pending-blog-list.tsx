"use client";

import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/api';
import type { ModerationBlog } from '@/lib/api';

interface PendingBlogListProps {
  blogs: ModerationBlog[];
  actioningId: string;
  onPreview: (blog: ModerationBlog) => void;
  onApprove: (id: string) => void;
  onStartReject: (id: string) => void;
}

export function PendingBlogList({ blogs, actioningId, onPreview, onApprove, onStartReject }: PendingBlogListProps) {
  if (blogs.length === 0) {
    return <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">No pending blogs right now.</p>;
  }

  return (
    <ul className="space-y-3">
      {blogs.map((blog) => (
        <li key={blog._id} className="rounded-xl border border-slate-200 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-medium text-slate-900">{blog.title}</p>
              <p className="mt-1 text-sm text-slate-600">By {blog.authorName || blog.author || 'Unknown writer'}</p>
              <p className="mt-1 text-xs text-slate-500">Submitted {formatDate(blog.createdAt)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => onPreview(blog)}>
                Full Preview →
              </Button>
              <Button
                size="sm"
                className="bg-emerald-700 hover:bg-emerald-800"
                disabled={actioningId === blog._id}
                onClick={() => onApprove(blog._id)}
              >
                {actioningId === blog._id ? 'Working...' : 'Approve'}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                disabled={actioningId === blog._id}
                onClick={() => onStartReject(blog._id)}
              >
                Reject
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
