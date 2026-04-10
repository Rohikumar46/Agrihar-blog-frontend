"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginAdmin } from "@/lib/api"
import { setStoredToken } from "@/lib/auth"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await loginAdmin(username.trim(), password)
      setStoredToken(response.token)
      router.push("/admin")
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7fbf5]">
      <Header />
      <main className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d5a27]">Admin Access</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Sign in to manage blog posts</h1>
          <p className="mt-2 text-sm text-slate-600">Use your backend admin credentials to create and manage posts.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
                Username
              </label>
              <Input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            <Button type="submit" className="w-full bg-[#2d5a27] hover:bg-[#1e3d1a]" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-5 text-sm text-slate-600">
            Back to browsing?{" "}
            <Link href="/" className="font-medium text-[#f97316] hover:text-[#ea580c]">
              Return home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
