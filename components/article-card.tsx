"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"

interface ArticleCardProps {
  slug: string
  image: string
  category: string
  categoryColor?: string
  title: string
  description: string
  date: string
  readTime: string
  badge?: string
  badgeColor?: string
}

export function ArticleCard({
  slug,
  image,
  category,
  categoryColor = "#f97316",
  title,
  description,
  date,
  readTime,
  badge,
  badgeColor = "#2d5a27",
}: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] hover:border-slate-200"
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={220}
          className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />

        {/* dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* category badge — bottom left, fades in on hover */}
        <span
          className="absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1"
          style={{ backgroundColor: badgeColor ?? categoryColor }}
        >
          {badge ?? category}
        </span>

        {/* arrow icon top-right on hover */}
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-800 opacity-0 shadow transition-all duration-200 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-5">
        <span
          className="text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{ color: categoryColor }}
        >
          {category}
        </span>

        <h3 className="mt-2 flex-1 text-[1rem] font-semibold leading-snug text-slate-900 line-clamp-2 transition-colors group-hover:text-[#2d5a27]">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
          {description}
        </p>

        {/* ── Footer ── */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
            <span className="h-3 w-px bg-slate-200" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readTime}
            </span>
          </div>

          <span
            className="text-xs font-semibold transition-all duration-200 group-hover:gap-1.5 flex items-center gap-1"
            style={{ color: categoryColor }}
          >
            Read
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
