"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { clearStoredToken, getStoredToken } from "@/lib/auth"
import { createBlog, deleteBlog, fetchBlogs, fetchMe, formatDate, type ApiBlog, updateBlog } from "@/lib/api"

const BLOG_CATEGORIES = [
  { value: "recent-blogs", label: "Recent Blogs" },
  { value: "tech-farming", label: "Tech Farming" },
  { value: "government-schemes", label: "Government Schemes" },
]

export default function AdminPage() {
  const router = useRouter()

  const [token, setToken] = useState("")
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState("")

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("recent-blogs")
  const [tags, setTags] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isPublished, setIsPublished] = useState(true)

  const [submitting, setSubmitting] = useState(false)
  const [actioningBlogId, setActioningBlogId] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")
  const [editingBlogId, setEditingBlogId] = useState("")

  const [blogs, setBlogs] = useState<ApiBlog[]>([])
  const [loadingBlogs, setLoadingBlogs] = useState(false)

  const parsedTags = useMemo(
    () => tags.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean),
    [tags]
  )

  const isEditing = Boolean(editingBlogId)

  function resetForm() {
    setTitle("")
    setContent("")
    setExcerpt("")
    setCategory("recent-blogs")
    setTags("")
    setImageUrl("")
    setIsPublished(true)
    setEditingBlogId("")
  }

  async function loadBlogs(authToken = token) {
    setLoadingBlogs(true)
    try {
      const response = await fetchBlogs({ page: 1, limit: 20, includeDrafts: true, token: authToken })
      setBlogs(response)
    } finally {
      setLoadingBlogs(false)
    }
  }

  useEffect(() => {
    const storedToken = getStoredToken()

    if (!storedToken) {
      router.replace("/admin/login")
      return
    }

    setToken(storedToken)

    fetchMe(storedToken)
      .then((response) => {
        if (response.user.role !== "admin") {
          throw new Error("Admin access required")
        }

        return loadBlogs(storedToken)
      })
      .catch((error) => {
        setAuthError(error instanceof Error ? error.message : "Authentication failed")
        clearStoredToken()
        router.replace("/admin/login")
      })
      .finally(() => {
        setCheckingAuth(false)
      })
  }, [router])

  async function handleCreateOrUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError("")
    setSubmitSuccess("")
    setSubmitting(true)

    try {
      const payload = {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        category: category.trim().toLowerCase(),
        tags: parsedTags,
        imageUrl: imageUrl.trim() || undefined,
        isPublished,
      }

      if (isEditing) {
        await updateBlog(token, editingBlogId, payload)
        setSubmitSuccess("Blog updated successfully")
      } else {
        await createBlog(token, payload)
        setSubmitSuccess("Blog created successfully")
      }

      resetForm()
      await loadBlogs(token)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to save blog")
    } finally {
      setSubmitting(false)
    }
  }

  function handleEdit(blog: ApiBlog) {
    setSubmitError("")
    setSubmitSuccess("")
    setEditingBlogId(blog._id)
    setTitle(blog.title || "")
    setContent(blog.content || "")
    setExcerpt(blog.excerpt || "")
    setCategory(blog.category || "recent-blogs")
    setTags((blog.tags || []).join(", "))
    setImageUrl(blog.imageUrl || "")
    setIsPublished(Boolean(blog.isPublished))
  }

  async function handleTogglePublished(blog: ApiBlog) {
    if (!token) {
      return
    }

    setSubmitError("")
    setSubmitSuccess("")
    setActioningBlogId(blog._id)

    try {
      await updateBlog(token, blog._id, {
        isPublished: !blog.isPublished,
      })

      setSubmitSuccess(blog.isPublished ? "Blog moved to draft" : "Blog published")
      await loadBlogs(token)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to update publish status")
    } finally {
      setActioningBlogId("")
    }
  }

  async function handleDelete(id: string) {
    if (!token) {
      return
    }

    const confirmed = window.confirm("Delete this blog post?")
    if (!confirmed) {
      return
    }

    try {
      await deleteBlog(token, id)
      await loadBlogs(token)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to delete blog")
    }
  }

  function handleLogout() {
    clearStoredToken()
    router.replace("/admin/login")
  }

  if (checkingAuth) {
    return <div className="p-8 text-center text-slate-600">Checking admin session...</div>
  }

  return (
    <div className="min-h-screen bg-[#f7fbf5]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d5a27]">Admin Panel</p>
            <h1 className="text-2xl font-bold text-slate-900">Manage Blog Content</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-medium text-[#f97316] hover:text-[#ea580c]">
              View site
            </Link>
            <Link href="/admin/moderation" className="text-sm font-medium text-[#2d5a27] hover:text-[#1e3d1a]">
              Moderation queue
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {authError && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{authError}</p>}

        <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-slate-900">{isEditing ? "Edit Post" : "Create New Post"}</h2>
            <form onSubmit={handleCreateOrUpdate} className="mt-4 space-y-3">
              <Input placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} required />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {BLOG_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
              />
              <Input
                placeholder="Image URL (optional)"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
              />
              <Input
                placeholder="Excerpt (optional)"
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
              />
              <label className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(event) => setIsPublished(event.target.checked)}
                  className="h-4 w-4 accent-[#2d5a27]"
                />
                Publish immediately
              </label>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
                rows={8}
                placeholder="Write article content (HTML supported)."
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2d5a27]"
              />

              {submitError && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p>}
              {submitSuccess && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{submitSuccess}</p>}

              <div className="flex gap-2">
                <Button type="submit" className="w-full bg-[#2d5a27] hover:bg-[#1e3d1a]" disabled={submitting}>
                  {submitting ? (isEditing ? "Updating..." : "Publishing...") : isEditing ? "Update blog" : "Publish blog"}
                </Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-slate-900">Recent Posts</h2>
            {loadingBlogs ? (
              <p className="mt-4 text-sm text-slate-500">Loading posts...</p>
            ) : blogs.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">No posts found.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {blogs.map((blog) => (
                  <li key={blog._id} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{blog.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{blog.category}</p>
                        <p className="mt-1 text-xs text-slate-500">{formatDate(blog.createdAt)}</p>
                        <p className={`mt-1 text-xs font-semibold ${blog.isPublished ? "text-emerald-700" : "text-amber-700"}`}>
                          {blog.isPublished ? "Published" : "Draft"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTogglePublished(blog)}
                          disabled={actioningBlogId === blog._id}
                        >
                          {actioningBlogId === blog._id
                            ? "Saving..."
                            : blog.isPublished
                              ? "Unpublish"
                              : "Publish"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(blog)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(blog._id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
