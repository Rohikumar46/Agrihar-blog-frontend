import { ArticleCard } from "./article-card"
import { ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"

const schemeArticles = [
  {
    slug: "pm-kisan-samman-nidhi-everything-farmers-need-to-know-2026",
    image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=400&h=200&fit=crop",
    category: "GOVERNMENT SCHEMES",
    categoryColor: "#f97316",
    title: "PM Kisan Samman Nidhi: Everything Farmers Need to Know in 2026",
    description: "A complete breakdown of India's flagship direct income support scheme — eligibility, process, and...",
    date: "Mar 16, 2026",
    readTime: "6 min read",
    badge: "Essential",
    badgeColor: "#ef4444"
  },
  {
    slug: "nabard-subsidies-for-agro-tourism-complete-guide",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop",
    category: "GOVERNMENT SCHEMES",
    categoryColor: "#f97316",
    title: "NABARD Subsidies for Agro-Tourism: A Complete Guide",
    description: "Unlock NABARD's financial support programs specifically designed for agro-tourism ventures in...",
    date: "Mar 10, 2026",
    readTime: "6 min read",
    badge: "Guide",
    badgeColor: "#8b5cf6"
  },
  {
    slug: "soil-health-card-scheme-boost-crop-yields-with-data",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=200&fit=crop",
    category: "GOVERNMENT SCHEMES",
    categoryColor: "#f97316",
    title: "Soil Health Card Scheme: How to Boost Crop Yields with Data",
    description: "Using government soil health data to make smarter farming decisions — a practical guide for modern...",
    date: "Mar 10, 2026",
    readTime: "5 min read"
  }
]

export function GovernmentSchemes() {
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {schemeArticles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </div>
    </section>
  )
}
