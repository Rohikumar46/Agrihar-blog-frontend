"use client"

import { ArticleCard } from "./article-card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchBlogs, toArticleCard } from "@/lib/api"

const fallbackTechFarmArticles = []

export function TechFarmBlogs() {
  const [techFarmArticles, setTechFarmArticles] = useState(fallbackTechFarmArticles)

  useEffect(() => {
    let isMounted = true

    fetchBlogs({ page: 1, limit: 3, q: "tech farming" })
      .then((blogs) => {
        if (!isMounted) {
          return
        }

        setTechFarmArticles(blogs.map(toArticleCard))
      })
      .catch(() => {
        if (isMounted) {
          setTechFarmArticles([])
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d5a27]">Innovation</span>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">Tech Farm Blogs</h2>
            <p className="mt-2 text-slate-600">Modern techniques transforming traditional agriculture</p>
          </div>
          <Link 
            href="/blog/category/tech-farming" 
            className="hidden items-center gap-2 font-medium text-[#f97316] transition-colors hover:text-[#ea580c] md:flex"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techFarmArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-[22px] bg-[#2f5d29] px-6 py-5 shadow-[0_14px_30px_rgba(15,23,42,0.08)] md:flex-row md:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Start Your Tech Farm Journey</h3>
              <p className="text-sm text-white/75">Join 200+ partner farms and get access to expert workshops</p>
            </div>
          </div>
          <a
            href="#"
            className="whitespace-nowrap rounded-full bg-[#f97316] px-6 py-3 font-medium text-white transition-colors hover:bg-[#ea580c]"
          >
            Explore Workshops
          </a>
        </div>
      </div>
    </section>
  )
}
