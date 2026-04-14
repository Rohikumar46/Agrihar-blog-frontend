"use client"

import Link from "next/link"
import { ArrowRight, PenLine, Sparkles } from "lucide-react"

const perks = [
  "No login needed to get started",
  "Published directly on agrihar.com",
  "Reach thousands of farming enthusiasts",
]

export function WriteCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3d1a] via-[#2d5a27] to-[#3a7232] py-10 sm:py-12">
      {/* decorative rings */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/8" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/8" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-white/4 blur-3xl" />
      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M0 0h1v40H0zm39 0h1v40h-1zM0 0v1h40V0zm0 39v1h40v-1z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

          {/* ── Left ── */}
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              Open to Everyone
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Got a story about{" "}
              <span className="text-[#a3e48c]">farming or rural life?</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-white/70">
              Share your knowledge, experiences, and insights with the Agrihar community.
              Every voice matters — from a first-time farmer to a seasoned agronomist.
            </p>

            <ul className="mt-6 space-y-2.5">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-sm text-white/75">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#a3e48c]/20 text-[#a3e48c]">
                    <svg viewBox="0 0 12 12" fill="currentColor" className="h-3 w-3">
                      <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: action card ── */}
          <div className="w-full max-w-sm shrink-0">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm ring-1 ring-white/15 sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <PenLine className="h-7 w-7 text-white" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">Write your own blog</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">
                Sign in with your email and start writing in minutes. Your blog will be reviewed and published on the site.
              </p>

              <Link
                href="/author/login"
                className="group mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#f97316] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(249,115,22,0.35)] transition-all hover:bg-[#ea580c] hover:shadow-[0_6px_20px_rgba(249,115,22,0.45)]"
              >
                Start Writing
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <p className="mt-4 text-center text-xs text-white/45">
                Free · No password required
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
