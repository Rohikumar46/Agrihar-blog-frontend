"use client"

import { Fragment } from "react"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { DEFAULT_AUTHOR_IMAGE, type SubmissionFormState } from "./types"

interface SubmissionPreviewProps {
  values: SubmissionFormState
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 220))} min read`
}

function renderContent(content: string, bodyImage: string) {
  const paragraphs = content.split(/\n{2,}/).filter(Boolean)
  const insertAfter = Math.max(1, Math.floor(paragraphs.length * 0.45))

  return (
    <div className="space-y-5">
      {paragraphs.map((para, i) => (
        // key must be on the outermost element, not inside <>
        <Fragment key={i}>
          <p className="text-[16px] leading-[1.85] text-slate-700">
            {para.split("\n").map((line, j, arr) =>
              j < arr.length - 1
                ? <span key={j}>{line}<br /></span>
                : <span key={j}>{line}</span>
            )}
          </p>

          {bodyImage && i === insertAfter - 1 && (
            // plain <img> — works with data: URLs unlike next/image
            // eslint-disable-next-line @next/next/no-img-element
            <figure className="my-6 overflow-hidden rounded-xl">
              <img
                src={bodyImage}
                alt="Blog illustration"
                className="w-full rounded-xl object-cover shadow-md"
              />
            </figure>
          )}
        </Fragment>
      ))}

      {/* no paragraphs at all — show image by itself */}
      {bodyImage && paragraphs.length === 0 && (
        <figure className="my-6 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bodyImage}
            alt="Blog illustration"
            className="w-full rounded-xl object-cover shadow-md"
          />
        </figure>
      )}
    </div>
  )
}

export function SubmissionPreview({ values }: SubmissionPreviewProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      {/* Cover image */}
      <div className="relative h-64 w-full">
        <Image
          src={values.imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=700&fit=crop"}
          alt={values.title || "Blog preview image"}
          fill
          className="object-cover"
          unoptimized={values.imageUrl.startsWith("data:")}
        />
      </div>

      <div className="space-y-4 p-6">
        <h2 className="text-2xl font-bold text-slate-900">{values.title || "Untitled Blog"}</h2>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Image
              src={values.authorImage || DEFAULT_AUTHOR_IMAGE}
              alt={values.authorName || "Author"}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
              unoptimized={values.authorImage?.startsWith("data:")}
            />
            <span className="font-medium text-slate-800">{values.authorName || "Writer"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString("en-IN")}</span>
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

        {renderContent(values.content || "No content yet.", values.bodyImage)}
      </div>
    </article>
  )
}
