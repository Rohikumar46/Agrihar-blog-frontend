"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { ArticleCard } from "@/components/article-card"
import { ArrowLeft, Leaf, Building2, Cpu, MapPin, BookOpen } from "lucide-react"

const allArticles = [
  // Agro Tourism
  {
    slug: "how-agro-tourism-is-transforming-rural-indias-economy",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop",
    category: "AGRO TOURISM",
    filterCategory: "agro-tourism",
    title: "How Agro Tourism is Transforming Rural India's Economy",
    description: "Discover how farm stays and agro-tourism experiences are creating new income streams for farmers across 12 states.",
    date: "Apr 3, 2026",
    readTime: "5 min read",
    badge: "Trending",
    badgeColor: "#f97316"
  },
  {
    slug: "rise-of-experiential-farm-stays-what-travelers-want-in-2026",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=200&fit=crop",
    category: "FARM STAYS",
    filterCategory: "agro-tourism",
    title: "The Rise of Experiential Farm Stays: What Travelers Want in 2026",
    description: "Modern travelers seek authentic connections with nature. We explore what makes a farm stay truly memorable.",
    date: "Apr 3, 2026",
    readTime: "4 min read",
    badge: "Popular",
    badgeColor: "#2d5a27"
  },
  {
    slug: "best-agro-tourism-destinations-in-maharashtra",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=400&h=200&fit=crop",
    category: "AGRO TOURISM",
    filterCategory: "agro-tourism",
    title: "Best Agro Tourism Destinations in Maharashtra",
    description: "Explore the top farm stays and rural experiences in Maharashtra's verdant countryside.",
    date: "Mar 28, 2026",
    readTime: "6 min read",
    badge: "Guide",
    badgeColor: "#8b5cf6"
  },
  {
    slug: "how-to-start-your-own-agro-tourism-business",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=400&h=200&fit=crop",
    category: "AGRO TOURISM",
    filterCategory: "agro-tourism",
    title: "How to Start Your Own Agro Tourism Business",
    description: "A step-by-step guide to launching a successful farm stay or agro tourism venture in India.",
    date: "Mar 22, 2026",
    readTime: "8 min read",
    badge: "Essential",
    badgeColor: "#ef4444"
  },
  // Tech Farming
  {
    slug: "hydroponics-101-growing-crops-without-soil-in-urban-india",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=200&fit=crop",
    category: "TECH FARMING",
    filterCategory: "tech-farming",
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
    filterCategory: "tech-farming",
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
    filterCategory: "tech-farming",
    title: "Spirulina Farming: A Superfood Revolution in Small Spaces",
    description: "How spirulina cultivation offers massive ROI with minimal land requirements — and where to start.",
    date: "Mar 20, 2026",
    readTime: "4 min read",
    badge: "Profitable",
    badgeColor: "#eab308"
  },
  {
    slug: "vertical-farming-future-of-urban-agriculture",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&h=200&fit=crop",
    category: "TECH FARMING",
    filterCategory: "tech-farming",
    title: "Vertical Farming: The Future of Urban Agriculture",
    description: "How vertical farms are revolutionizing food production in cities with limited space.",
    date: "Mar 15, 2026",
    readTime: "6 min read",
    badge: "Future",
    badgeColor: "#06b6d4"
  },
  {
    slug: "iot-sensors-smart-farming-guide",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=200&fit=crop",
    category: "TECH FARMING",
    filterCategory: "tech-farming",
    title: "IoT Sensors in Smart Farming: A Complete Guide",
    description: "Understanding how IoT technology is transforming traditional farming practices.",
    date: "Mar 10, 2026",
    readTime: "7 min read",
    badge: "Tech",
    badgeColor: "#3b82f6"
  },
  // Government Schemes
  {
    slug: "pm-kisan-samman-nidhi-everything-farmers-need-to-know-2026",
    image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=400&h=200&fit=crop",
    category: "GOVERNMENT SCHEMES",
    filterCategory: "government-schemes",
    title: "PM Kisan Samman Nidhi: Everything Farmers Need to Know in 2026",
    description: "A complete breakdown of India's flagship direct income support scheme — eligibility, process, and benefits.",
    date: "Mar 16, 2026",
    readTime: "6 min read",
    badge: "Essential",
    badgeColor: "#ef4444"
  },
  {
    slug: "nabard-subsidies-for-agro-tourism-complete-guide",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop",
    category: "GOVERNMENT SCHEMES",
    filterCategory: "government-schemes",
    title: "NABARD Subsidies for Agro-Tourism: A Complete Guide",
    description: "Unlock NABARD's financial support programs specifically designed for agro-tourism ventures.",
    date: "Mar 10, 2026",
    readTime: "6 min read",
    badge: "Guide",
    badgeColor: "#8b5cf6"
  },
  {
    slug: "soil-health-card-scheme-boost-crop-yields-with-data",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=200&fit=crop",
    category: "GOVERNMENT SCHEMES",
    filterCategory: "government-schemes",
    title: "Soil Health Card Scheme: How to Boost Crop Yields with Data",
    description: "Using government soil health data to make smarter farming decisions — a practical guide.",
    date: "Mar 10, 2026",
    readTime: "5 min read"
  },
  {
    slug: "pradhan-mantri-fasal-bima-yojana-crop-insurance",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=200&fit=crop",
    category: "GOVERNMENT SCHEMES",
    filterCategory: "government-schemes",
    title: "Pradhan Mantri Fasal Bima Yojana: Crop Insurance Made Simple",
    description: "Everything you need to know about India's largest crop insurance scheme for farmers.",
    date: "Mar 5, 2026",
    readTime: "7 min read",
    badge: "Important",
    badgeColor: "#f97316"
  },
  {
    slug: "kisan-credit-card-benefits-application-process",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
    category: "GOVERNMENT SCHEMES",
    filterCategory: "government-schemes",
    title: "Kisan Credit Card: Benefits and Application Process",
    description: "How to get a Kisan Credit Card and maximize its benefits for your farming needs.",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    badge: "Guide",
    badgeColor: "#8b5cf6"
  },
  // Workshops
  {
    slug: "5-workshops-that-changed-how-we-think-about-sustainable-farming",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=200&fit=crop",
    category: "WORKSHOPS",
    filterCategory: "workshops",
    title: "5 Workshops That Changed How We Think About Sustainable Farming",
    description: "From Cordyceps cultivation to hydroponics, these hands-on workshops are sparking a green revolution.",
    date: "Apr 1, 2026",
    readTime: "6 min read",
    badge: "Featured",
    badgeColor: "#f59e0b"
  },
  {
    slug: "mushroom-cultivation-workshop-beginners-guide",
    image: "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=400&h=200&fit=crop",
    category: "WORKSHOPS",
    filterCategory: "workshops",
    title: "Mushroom Cultivation Workshop: A Beginner's Guide",
    description: "Learn the basics of mushroom farming in this comprehensive workshop overview.",
    date: "Mar 20, 2026",
    readTime: "5 min read",
    badge: "Beginner",
    badgeColor: "#10b981"
  },
  {
    slug: "organic-farming-certification-workshop",
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=400&h=200&fit=crop",
    category: "WORKSHOPS",
    filterCategory: "workshops",
    title: "Organic Farming Certification: What You Need to Know",
    description: "A workshop guide to understanding and obtaining organic farming certification in India.",
    date: "Mar 15, 2026",
    readTime: "6 min read",
    badge: "Certification",
    badgeColor: "#2d5a27"
  }
]

