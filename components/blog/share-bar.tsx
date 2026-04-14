"use client"

import { useState } from "react"
import { Link2, Twitter, Linkedin, Check } from "lucide-react"

interface ShareBarProps {
  title: string
  url: string
}

export function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 mr-1">
        Share
      </span>

      <button
        onClick={copyLink}
        title="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-[#2d5a27] hover:bg-[#2d5a27] hover:text-white shadow-sm"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X / Twitter"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-[#1d9bf0] hover:bg-[#1d9bf0] hover:text-white shadow-sm"
      >
        <Twitter className="h-4 w-4" />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white shadow-sm"
      >
        <Linkedin className="h-4 w-4" />
      </a>
    </div>
  )
}
