"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { SubmissionPreview } from "@/components/submission/submission-preview"
import { initialSubmissionState, type SubmissionFormState } from "@/components/submission/types"
import { loadAuthorPreviewDraft } from "@/lib/author-preview"

export default function AuthorPreviewPage() {
  const router = useRouter()
  const [values, setValues] = useState<SubmissionFormState>(initialSubmissionState)
  const [returnPath, setReturnPath] = useState("/author/new")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const draft = loadAuthorPreviewDraft()

    if (!draft) {
      router.replace("/author/new")
      return
    }

    setValues({
      ...initialSubmissionState,
      ...draft.values,
    })
    setReturnPath(draft.returnPath || "/author/new")
    setReady(true)
  }, [router])

  if (!ready) {
    return <div className="p-8 text-center text-slate-600">Loading preview...</div>
  }

  return (
    <div className="min-h-screen bg-[#f7fbf5]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d5a27]">Author Preview</p>
            <h1 className="text-2xl font-bold text-slate-900">Preview your blog before submitting</h1>
            <p className="mt-1 text-sm text-slate-600">Check the cover image, body image placement, and content flow.</p>
          </div>
          <div className="flex gap-2">
            <Link href={returnPath}>
              <Button variant="outline">Back to editor</Button>
            </Link>
            <Link href="/author">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </div>

        <SubmissionPreview values={values} />
      </main>
      <Footer />
    </div>
  )
}
