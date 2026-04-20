"use client"

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileUploadZone } from "@/components/submission/file-upload-zone"
import { createAuthorBlog } from "@/lib/api"
import { getStoredAuthorToken } from "@/lib/author-auth"
import { BLOG_CATEGORIES } from "@/components/submission/types"
import { saveAuthorPreviewDraft, loadAuthorPreviewDraft } from "@/lib/author-preview"
import { ChevronDown } from "lucide-react"

export default function NewBlogPage() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [category, setCategory] = useState("recent-blogs")
  const [authorLinkedIn, setAuthorLinkedIn] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [bodyImage, setBodyImage] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    const stored = getStoredAuthorToken()
    if (!stored) {
      router.replace("/author/login")
      return
    }
    setToken(stored)

    // Restore form data if returning from preview
    const draft = loadAuthorPreviewDraft()
    if (draft?.values) {
      const v = draft.values
      if (v.title)         setTitle(v.title)
      if (v.subTitle)      setSubTitle(v.subTitle)
      if (v.authorName)    setAuthorName(v.authorName)
      if (v.category)      setCategory(v.category)
      if (v.authorLinkedIn) setAuthorLinkedIn(v.authorLinkedIn)
      if (v.imageUrl)      setImageUrl(v.imageUrl)
      if (v.bodyImage)     setBodyImage(v.bodyImage)
      if (v.content)       setContent(v.content)
    }
  }, [router])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      await createAuthorBlog(token, {
        title: title.trim(),
        subTitle: subTitle.trim(),
        authorName: authorName.trim(),
        category: category.trim() || "general",
        authorLinkedIn: authorLinkedIn.trim(),
        imageUrl: imageUrl.trim(),
        bodyImage: bodyImage || undefined,
        content: content.trim(),
      })
      router.push("/author")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create blog")
    } finally {
      setSubmitting(false)
    }
  }

  function handlePreview() {
    saveAuthorPreviewDraft({
      values: {
        title,
        subTitle,
        imageUrl,
        bodyImage,
        authorName,
        authorImage: "",
        authorLinkedIn,
        content,
        category,
      },
      returnPath: "/author/new",
    })
    router.push("/author/preview")
  }

  return (
    <div className="min-h-screen bg-[#f7fbf5]">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:py-10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d5a27]">Author Portal</p>
            <h1 className="text-2xl font-bold text-slate-900">Write a New Blog</h1>
          </div>
          <Link href="/author" className="text-sm font-medium text-[#f97316] hover:text-[#ea580c]">
            ← Back to dashboard
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog title" required />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Subtitle</label>
              <Input value={subTitle} onChange={(e) => setSubTitle(e.target.value)} placeholder="A short subtitle (optional)" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Your Name *</label>
              <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Full name" required />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-2 pr-9 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2d5a27] focus:ring-2 focus:ring-[#2d5a27]/15 cursor-pointer"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {category === "others"
                  ? <>Tagged as <span className="font-medium">Others</span> — will appear in the All Articles section.</>
                  : <>Your blog will appear in the <span className="font-medium">{BLOG_CATEGORIES.find(c => c.value === category)?.label}</span> section.</>
                }
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">LinkedIn URL</label>
              <Input value={authorLinkedIn} onChange={(e) => setAuthorLinkedIn(e.target.value)} placeholder="https://linkedin.com/in/..." />
            </div>

            <FileUploadZone
              label="Cover image"
              value={imageUrl}
              onChange={setImageUrl}
              hint="Appears as the card thumbnail and hero image."
            />

            <FileUploadZone
              label="Body image (optional)"
              value={bodyImage}
              onChange={setBodyImage}
              hint="Will be placed in the middle of your blog content."
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Content *</label>
              <div className="mb-1 flex flex-wrap gap-1.5 rounded-t-md border border-b-0 border-slate-200 bg-slate-50 px-2 py-1.5">
                {[
                  { label: "H1", insert: "# " },
                  { label: "H2", insert: "## " },
                  { label: "H3", insert: "### " },
                  { label: "H4", insert: "#### " },
                ].map(({ label, insert }) => (
                  <button
                    key={label}
                    type="button"
                    title={`Insert ${label} heading (on a new line)`}
                    onClick={() => setContent((prev) => prev + (prev.endsWith("\n\n") || prev === "" ? "" : "\n\n") + insert)}
                    className="rounded px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-white hover:text-[#2d5a27] border border-transparent hover:border-slate-200 transition-colors"
                  >
                    {label}
                  </button>
                ))}
                <span className="ml-auto self-center text-[10px] text-slate-400">
                  Use ## for headings, blank line between paragraphs
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={"## Introduction\n\nWrite your opening paragraph here...\n\n## Section Title\n\nYour section content goes here."}
                rows={14}
                required
                className="w-full rounded-b-md rounded-t-none border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2d5a27] font-mono"
              />
            </div>

            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
              Your blog will be submitted for admin review before it is published.
            </p>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handlePreview}>
                Preview
              </Button>
              <Button type="submit" className="bg-[#2d5a27] hover:bg-[#1e3d1a]" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit for Review"}
              </Button>
              <Link href="/author">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
