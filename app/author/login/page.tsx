"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authorAccess } from "@/lib/api"
import { setStoredAuthorToken } from "@/lib/author-auth"
import { Leaf, Pencil, Eye, CheckCircle2, Users, BookOpen, Mail, ArrowRight } from "lucide-react"

const steps = [
  { icon: Pencil, label: "Write", desc: "Fill in your blog details and content" },
  { icon: Eye, label: "Preview", desc: "See exactly how it will look on site" },
  { icon: CheckCircle2, label: "Publish", desc: "We review and publish it for you" },
]

const highlights = [
  {
    icon: Leaf,
    label: "Agri-focused",
    desc: "Reach farmers, agri-enthusiasts & rural change-makers across India",
  },
  {
    icon: Users,
    label: "Real audience",
    desc: "Published on agrihar.com for thousands of active readers",
  },
  {
    icon: BookOpen,
    label: "Any format",
    desc: "Stories, how-tos, research — all voices are welcome",
  },
]

export default function AuthorLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await authorAccess(email.trim())
      setStoredAuthorToken(response.token)
      router.push("/author")
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Access failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7fbf5]">
      <Header />

      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3d1a] via-[#2d5a27] to-[#3a7232]">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
            <Leaf className="h-3.5 w-3.5" />
            Open to Everyone
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Write Your <br className="hidden sm:block" />
            <span className="text-[#a3e48c]">Own Blog</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Have a story about farming, rural life, agri-tech, or government schemes?
            Share it with the Agrihar community — sign in with your email to get started.
          </p>

          {/* 3-step flow */}
          <ol className="mt-10 flex flex-wrap gap-4 sm:gap-6">
            {steps.map((step, i) => (
              <li key={step.label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{step.label}</p>
                  <p className="text-xs text-white/60">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <span className="hidden text-white/30 sm:inline">→</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Two-column section: highlights left, sign-in right ──────────── */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ─ Left: highlights ─ */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2d5a27]">Why write on Agrihar?</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                Your voice,<br />amplified for agriculture
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Agrihar is India&apos;s growing platform for agricultural knowledge. Every blog you publish
                reaches real farmers, researchers, and rural entrepreneurs who are making a difference.
              </p>
            </div>

            <ul className="space-y-4">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <li key={label} className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2d5a27]/10 text-[#2d5a27]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{label}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* testimonial / trust badge */}
            <div className="rounded-2xl border border-[#2d5a27]/15 bg-[#2d5a27]/5 p-5">
              <p className="text-sm italic leading-relaxed text-slate-600">
                &ldquo;Writing on Agrihar helped me connect with hundreds of farmers in my district.
                The reach is incredible.&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold text-[#2d5a27]">— Agrihar Community Writer</p>
            </div>
          </div>

          {/* ─ Right: sign-in card ─ */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            {/* card header */}
            <div className="mb-7 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2d5a27]/10 text-[#2d5a27]">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Sign in to write</h3>
                <p className="text-sm text-slate-500">No password needed — just your email</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-lg border-slate-200 px-4 text-sm focus:border-[#2d5a27] focus:ring-2 focus:ring-[#2d5a27]/15"
                  required
                />
              </div>

              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="group h-11 w-full bg-[#2d5a27] text-sm font-semibold hover:bg-[#1e3d1a]"
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign in
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                )}
              </Button>
            </form>

            {/* divider + reassurance */}
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
              <div className="flex items-start gap-2.5 text-xs text-slate-500">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2d5a27]" />
                Your email is used only to identify your submissions
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-500">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2d5a27]" />
                All blogs are reviewed before going live
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-500">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2d5a27]" />
                Free to publish — no subscriptions or fees
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
