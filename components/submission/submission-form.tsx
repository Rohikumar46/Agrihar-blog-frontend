"use client";

import { ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BLOG_CATEGORIES, type SubmissionFormState } from './types';

interface SubmissionFormProps {
  values: SubmissionFormState;
  busy: boolean;
  onChange: (nextValues: SubmissionFormState) => void;
  onPreview: () => void;
  onSubmit: () => void;
}

function toDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function SubmissionForm({ values, busy, onChange, onPreview, onSubmit }: SubmissionFormProps) {
  function setField<K extends keyof SubmissionFormState>(key: K, value: SubmissionFormState[K]) {
    onChange({ ...values, [key]: value });
  }

  async function handleFileUpload(field: 'imageUrl' | 'authorImage', event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await toDataUrl(file);
    setField(field, dataUrl);
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Blog title"
        value={values.title}
        onChange={(event) => setField('title', event.target.value)}
        required
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Cover image upload</label>
        <Input type="file" accept="image/*" onChange={(event) => void handleFileUpload('imageUrl', event)} />
      </div>

      <Input
        placeholder="Author name"
        value={values.authorName}
        onChange={(event) => setField('authorName', event.target.value)}
        required
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Author image upload (optional)</label>
        <Input type="file" accept="image/*" onChange={(event) => void handleFileUpload('authorImage', event)} />
      </div>

      <Input
        placeholder="LinkedIn URL"
        value={values.authorLinkedIn}
        onChange={(event) => setField('authorLinkedIn', event.target.value)}
        required
      />

      {/* ── Category dropdown ───────────────────────────────────────── */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={values.category}
            onChange={(event) => setField('category', event.target.value)}
            required
            className="w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-2 pr-9 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2d5a27] focus:ring-2 focus:ring-[#2d5a27]/15 cursor-pointer"
          >
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        <p className="text-xs text-slate-500">
          Your blog will appear in the <span className="font-medium text-slate-700">{BLOG_CATEGORIES.find(c => c.value === values.category)?.label}</span> section of the site.
        </p>
      </div>

      <textarea
        placeholder="Write your blog content"
        rows={12}
        value={values.content}
        onChange={(event) => setField('content', event.target.value)}
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2d5a27]"
        required
      />

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onPreview} disabled={busy}>
          Preview
        </Button>
        <Button type="button" className="bg-[#2d5a27] hover:bg-[#1e3d1a]" onClick={onSubmit} disabled={busy}>
          {busy ? 'Submitting...' : 'Submit For Review'}
        </Button>
      </div>
    </div>
  );
}
