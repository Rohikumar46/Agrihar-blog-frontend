"use client"

import { useState } from "react"
import { Mail, CheckCircle2 } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <section className="bg-[#f4f9f2] py-10 sm:py-12">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">

        {submitted ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="h-10 w-10 text-[#2d5a27]" />
            <p className="text-base font-semibold text-slate-800">You&apos;re subscribed!</p>
            <p className="text-sm text-slate-500">Thanks for joining. Expect your first newsletter soon.</p>
            <button
              onClick={() => { setSubmitted(false); setEmail("") }}
              className="mt-1 text-sm text-[#2d5a27] underline underline-offset-2 hover:text-[#1e3d1a]"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2d5a27]">Newsletter</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Stay in the loop</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
              Weekly farming insights, government scheme alerts, and agri-tech news — delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2d5a27] focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/15 transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2d5a27] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1e3d1a] disabled:opacity-70 whitespace-nowrap"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
          </>
        )}

      </div>
    </section>
  )
}
