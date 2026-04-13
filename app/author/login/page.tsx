"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authorAccess } from "@/lib/api"
import { setStoredAuthorToken } from "@/lib/author-auth"

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
      <main className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d5a27]">Author Portal</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Access your author dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter your email to view and manage your blog submissions. No password required.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>

            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            <Button type="submit" className="w-full bg-[#2d5a27] hover:bg-[#1e3d1a]" disabled={loading}>
              {loading ? "Accessing..." : "Access Dashboard"}
            </Button>
          </form>

          <p className="mt-5 text-sm text-slate-600">
            Are you an admin?{" "}
            <Link href="/admin/login" className="font-medium text-[#f97316] hover:text-[#ea580c]">
              Sign in to admin panel
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
