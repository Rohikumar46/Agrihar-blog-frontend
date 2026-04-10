"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { ArticleCard } from "@/components/article-card"
import { ArrowLeft, Leaf, Building2, Cpu, MapPin, BookOpen } from "lucide-react"
import { fetchBlogs, toArticleCard } from "@/lib/api"

const categoryInfo: Record<string, {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
  queryCategory: string
}> = {
  "agro-tourism": {
    title: "Agro Tourism",
    description: "Explore farm stays, rural experiences, and sustainable tourism in agriculture",
    icon: <MapPin className="w-6 h-6" />,
    color: "#f97316",
    bgColor: "bg-[#f97316]/10",
    queryCategory: "agro tourism",
  },
  "tech-farming": {
    title: "Tech Farm Blogs",
    description: "Modern techniques transforming traditional agriculture with technology and innovation",
    icon: <Cpu className="w-6 h-6" />,
    color: "#2d5a27",
    bgColor: "bg-[#2d5a27]/10",
    queryCategory: "tech farming",
  },
  "government-schemes": {
    title: "Government Schemes",
    description: "Navigate subsidies, policies, and support programs for farmers across India",
    icon: <Building2 className="w-6 h-6" />,
    color: "#f97316",
    bgColor: "bg-[#f97316]/10",
    queryCategory: "government scheme",
  },
  "workshops": {
    title: "Workshops",
    description: "Hands-on learning experiences for sustainable farming and rural skills",
    icon: <BookOpen className="w-6 h-6" />,
    color: "#2d5a27",
    bgColor: "bg-[#2d5a27]/10",
    queryCategory: "workshop",
  },
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string

  const info = useMemo(() => {
    return (
      categoryInfo[categorySlug] || {
        title: "All Articles",
        description: "Browse all our articles",
        icon: <Leaf className="w-6 h-6" />,
        color: "#2d5a27",
        bgColor: "bg-[#2d5a27]/10",
        queryCategory: categorySlug,
      }
    )
  }, [categorySlug])

  const [articles, setArticles] = useState<ReturnType<typeof toArticleCard>[]>([])

  useEffect(() => {
    let isMounted = true

    fetchBlogs({ page: 1, limit: 30, q: info.queryCategory })
      .then((blogs) => {
        if (!isMounted) {
          return
        }

        setArticles(blogs.map(toArticleCard))
      })
      .catch(() => {
        if (isMounted) {
          setArticles([])
        }
      })

    return () => {
      isMounted = false
    }
  }, [info.queryCategory])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-linear-to-br from-[#2d5a27] to-[#1e3d1a] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl ${info.bgColor} flex items-center justify-center`} style={{ color: info.color }}>
                {info.icon}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{info.title}</h1>
              </div>
            </div>

            <p className="text-white/80 text-lg max-w-2xl mt-4">{info.description}</p>

            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">{articles.length}</span>
                <span className="text-white/70 text-sm">Articles</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {articles.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} {...article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">No articles found in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  )
}
