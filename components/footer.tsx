"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin, Facebook, Youtube, Instagram } from "lucide-react"

const productLinks = [
  { label: "Workshops", href: "/workshops" },
  { label: "Farm Stays", href: "/farm-stays" },
  { label: "Blog", href: "/blog" }
]

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Meet Our Team", href: "/team" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Other Policies", href: "/policies" }
]

const supportLinks = [
  { label: "FAQ's", href: "/faq" },
  { label: "Report a bug", href: "/report-bug" },
  { label: "Contact Us", href: "/contact" }
]

export function Footer() {
  return (
    <footer className="bg-[#e7efe0]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <h3 className="mb-4 text-base font-semibold text-[#1e3d1a]">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#2d5a27] transition-colors hover:text-[#1e3d1a]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-[#1e3d1a]">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#2d5a27] transition-colors hover:text-[#1e3d1a]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-[#1e3d1a]">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#2d5a27] transition-colors hover:text-[#1e3d1a]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-[#1e3d1a]">Join our newsletter</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-black/5 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/20 focus:border-[#2d5a27]"
              />
              <button className="rounded-md bg-[#2d5a27] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e3d1a]">
                Subscribe
              </button>
            </div>
            <p className="mt-3 text-sm text-[#2d5a27]/70">
              We care about your data in our{" "}
              <Link href="/privacy" className="underline hover:text-[#1e3d1a]">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#2d5a27]/15 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
            <div className="flex flex-col items-center md:items-start">
              <Image
                src="/images/agrihar-logo.png"
                alt="Agrihar"
                width={140}
                height={36}
              />
              <p className="mt-2 text-sm text-[#2d5a27]/70">
                © Agstal Services Pvt Ltd, 2024
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2d5a27]/25 text-[#2d5a27] transition-colors hover:bg-[#2d5a27] hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2d5a27]/25 text-[#2d5a27] transition-colors hover:bg-[#2d5a27] hover:text-white"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2d5a27]/25 text-[#2d5a27] transition-colors hover:bg-[#2d5a27] hover:text-white"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2d5a27]/25 text-[#2d5a27] transition-colors hover:bg-[#2d5a27] hover:text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