const categoryInfo: Record<string, { 
  title: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
}> = {
  "agro-tourism": {
    title: "Agro Tourism",
    description: "Explore farm stays, rural experiences, and sustainable tourism in agriculture",
    icon: <MapPin className="w-6 h-6" />,
    color: "#f97316",
    bgColor: "bg-[#f97316]/10"
  },
  "tech-farming": {
    title: "Tech Farm Blogs",
    description: "Modern techniques transforming traditional agriculture with technology and innovation",
    icon: <Cpu className="w-6 h-6" />,
    color: "#2d5a27",
    bgColor: "bg-[#2d5a27]/10"
  },
  "government-schemes": {
    title: "Government Schemes",
    description: "Navigate subsidies, policies, and support programs for farmers across India",
    icon: <Building2 className="w-6 h-6" />,
    color: "#f97316",
    bgColor: "bg-[#f97316]/10"
  },
  "workshops": {
    title: "Workshops",
    description: "Hands-on learning experiences for sustainable farming and rural skills",
    icon: <BookOpen className="w-6 h-6" />,
    color: "#2d5a27",
    bgColor: "bg-[#2d5a27]/10"
  }
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string
  const info = categoryInfo[categorySlug] || {
    title: "All Articles",
    description: "Browse all our articles",
    icon: <Leaf className="w-6 h-6" />,
    color: "#2d5a27",
    bgColor: "bg-[#2d5a27]/10"
  }

  const filteredArticles = allArticles.filter(
    article => article.filterCategory === categorySlug
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
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
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  {info.title}
                </h1>
              </div>
            </div>
            
            <p className="text-white/80 text-lg max-w-2xl mt-4">
              {info.description}
            </p>
            
            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">{filteredArticles.length}</span>
                <span className="text-white/70 text-sm">Articles</span>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredArticles.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <ArticleCard key={index} {...article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-6">There are no articles in this category yet.</p>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2d5a27] text-white rounded-full font-medium hover:bg-[#1e3d1a] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
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
