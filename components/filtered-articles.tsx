"use client"

import { ArticleCard } from "./article-card"
import { ArrowRight, Leaf } from "lucide-react"
import { useCategory } from "@/lib/category-context"

const allArticles = [
  // Agro Tourism
  {
    slug: "how-agro-tourism-is-transforming-rural-indias-economy",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop",
    category: "AGRO TOURISM",
    filterCategory: "Agro Tourism",
    title: "How Agro Tourism is Transforming Rural India's Economy",
    description: "Discover how farm stays and agro-tourism experiences are creating new income streams for...",
    date: "Apr 3, 2026",
    readTime: "5 min read",
    badge: "Trending",
    badgeColor: "#f97316"
  },
  {
    slug: "rise-of-experiential-farm-stays-what-travelers-want-in-2026",
    href: "https://www.agrihar.com/retreats",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=200&fit=crop",
    category: "FARM STAYS",
    filterCategory: "Agro Tourism",
    title: "The Rise of Experiential Farm Stays: What Travelers Want in 2026",
    description: "Modern travelers seek authentic connections with nature. We explore what makes a farm stay truly...",
    date: "Apr 3, 2026",
    readTime: "4 min read",
    badge: "Popular",
    badgeColor: "#2d5a27"
  },
  // Workshops
  {
    slug: "5-workshops-that-changed-how-we-think-about-sustainable-farming",
    href: "https://www.agrihar.com/workshops",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=200&fit=crop",
    category: "WORKSHOPS",
    filterCategory: "Workshops",
    title: "5 Workshops That Changed How We Think About Sustainable Farming",
    description: "From Cordyceps cultivation to hydroponics, these hands-on workshops are sparking a green...",
    date: "Apr 1, 2026",
    readTime: "6 min read",
    badge: "Featured",
    badgeColor: "#f59e0b"
  },
  // Tech Farming
  {
    slug: "hydroponics-101-growing-crops-without-soil-in-urban-india",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=200&fit=crop",
    category: "TECH FARMING",
    filterCategory: "Tech Farming",
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
    filterCategory: "Tech Farming",
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
    filterCategory: "Tech Farming",
    title: "Spirulina Farming: A Superfood Revolution in Small Spaces",
    description: "How spirulina cultivation offers massive ROI with minimal land requirements — and where to start.",
    date: "Mar 20, 2026",
    readTime: "4 min read",
    badge: "Profitable",
    badgeColor: "#eab308"
  },
  // Government Schemes
  {
    slug: "pm-kisan-samman-nidhi-everything-farmers-need-to-know-2026",
    image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=400&h=200&fit=crop",
    category: "GOVERNMENT SCHEMES",
    filterCategory: "Government Schemes",
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
    filterCategory: "Government Schemes",
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
    filterCategory: "Government Schemes",
    title: "Soil Health Card Scheme: How to Boost Crop Yields with Data",
    description: "Using government soil health data to make smarter farming decisions — a practical guide for modern...",
    date: "Mar 10, 2026",
    readTime: "5 min read"
  }
]

export function FilteredArticles() {
  const { activeCategory } = useCategory()

  const filteredArticles = activeCategory === "All" 
    ? allArticles 
    : allArticles.filter(article => article.filterCategory === activeCategory)

  const sectionTitle = activeCategory === "All" ? "All Articles" : activeCategory
  const sectionDescription = activeCategory === "All" 
    ? "Fresh perspectives on farming, travel, and rural living"
    : `Explore our ${activeCategory.toLowerCase()} articles`

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-semibold text-[#f97316] uppercase tracking-wide">
              {activeCategory === "All" ? "LATEST" : activeCategory.toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{sectionTitle}</h2>
            <p className="text-gray-600 mt-2">{sectionDescription}</p>
          </div>
          <a 
            href="#" 
            className="flex items-center gap-2 text-[#f97316] font-medium hover:underline shrink-0"
          >
            View all <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found in this category.</p>
          </div>
        )}

        {/* Decorative Icon */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <div className="w-10 h-10 rounded-full bg-[#2d5a27]/10 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-[#2d5a27]" />
          </div>
        </div>
      </div>
    </section>
  )
}
