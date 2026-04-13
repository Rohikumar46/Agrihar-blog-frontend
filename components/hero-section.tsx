"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Feather } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { fetchPublicBlogs, formatDate } from "@/lib/api"

const categories = [
  { name: "All", href: "/" },
  { name: "Agro Tourism", href: "/blog/category/agro-tourism" },
  { name: "Tech Farming", href: "/blog/category/tech-farming" },
  { name: "Government Schemes", href: "/blog/category/government-schemes" },
  { name: "Workshops", href: "/blog/category/workshops" }
]

export function HeroSection() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Array<{ slug: string; title: string; category: string; createdAt: string }>>([])

  const trimmedQuery = useMemo(() => query.trim(), [query])

  useEffect(() => {
    let isMounted = true

    if (!trimmedQuery) {
      setResults([])
      return () => {
        isMounted = false
      }
    }

    setIsLoading(true)

    const timer = setTimeout(() => {
      fetchPublicBlogs({ page: 1, limit: 6, q: trimmedQuery })
        .then((blogs) => {
          if (!isMounted) {
            return
          }

          setResults(
            blogs.map((blog) => ({
              slug: blog.slug,
              title: blog.title,
              category: blog.category,
              createdAt: blog.createdAt,
            }))
          )
        })
        .catch(() => {
          if (isMounted) {
            setResults([])
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false)
          }
        })
    }, 250)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [trimmedQuery])

  return (
    <section className="relative isolate overflow-hidden bg-[#355f2d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.22),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_32%)]" />
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#f97316]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="space-y-7">
            <div className="flex items-center gap-2 text-white/75">
              <Feather className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em]">Agrihar Blog</span>
            </div>

            <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] text-white text-balance sm:text-5xl xl:text-6xl">
              Stories from the <span className="text-[#f97316]">Field</span>
            </h1>

            <p className="max-w-xl text-base leading-7 text-white/78 sm:text-lg">
              Insights on agro tourism, modern farming techniques, government schemes, and rural experiences — straight from the ground.
            </p>

            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-full bg-white py-3 pl-12 pr-4 text-gray-900 shadow-[0_12px_30px_rgba(15,23,42,0.12)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
              />

              {trimmedQuery && (
                <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                  {isLoading && <p className="px-4 py-3 text-sm text-slate-500">Searching...</p>}

                  {!isLoading && results.length === 0 && (
                    <p className="px-4 py-3 text-sm text-slate-500">No results found</p>
                  )}

                  {!isLoading && results.length > 0 && (
                    <ul className="divide-y divide-black/5">
                      {results.map((result) => (
                        <li key={result.slug}>
                          <Link
                            href={`/blog/${result.slug}`}
                            className="block px-4 py-3 transition-colors hover:bg-[#f5f8f3]"
                            onClick={() => setQuery("")}
                          >
                            <p className="text-sm font-medium text-slate-900 line-clamp-1">{result.title}</p>
                            <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                              {result.category.replace(/-/g, " ")} • {formatDate(result.createdAt)}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div className="grid max-w-md grid-cols-3 gap-4 pt-2 text-white">
              <div>
                <div className="text-2xl font-semibold">50+</div>
                <div className="text-sm text-white/70">Articles</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">12k+</div>
                <div className="text-sm text-white/70">Readers</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">3</div>
                <div className="text-sm text-white/70">Categories</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-[#f97316] text-white"
                      : "bg-white/10 text-white hover:bg-white/18"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:pl-6">
            <div className="overflow-hidden rounded-[28px] bg-white/6 shadow-[0_20px_60px_rgba(15,23,42,0.22)] ring-1 ring-white/10 backdrop-blur-sm">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=300&fit=crop"
                alt="Sunset over farm field"
                width={600}
                height={300}
                className="h-[260px] w-full object-cover sm:h-[280px]"
              />
              <div className="space-y-4 bg-white p-6 sm:p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f97316]">
                  Agro Tourism
                </span>
                <h3 className="text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">
                  How Agro Tourism is Transforming Rural India&apos;s Economy
                </h3>
                <p className="text-sm leading-6 text-slate-600 sm:text-[0.95rem]">
                  Discover how farm stays and agro-tourism experiences are creating new income streams for farmers across 12 states.
                </p>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-slate-200" />
                    <span className="text-sm text-slate-600">Priya Sharma</span>
                  </div>
                  <Link
                    href="/blog/how-agro-tourism-is-transforming-rural-indias-economy"
                    className="text-sm font-medium text-[#f97316] transition-colors hover:text-[#ea580c]"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
