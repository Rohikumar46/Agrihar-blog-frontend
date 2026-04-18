"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileUploadZone } from "./file-upload-zone"
import { BLOG_CATEGORIES, type SubmissionFormState } from "./types"

interface SubmissionFormProps {
  values: SubmissionFormState
  busy: boolean
  onChange: (nextValues: SubmissionFormState) => void
  onPreview: () => void
  onSubmit: () => void
}

export function SubmissionForm({ values, busy, onChange, onPreview, onSubmit }: SubmissionFormProps) {
  function set<K extends keyof SubmissionFormState>(key: K, value: SubmissionFormState[K]) {
    onChange({ ...values, [key]: value })
  }

  return (
    <div className="space-y-5">

      {/* Title */}
      <Input
        placeholder="Blog title"
        value={values.title}
        onChange={(e) => set("title", e.target.value)}
        required
      />

      {/* Cover image */}
      <FileUploadZone
        label="Cover image"
        value={values.imageUrl}
        onChange={(v) => set("imageUrl", v)}
        required
        hint="This appears as the card thumbnail and hero image."
      />

      {/* Body image */}
      <FileUploadZone
        label="Body image (optional)"
        value={values.bodyImage}
        onChange={(v) => set("bodyImage", v)}
        hint="Will be placed in the middle of your blog content."
      />

      {/* Author name */}
      <Input
        placeholder="Author name"
        value={values.authorName}
        onChange={(e) => set("authorName", e.target.value)}
        required
      />

      {/* Author photo */}
      <FileUploadZone
        label="Author photo (optional)"
        value={values.authorImage}
        onChange={(v) => set("authorImage", v)}
        hint="Small avatar shown next to your name."
        maxWidth={300}
        quality={0.80}
      />

      {/* LinkedIn */}
      <Input
        placeholder="LinkedIn URL"
        value={values.authorLinkedIn}
        onChange={(e) => set("authorLinkedIn", e.target.value)}
        required
      />

      {/* Category */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            required
            className="w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-2 pr-9 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2d5a27] focus:ring-2 focus:ring-[#2d5a27]/15 cursor-pointer"
          >
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        <p className="text-xs text-slate-500">
          {values.category === "others"
            ? <>Tagged as <span className="font-medium text-slate-700">Others</span> — will appear in the All Articles section.</>
            : <>Appears in the{" "}<span className="font-medium text-slate-700">{BLOG_CATEGORIES.find((c) => c.value === values.category)?.label}</span>{" "}section.</>
          }
        </p>
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Write your blog content here..."
          rows={12}
          value={values.content}
          onChange={(e) => set("content", e.target.value)}
          required
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2d5a27] focus:ring-2 focus:ring-[#2d5a27]/15 transition"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button type="button" variant="outline" onClick={onPreview} disabled={busy}>
          Preview
        </Button>
        <Button
          type="button"
          className="bg-[#2d5a27] hover:bg-[#1e3d1a]"
          onClick={onSubmit}
          disabled={busy}
        >
          {busy ? "Submitting…" : "Submit for Review"}
        </Button>
      </div>
    </div>
  )
}
