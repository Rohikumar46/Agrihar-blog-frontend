"use client";

import { useMemo, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SubmissionForm } from '@/components/submission/submission-form';
import { SubmissionPreview } from '@/components/submission/submission-preview';
import { initialSubmissionState, type SubmissionFormState } from '@/components/submission/types';
import { submitPublicBlog } from '@/lib/api';

export default function SubmitBlogPage() {
  const [values, setValues] = useState<SubmissionFormState>(initialSubmissionState);
  const [isPreview, setIsPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const canSubmit = useMemo(() => {
    return (
      values.title.trim() &&
      values.imageUrl.trim() &&
      values.authorName.trim() &&
      values.authorLinkedIn.trim() &&
      values.content.trim()
    );
  }, [values]);

  async function handleSubmit() {
    setError('');
    setSuccess('');

    if (!canSubmit) {
      setError('Please fill all required fields before submitting.');
      return;
    }

    setSubmitting(true);

    try {
      await submitPublicBlog(values);
      setSuccess('Your blog was submitted and is now pending admin review.');
      setValues(initialSubmissionState);
      setIsPreview(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to submit blog');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7fbf5]">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d5a27]">Public Writer</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Submit Your Blog</h1>
          <p className="mt-2 text-sm text-slate-600">Write, preview, and submit your article for admin moderation.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-slate-900">Submission Form</h2>
            <div className="mt-4">
              <SubmissionForm
                values={values}
                onChange={setValues}
                onPreview={() => setIsPreview(true)}
                onSubmit={handleSubmit}
                busy={submitting}
              />
            </div>

            {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            {success && <p className="mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Preview</h2>
              {isPreview && (
                <button
                  type="button"
                  className="text-sm font-medium text-[#2d5a27] hover:text-[#1e3d1a]"
                  onClick={() => setIsPreview(false)}
                >
                  Hide preview
                </button>
              )}
            </div>

            {isPreview ? (
              <SubmissionPreview values={values} />
            ) : (
              <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
                Click Preview to render your blog in detail-page style.
              </p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
