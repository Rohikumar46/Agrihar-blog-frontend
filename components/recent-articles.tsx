import { ArticleCard } from "./article-card"
import { ArrowRight, Leaf } from "lucide-react"
import Link from "next/link"

const recentArticles = [
  {
    slug: "how-agro-tourism-is-transforming-rural-indias-economy",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop",
    category: "AGRO TOURISM",
    title: "How Agro Tourism is Transforming Rural India's Economy",
    description: "Discover how farm stays and agro-tourism experiences are creating new income streams for...",
    date: "Apr 3, 2026",
    readTime: "5 min read",
    badge: "Trending",
    badgeColor: "#f97316"
  },
  {
    slug: "rise-of-experiential-farm-stays-what-travelers-want-in-2026",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=200&fit=crop",
    category: "FARM STAYS",
    title: "The Rise of Experiential Farm Stays: What Travelers Want in 2026",
    description: "Modern travelers seek authentic connections with nature. We explore what makes a farm stay truly...",
    date: "Apr 3, 2026",
    readTime: "4 min read",
    badge: "Popular",
    badgeColor: "#2d5a27"
  },
  {
    slug: "5-workshops-that-changed-how-we-think-about-sustainable-farming",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=200&fit=crop",
    category: "WORKSHOPS",
    title: "5 Workshops That Changed How We Think About Sustainable Farming",
    description: "From Cordyceps cultivation to hydroponics, these hands-on workshops are sparking a green...",
    date: "Apr 1, 2026",
    readTime: "6 min read",
    badge: "Featured",
    badgeColor: "#f59e0b"
  }
]

export function RecentArticles() {
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
          {recentArticles.map((article, index) => (
            <ArticleCard key={index} {...article} />
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
