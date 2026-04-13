"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { fetchMyBlogs, formatDate, type ApiBlog } from "@/lib/api"
import { clearStoredAuthorToken, getStoredAuthorToken } from "@/lib/author-auth"

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  draft: "bg-slate-50 text-slate-600 border-slate-200",
}

export default function AuthorDashboard() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [blogs, setBlogs] = useState<ApiBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const stored = getStoredAuthorToken()
    if (!stored) {
      router.replace("/author/login")
      return
    }
    setToken(stored)
    fetchMyBlogs(stored)
      .then(setBlogs)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load blogs"))
      .finally(() => setLoading(false))
  }, [router])

  function handleLogout() {
    clearStoredAuthorToken()
    router.push("/author/login")
  }

  if (loading) {
    return <div className="p-8 text-center text-slate-600">Loading your blogs...</div>
  }

  return (
    <div className="min-h-screen bg-[#f7fbf5]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d5a27]">Author Portal</p>
            <h1 className="text-2xl font-bold text-slate-900">My Blog Submissions</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/author/new">
              <Button className="bg-[#2d5a27] hover:bg-[#1e3d1a]">+ New Blog</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>

        {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        {blogs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-slate-500">You haven&apos;t submitted any blogs yet.</p>
            <Link href="/author/new">
              <Button className="mt-4 bg-[#2d5a27] hover:bg-[#1e3d1a]">Write your first blog</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[blog.status || "draft"]}`}
                      >
                        {blog.status || "draft"}
                      </span>
                      <span className="text-xs text-slate-400">{formatDate(blog.createdAt)}</span>
                    </div>
                    <h2 className="text-base font-semibold text-slate-900 truncate">{blog.title}</h2>
                    {blog.subTitle && <p className="text-sm text-slate-500 mt-0.5 truncate">{blog.subTitle}</p>}
                    {blog.status === "rejected" && blog.adminMessage && (
                      <p className="mt-2 rounded-md bg-red-50 px-3 py-1.5 text-xs text-red-700">
                        <span className="font-medium">Admin feedback:</span> {blog.adminMessage}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {blog.status === "approved" && (
                      <Link href={`/blog/${blog.slug}`} target="_blank">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>
                    )}
                    {(blog.status === "pending" || blog.status === "rejected") && (
                      <Link href={`/author/edit/${blog._id}`}>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
