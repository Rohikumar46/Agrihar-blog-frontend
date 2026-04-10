"use client"

import { ArticleCard } from "./article-card"
import { ArrowRight, Leaf } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchBlogs, toArticleCard } from "@/lib/api"

const fallbackRecentArticles = []

export function RecentArticles() {
  const [recentArticles, setRecentArticles] = useState(fallbackRecentArticles)

  useEffect(() => {
    let isMounted = true

    fetchBlogs({ page: 1, limit: 3 })
      .then((blogs) => {
        if (!isMounted) {
          return
        }

        setRecentArticles(blogs.map(toArticleCard))
      })
      .catch(() => {
        if (isMounted) {
          setRecentArticles([])
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f97316]">Latest</span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Recent Articles</h2>
            <p className="mt-2 text-slate-600">Fresh perspectives on farming, travel, and rural living</p>
          </div>
          <Link 
            href="/blog"
            className="flex shrink-0 items-center gap-2 font-medium text-[#f97316] transition-colors hover:text-[#ea580c]"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d5a27]/10">
            <Leaf className="w-5 h-5 text-[#2d5a27]" />
          </div>
        </div>
      </div>
    </section>
  )
}
