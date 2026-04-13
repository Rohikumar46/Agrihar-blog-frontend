"use client";

import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { DEFAULT_AUTHOR_IMAGE, type SubmissionFormState } from './types';

interface SubmissionPreviewProps {
  values: SubmissionFormState;
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function SubmissionPreview({ values }: SubmissionPreviewProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <div className="relative h-72 w-full">
        <Image
          src={values.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=700&fit=crop'}
          alt={values.title || 'Blog preview image'}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-4 p-6">
        <h2 className="text-2xl font-bold text-slate-900">{values.title || 'Untitled Blog'}</h2>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Image
              src={values.authorImage || DEFAULT_AUTHOR_IMAGE}
              alt={values.authorName || 'Author'}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="font-medium text-slate-800">{values.authorName || 'Writer'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('en-IN')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{estimateReadTime(values.content)}</span>
          </div>
        </div>

        {values.authorLinkedIn && (
          <a
            href={values.authorLinkedIn}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm font-medium text-[#2d5a27] hover:text-[#1e3d1a]"
          >
            LinkedIn Profile
          </a>
        )}

        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">{values.content || 'No content yet.'}</div>
      </div>
    </article>
  );
}
