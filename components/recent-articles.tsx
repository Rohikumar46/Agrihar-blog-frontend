"use client"

import { ArticleCard } from "./article-card"
import { ArrowRight, Newspaper } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchPublicBlogs, toArticleCard } from "@/lib/api"
import { ContentState } from "@/components/public/content-state"

const fallbackRecentArticles: ReturnType<typeof toArticleCard>[] = []

export function RecentArticles() {
  const [recentArticles, setRecentArticles] = useState(fallbackRecentArticles)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setHasError(false)

    fetchPublicBlogs({ page: 1, limit: 3 })
      .then((blogs) => {
        if (!isMounted) return
        setRecentArticles(blogs.map(toArticleCard))
      })
      .catch(() => {
        if (isMounted) {
          setRecentArticles([])
          setHasError(true)
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => { isMounted = false }
  }, [])

  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f97316]/10">
              <Newspaper className="h-5 w-5 text-[#f97316]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#f97316]">Latest</span>
              <h2 className="mt-0.5 text-2xl font-bold text-slate-900 sm:text-3xl">Recent Articles</h2>
              <p className="mt-1.5 text-sm text-slate-500">Fresh perspectives on farming, travel, and rural living</p>
            </div>
          </div>
          <Link
            href="/blog"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[#f97316]/25 px-4 py-2 text-sm font-medium text-[#f97316] transition-all hover:bg-[#f97316] hover:text-white md:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Content ── */}
        {loading ? (
          <ContentState kind="loading" message="Loading recent articles..." />
        ) : hasError ? (
          <ContentState kind="error" message="Unable to load recent articles right now." />
        ) : recentArticles.length === 0 ? (
          <ContentState kind="empty" message="No approved recent articles available yet." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        )}

        {/* ── Mobile view-all ── */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#f97316]/25 px-5 py-2.5 text-sm font-medium text-[#f97316] transition-all hover:bg-[#f97316] hover:text-white"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
