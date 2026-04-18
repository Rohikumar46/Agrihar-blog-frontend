"use client"

import { ArticleCard } from "./article-card"
import { ArrowRight, Sprout } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchPublicBlogs, toArticleCard } from "@/lib/api"
import { ContentState } from "@/components/public/content-state"

const fallbackTechFarmArticles: ReturnType<typeof toArticleCard>[] = []

export function TechFarmBlogs() {
  const [techFarmArticles, setTechFarmArticles] = useState(fallbackTechFarmArticles)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setHasError(false)

    fetchPublicBlogs({ page: 1, limit: 3, category: "tech-farming" })
      .then((blogs) => {
        if (!isMounted) return
        setTechFarmArticles(blogs.map(toArticleCard))
      })
      .catch(() => {
        if (isMounted) {
          setTechFarmArticles([])
          setHasError(true)
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => { isMounted = false }
  }, [])

  return (
    <section className="bg-[#f4f9f2] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2d5a27]/10">
              <Sprout className="h-5 w-5 text-[#2d5a27]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#2d5a27]">Innovation</span>
              <h2 className="mt-0.5 text-2xl font-bold text-slate-900 sm:text-3xl">Tech Farm Blogs</h2>
              <p className="mt-1.5 text-sm text-slate-500">Modern techniques transforming traditional agriculture</p>
            </div>
          </div>
          <Link
            href="/blog/category/tech-farming"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[#2d5a27]/25 px-4 py-2 text-sm font-medium text-[#2d5a27] transition-all hover:bg-[#2d5a27] hover:text-white md:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Content ── */}
        {loading ? (
          <ContentState kind="loading" message="Loading tech farm blogs..." />
        ) : hasError ? (
          <ContentState kind="error" message="Unable to load tech farm blogs right now." />
        ) : techFarmArticles.length === 0 ? (
          <ContentState kind="empty" message="No approved tech farm blogs available yet." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {techFarmArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        )}

        {/* ── Mobile view-all ── */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/blog/category/tech-farming"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#2d5a27]/25 px-5 py-2.5 text-sm font-medium text-[#2d5a27] transition-all hover:bg-[#2d5a27] hover:text-white"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── CTA banner ── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl bg-[#2d5a27] px-6 py-6 shadow-[0_8px_30px_rgba(45,90,39,0.18)] md:flex-row md:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Start Your Tech Farm Journey</h3>
              <p className="mt-0.5 text-sm text-white/70">Join 200+ partner farms and get access to expert workshops</p>
            </div>
          </div>
          <a
            href="https://www.agrihar.com/workshops"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-[#f97316] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#ea580c] hover:shadow-md"
          >
            Explore Workshops
          </a>
        </div>
      </div>
    </section>
  )
}
