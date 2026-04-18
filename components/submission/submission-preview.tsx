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

// ─── shared prose classes (mirrors the live blog page) ────────────────────────
const PROSE =
  "prose prose-lg max-w-none " +
  "prose-headings:font-bold prose-headings:text-[#1e3d1a] prose-headings:tracking-tight " +
  "prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-5 " +
  "prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 " +
  "prose-h3:text-xl prose-h3:mt-8  prose-h3:mb-3 " +
  "prose-p:text-[17px] prose-p:leading-[1.85] prose-p:text-slate-700 " +
  "prose-a:text-[#2d5a27] prose-a:underline prose-a:underline-offset-2 " +
  "prose-strong:text-slate-900 " +
  "prose-ul:text-slate-700 prose-ol:text-slate-700 " +
  "prose-li:leading-relaxed prose-li:my-1 " +
  "prose-blockquote:border-l-4 prose-blockquote:border-[#2d5a27] " +
  "prose-blockquote:bg-[#f0f5ee] prose-blockquote:rounded-r-lg " +
  "prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic " +
  "prose-blockquote:text-slate-700 prose-blockquote:my-8 " +
  "prose-img:rounded-xl prose-img:shadow-md prose-img:my-8"

// ─── body-image injection for HTML content ────────────────────────────────────
function injectBodyImage(html: string, src: string) {
  const block = `<figure class="my-8"><img src="${src}" alt="Blog illustration" class="w-full rounded-xl object-cover shadow-md" /></figure>`
  const count = (html.match(/<\/p>/gi) || []).length
  if (count === 0) return html + block
  const target = Math.max(1, Math.floor(count * 0.45))
  let seen = 0
  return html.replace(/<\/p>/gi, (m) => {
    seen++
    return seen === target ? `</p>${block}` : m
  })
}

// ─── render a single plain-text block (detects heading markers) ───────────────
function PlainBlock({ text }: { text: string }) {
  const t = text.trim()
  if (t.startsWith("#### "))
    return <h4 className="mt-6 mb-2 text-lg font-bold text-[#1e3d1a] tracking-tight">{t.slice(5)}</h4>
  if (t.startsWith("### "))
    return <h3 className="mt-8 mb-3 text-xl font-bold text-[#1e3d1a] tracking-tight">{t.slice(4)}</h3>
  if (t.startsWith("## "))
    return <h2 className="mt-10 mb-4 text-2xl font-bold text-[#1e3d1a] tracking-tight">{t.slice(3)}</h2>
  if (t.startsWith("# "))
    return <h1 className="mt-12 mb-5 text-3xl font-bold text-[#1e3d1a] tracking-tight">{t.slice(2)}</h1>

  // regular paragraph — preserve single line-breaks inside the block
  return (
    <p className="text-[17px] leading-[1.85] text-slate-700">
      {t.split("\n").map((line, j, arr) =>
        j < arr.length - 1
          ? <span key={j}>{line}<br /></span>
          : <span key={j}>{line}</span>
      )}
    </p>
  )
}

// ─── main content renderer ────────────────────────────────────────────────────
function renderContent(content: string, bodyImage: string) {
  const isHtml = /<[a-z][\s\S]*>/i.test(content)

  if (isHtml) {
    const finalHtml = bodyImage ? injectBodyImage(content, bodyImage) : content
    return <div className={PROSE} dangerouslySetInnerHTML={{ __html: finalHtml }} />
  }

  // plain text / markdown-style headings
  const blocks = content.split(/\n{2,}/).filter(Boolean)
  const insertAfter = Math.max(1, Math.floor(blocks.length * 0.45))

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <Fragment key={i}>
          <PlainBlock text={block} />

          {bodyImage && i === insertAfter - 1 && (
            // eslint-disable-next-line @next/next/no-img-element
            <figure className="my-8 overflow-hidden rounded-xl">
              <img
                src={bodyImage}
                alt="Blog illustration"
                className="w-full rounded-xl object-cover shadow-md"
              />
            </figure>
          )}
        </Fragment>
      ))}

      {bodyImage && blocks.length === 0 && (
        // eslint-disable-next-line @next/next/no-img-element
        <figure className="my-8 overflow-hidden rounded-xl">
          <img src={bodyImage} alt="Blog illustration" className="w-full rounded-xl object-cover shadow-md" />
        </figure>
      )}
    </div>
  )
}

// ─── Preview component ────────────────────────────────────────────────────────
export function SubmissionPreview({ values }: SubmissionPreviewProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      {/* Cover image */}
      <div className="relative h-72 w-full sm:h-80">
        <Image
          src={values.imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=700&fit=crop"}
          alt={values.title || "Blog preview image"}
          fill
          className="object-cover"
          unoptimized={values.imageUrl.startsWith("data:")}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Title overlaid on cover — styled as H1 */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4">
          <h1 className="text-2xl font-extrabold leading-tight text-white drop-shadow-md sm:text-3xl">
            {values.title || "Untitled Blog"}
          </h1>
          {values.subTitle && (
            <p className="mt-2 text-sm text-white/75 leading-relaxed sm:text-base">
              {values.subTitle}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2">
            <Image
              src={values.authorImage || DEFAULT_AUTHOR_IMAGE}
              alt={values.authorName || "Author"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-[#2d5a27]/20"
              unoptimized={values.authorImage?.startsWith("data:")}
            />
            <span className="font-semibold text-slate-800">{values.authorName || "Writer"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{estimateReadTime(values.content)}</span>
          </div>
          {values.authorLinkedIn && (
            <a
              href={values.authorLinkedIn}
              target="_blank"
              rel="noreferrer"
              className="ml-auto text-xs font-medium text-[#2d5a27] hover:underline"
            >
              LinkedIn →
            </a>
          )}
        </div>

        {/* Content body */}
        <div>
          {renderContent(values.content || "No content yet.", values.bodyImage)}
        </div>
      </div>
    </article>
  )
}
