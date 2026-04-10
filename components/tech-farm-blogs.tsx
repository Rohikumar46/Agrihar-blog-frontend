import { ArticleCard } from "./article-card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const techFarmArticles = [
  {
    slug: "hydroponics-101-growing-crops-without-soil-in-urban-india",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=200&fit=crop",
    category: "TECH FARMING",
    categoryColor: "#2d5a27",
    title: "Hydroponics 101: Growing Crops Without Soil in Urban India",
    description: "Learn how hydroponics is enabling city dwellers to grow fresh produce in small spaces.",
    date: "Mar 28, 2026",
    readTime: "7 min read",
    badge: "Tech",
    badgeColor: "#3b82f6"
  },
  {
    slug: "cordyceps-militaris-golden-mushroom-transforming-indian-agriculture",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400&h=200&fit=crop",
    category: "TECH FARMING",
    categoryColor: "#2d5a27",
    title: "Cordyceps Militaris: The Golden Mushroom Transforming Indian Agriculture",
    description: "High-value medicinal mushroom cultivation is becoming a game-changer for small-scale farmers.",
    date: "Mar 25, 2026",
    readTime: "5 min read",
    badge: "Innovative",
    badgeColor: "#10b981"
  },
  {
    slug: "spirulina-farming-superfood-revolution-in-small-spaces",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop",
    category: "TECH FARMING",
    categoryColor: "#2d5a27",
    title: "Spirulina Farming: A Superfood Revolution in Small Spaces",
    description: "How spirulina cultivation offers massive ROI with minimal land requirements — and where to start.",
    date: "Mar 20, 2026",
    readTime: "4 min read",
    badge: "Profitable",
    badgeColor: "#eab308"
  }
]

export function TechFarmBlogs() {
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
          {techFarmArticles.map((article, index) => (
            <ArticleCard key={index} {...article} />
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
