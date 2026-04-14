"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Search, Feather } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { fetchPublicBlogs, formatDate } from "@/lib/api"

const categories = [
  { name: "All", href: "/" },
  { name: "Agro Tourism", href: "/blog/category/agro-tourism" },
  { name: "Tech Farming", href: "/blog/category/tech-farming" },
  { name: "Government Schemes", href: "/blog/category/government-schemes" },
  { name: "Workshops", href: "/blog/category/workshops" },
]

// ─────────────────────────────────────────────────────────────────────────────
export function HeroSection() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [results, setResults] = useState<Array<{ slug: string; title: string; category: string; createdAt: string }>>([])
  const searchRef = useRef<HTMLDivElement>(null)

  const trimmedQuery = useMemo(() => query.trim(), [query])

  // close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    let isMounted = true
    if (!trimmedQuery) { setResults([]); return () => { isMounted = false } }

    setIsLoading(true)
    const timer = setTimeout(() => {
      fetchPublicBlogs({ page: 1, limit: 6, q: trimmedQuery })
        .then((blogs) => {
          if (!isMounted) return
          setResults(blogs.map((b) => ({ slug: b.slug, title: b.title, category: b.category, createdAt: b.createdAt })))
        })
        .catch(() => { if (isMounted) setResults([]) })
        .finally(() => { if (isMounted) setIsLoading(false) })
    }, 250)

    return () => { isMounted = false; clearTimeout(timer) }
  }, [trimmedQuery])

  const showDropdown = isFocused && trimmedQuery.length > 0

  return (
    <section className="relative isolate overflow-hidden bg-[#2a5124]">
      {/* background blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.18),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%)]" />
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-white/4 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#f97316]/8 blur-3xl" />
      {/* subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0zm39 0h1v40h-1zM0 0v1h40V0zm0 39v1h40v-1z'/%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="space-y-7">
            {/* label */}
            <div className="flex items-center gap-2 text-white/65">
              <Feather className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.24em]">Agrihar Blog</span>
            </div>

            {/* headline */}
            <h1 className="max-w-xl text-balance text-4xl font-bold leading-[1.08] text-white sm:text-5xl xl:text-[3.4rem]">
              Stories from the{" "}
              <span className="relative inline-block text-[#f97316]">
                Field
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#f97316]/40" />
              </span>
            </h1>

            <p className="max-w-lg text-base leading-7 text-white/70 sm:text-[1.05rem]">
              Insights on agro tourism, modern farming techniques, government schemes, and rural experiences — straight from the ground.
            </p>

            {/* ── Search ── */}
            <div ref={searchRef} className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="w-full rounded-2xl bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.18)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f97316]/60 transition-shadow"
              />

              {showDropdown && (
                <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
                  {isLoading && (
                    <p className="flex items-center gap-2 px-4 py-3 text-sm text-slate-400">
                      <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-[#2d5a27]" />
                      Searching...
                    </p>
                  )}
                  {!isLoading && results.length === 0 && (
                    <p className="px-4 py-3 text-sm text-slate-500">No results for &ldquo;{trimmedQuery}&rdquo;</p>
                  )}
                  {!isLoading && results.length > 0 && (
                    <ul className="divide-y divide-black/5 py-1">
                      {results.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={`/blog/${r.slug}`}
                            className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[#f5f8f3]"
                            onClick={() => { setQuery(""); setIsFocused(false) }}
                          >
                            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#2d5a27]/40 mt-2" />
                            <div>
                              <p className="text-sm font-medium text-slate-900 line-clamp-1">{r.title}</p>
                              <p className="mt-0.5 text-xs text-slate-400 uppercase tracking-wide">
                                {r.category.replace(/-/g, " ")} · {formatDate(r.createdAt)}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* ── Category pills ── */}
            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((cat, i) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    i === 0
                      ? "bg-[#f97316] text-white shadow-[0_4px_12px_rgba(249,115,22,0.35)] hover:bg-[#ea580c]"
                      : "bg-white/10 text-white/85 hover:bg-white/18 hover:text-white border border-white/10"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: feature card ─────────────────────────────────────── */}
          <div className="lg:pl-4">
            <div className="group overflow-hidden rounded-[24px] bg-white shadow-[0_24px_64px_rgba(15,23,42,0.26)] ring-1 ring-white/15 transition-transform duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=300&fit=crop"
                  alt="Sunset over farm field"
                  width={600}
                  height={300}
                  className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] sm:h-[260px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[#f97316] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-sm">
                  Agro Tourism
                </span>
              </div>

              <div className="space-y-3 bg-white p-6">
                <h3 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                  How Agro Tourism is Transforming Rural India&apos;s Economy
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  Discover how farm stays and agro-tourism experiences are creating new income streams for farmers across 12 states.
                </p>
                <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-[#2d5a27]/10 flex items-center justify-center text-[10px] font-bold text-[#2d5a27]">P</div>
                    <span className="text-sm text-slate-600">Priya Sharma</span>
                  </div>
                  <Link
                    href="/blog/how-agro-tourism-is-transforming-rural-indias-economy"
                    className="group/link inline-flex items-center gap-1 text-sm font-semibold text-[#f97316] transition-colors hover:text-[#ea580c]"
                  >
                    Read more
                    <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
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
