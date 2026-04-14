"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { ArticleCard } from "@/components/article-card"
import { ContentState } from "@/components/public/content-state"
import { fetchPublicBlogs, toArticleCard } from "@/lib/api"

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Recent Blogs", value: "recent-blogs" },
  { label: "Tech Farming", value: "tech-farming" },
  { label: "Government Schemes", value: "government-schemes" },
]

export default function AllBlogsPage() {
  const [articles, setArticles] = useState<ReturnType<typeof toArticleCard>[]>([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [activeCategory, setActiveCategory] = useState("")

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setHasError(false)

    const params = activeCategory
      ? { page: 1, limit: 50, category: activeCategory }
      : { page: 1, limit: 50 }

    fetchPublicBlogs(params)
      .then((blogs) => {
        if (!isMounted) return
        setArticles(blogs.map(toArticleCard))
      })
      .catch(() => {
        if (isMounted) {
          setArticles([])
          setHasError(true)
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => { isMounted = false }
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#2d5a27] to-[#1e3d1a] py-14 sm:py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Agrihar</p>
                <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">All Articles</h1>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Fresh perspectives on farming, agri-tech, rural living, and government schemes — all in one place.
            </p>

            {/* Category filter tabs */}
            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    activeCategory === cat.value
                      ? "bg-white text-[#2d5a27]"
                      : "border border-white/30 text-white/80 hover:border-white hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {loading ? (
              <ContentState kind="loading" message="Loading articles..." />
            ) : hasError ? (
              <ContentState kind="error" message="Unable to load articles right now." />
            ) : articles.length > 0 ? (
              <>
                <p className="mb-6 text-sm text-slate-500">
                  {articles.length} article{articles.length !== 1 ? "s" : ""} found
                  {activeCategory ? ` in "${CATEGORIES.find((c) => c.value === activeCategory)?.label}"` : ""}
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <ArticleCard key={article.slug} {...article} />
                  ))}
                </div>
              </>
            ) : (
              <ContentState kind="empty" message="No approved articles found yet." />
            )}
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  )
}
