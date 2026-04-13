"use client"

import { ArticleCard } from "./article-card"
import { ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchPublicBlogs, toArticleCard } from "@/lib/api"
import { ContentState } from "@/components/public/content-state"

const fallbackSchemeArticles: ReturnType<typeof toArticleCard>[] = []

export function GovernmentSchemes() {
  const [schemeArticles, setSchemeArticles] = useState(fallbackSchemeArticles)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setHasError(false)

    fetchPublicBlogs({ page: 1, limit: 3, category: "government-schemes" })
      .then((blogs) => {
        if (!isMounted) {
          return
        }

        setSchemeArticles(blogs.map(toArticleCard))
      })
      .catch(() => {
        if (isMounted) {
          setSchemeArticles([])
          setHasError(true)
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f97316]/10">
            <Building2 className="w-5 h-5 text-[#f97316]" />
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f97316]">Policy</span>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">Government Schemes</h2>
            <p className="mt-2 text-slate-600">Navigate subsidies, policies, and support programs for farmers</p>
          </div>
          <Link 
            href="/blog/category/government-schemes" 
            className="hidden items-center gap-2 font-medium text-[#f97316] transition-colors hover:text-[#ea580c] md:flex"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <ContentState kind="loading" message="Loading government scheme blogs..." />
        ) : hasError ? (
          <ContentState kind="error" message="Unable to load government scheme blogs right now." />
        ) : schemeArticles.length === 0 ? (
          <ContentState kind="empty" message="No approved government scheme blogs available yet." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schemeArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
