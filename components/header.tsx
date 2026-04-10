"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Workshops", href: "/workshops" },
  { label: "Retreats", href: "/retreats" },
  { label: "Join Us", href: "/join-us" },
  { label: "Blog", href: "/blog" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
              {navLinks.map((link) => (
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

            <Link
              href="/login"
              className="rounded-full bg-[#2d5a27] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e3d1a]"
            >
              Login
            </Link>
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
              {navLinks.map((link) => (
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
              <div className="mt-2 border-t border-black/5 px-4 pt-4">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full rounded-full bg-[#2d5a27] px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#1e3d1a]"
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
