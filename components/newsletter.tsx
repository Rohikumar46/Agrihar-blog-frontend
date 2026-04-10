"use client"

import { Mail } from "lucide-react"
import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing:", email)
    setEmail("")
  }

  return (
    <section className="bg-[#fbfbf7] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] bg-[#f5efe5] px-6 py-10 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)] ring-1 ring-black/5 md:px-12 md:py-14">
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f97316]">
              <Mail className="w-7 h-7 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Stay in the Loop</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Get the latest farming insights, government scheme updates, and agro-tourism stories delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 rounded-full border border-black/5 bg-white px-5 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-full bg-[#2d5a27] px-8 py-3 font-medium text-white transition-colors hover:bg-[#1e3d1a]"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
