"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { RecentArticles } from "@/components/recent-articles"
import { TechFarmBlogs } from "@/components/tech-farm-blogs"
import { GovernmentSchemes } from "@/components/government-schemes"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#fbfbf7] text-slate-900">
      <Header />
      <main>
        <HeroSection />
        <RecentArticles />
        <TechFarmBlogs />
        <GovernmentSchemes />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
