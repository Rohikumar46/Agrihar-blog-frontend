import type { SubmissionFormState } from "@/components/submission/types"

const AUTHOR_PREVIEW_KEY = "agrihar-author-preview-draft"

export interface AuthorPreviewDraft {
  values: SubmissionFormState
  returnPath: string
}

export function saveAuthorPreviewDraft(draft: AuthorPreviewDraft) {
  if (typeof window === "undefined") return
  window.sessionStorage.setItem(AUTHOR_PREVIEW_KEY, JSON.stringify(draft))
}

export function loadAuthorPreviewDraft(): AuthorPreviewDraft | null {
  if (typeof window === "undefined") return null

  const raw = window.sessionStorage.getItem(AUTHOR_PREVIEW_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AuthorPreviewDraft
  } catch {
    return null
  }
}
