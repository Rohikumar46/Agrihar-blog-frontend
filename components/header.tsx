"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Workshops", href: "/workshops" },
  { label: "Retreats", href: "/retreats" },
  { label: "Join Us", href: "/join-us" },
  { label: "Blog", href: "/blog" },
]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const enhancedNavLinks = useMemo(() => {
    return navLinks.map((link) => ({
      ...link,
      active: link.href === "/" ? pathname === "/" : pathname.startsWith(link.href),
    }))
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-18">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/agrihar-logo.png"
              alt="Agrihar"
              width={150}
              height={40}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-7 text-sm">
              {enhancedNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={
                    link.active
                      ? "border-b-2 border-[#2d5a27] pb-0.5 font-medium text-[#2d5a27]"
                      : "text-slate-600 transition-colors hover:text-[#2d5a27]"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <button
            className="p-2 text-slate-600 transition-colors hover:text-slate-900 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="animate-in slide-in-from-top-2 duration-200 border-t border-black/5 py-4 md:hidden">
            <nav className="flex flex-col gap-1 rounded-2xl bg-white p-2 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              {enhancedNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 transition-colors ${
                    link.active
                      ? "bg-[#2d5a27]/5 font-medium text-[#2d5a27]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#2d5a27]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
