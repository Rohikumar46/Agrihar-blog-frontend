"use client";

import Image from 'next/image';
import type { ModerationBlog } from '@/lib/api';

interface ModerationPreviewProps {
  blog: ModerationBlog | null;
}

export function ModerationPreview({ blog }: ModerationPreviewProps) {
  if (!blog) {
    return (
      <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
        Select a pending blog and click Preview.
      </p>
    );
  }

  const previewImage =
    blog.previewImage ||
    blog.bodyImage ||
    blog.imageUrl ||
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=700&fit=crop';

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative h-56 w-full">
        <Image
          src={previewImage}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-4 p-5">
        <h3 className="text-xl font-bold text-slate-900">{blog.title}</h3>
        <p className="text-sm text-slate-600">By {blog.authorName || blog.author || 'Unknown writer'}</p>
        {blog.authorLinkedIn && (
          <a href={blog.authorLinkedIn} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#2d5a27] hover:text-[#1e3d1a]">
            View LinkedIn
          </a>
        )}
        <div className="whitespace-pre-wrap text-sm text-slate-700">{blog.content}</div>
      </div>
    </article>
  );
}
