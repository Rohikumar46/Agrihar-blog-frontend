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
import Image from "next/image"

const HERO_TEMPLATE = {
  title: "How Agro Tourism is Transforming Rural India's Economy",
  excerpt: "Discover how farm stays and agro-tourism experiences are creating new income streams for farmers across 12 states.",
  category: "agro-tourism",
  tags: "agro-tourism, rural-economy, farm-stays, india",
  imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&h=800&fit=crop",
  content: `<h2>A New Chapter for Indian Agriculture</h2>
<p>For generations, the Indian farmer has faced a single, unrelenting pressure: make the land pay. Monsoons, market prices, and middlemen have long dictated the rhythms of rural life. But across twelve states — from the terraced tea estates of Sikkim to the sunflower fields of Karnataka — a quiet revolution is underway. Agro tourism is turning farms into destinations, and farmers into hosts.</p>
<p>The numbers tell a compelling story. According to the Ministry of Tourism's 2023 rural tourism survey, agro-tourism ventures registered a 38 percent year-on-year growth in visitor footfall, with Maharashtra alone hosting over 4.5 lakh tourists at farm-stay properties. Average supplementary income for participating households crossed ₹1.2 lakh per year — nearly doubling what a comparable rain-fed plot would earn in a single season.</p>

<h2>What Agro Tourism Actually Looks Like</h2>
<p>Strip away the brochure language and agro tourism is straightforward: city families pay to spend a weekend or a week doing what farm families do every day. They wake before sunrise to milk buffaloes, wade into paddy fields at transplanting time, press sugarcane through a wooden kolhu, or pick strawberries by the kilogram in Mahabaleshwar. The experience is the product.</p>
<p>Ramesh Patil runs a 12-acre farm outside Pune that has welcomed visitors for the past six years. "In the beginning I was embarrassed," he admits. "I thought — why would anyone pay to do the work I am tired of doing?" The answer arrived with his first group: a family of four from Bengaluru who had never seen a paddy field. They left with muddy feet, two kilograms of fresh tomatoes, and a promise to return. They have come back every monsoon since.</p>

<h2>Income Beyond the Harvest</h2>
<p>The financial logic is simple but powerful. A kilogram of tomatoes sold wholesale fetches ₹8–12. Sold to a tourist who picks it themselves, experiences the farm, and eats a home-cooked meal, the same tomato anchors a ₹1,500-per-head day package. Suddenly, an acre of tomatoes is not just a commodity — it is an experience economy.</p>
<p>Beyond direct earnings, agro tourism builds markets for value-added products. Farms that receive visitors consistently sell more pickles, cold-pressed oils, organic jaggery, and handloom goods than comparable farms without tourism operations. The guest becomes a brand ambassador, sharing photographs and recommendations that no advertising budget could buy.</p>

<h2>Government Support and Certification</h2>
<p>Recognising the sector's potential, several state governments have introduced dedicated agro-tourism policies. Maharashtra's Agro Tourism Development Corporation (ATDC) has certified more than 1,200 farms and trained over 3,000 farm hosts in hospitality, food safety, and digital marketing. Kerala's Responsible Tourism (RT) Mission has integrated agro-tourism nodes into its rural livelihood programme, ensuring that income reaches women's self-help groups as well as landowners.</p>
<p>The central government's PRDP now includes a dedicated agro-tourism cluster component, providing ₹25–50 lakh in infrastructure grants to groups of five or more farms that form cooperative tourism circuits.</p>

<h2>Challenges Ahead</h2>
<p>The growth story is real, but it is not without friction. Connectivity remains the most cited barrier: farms in truly remote areas struggle to attract visitors who are unwilling to drive four hours on a kaccha road. Digital payment infrastructure, basic accommodation standards, and food-handling certification are inconsistently available.</p>
<p>There is also the question of authenticity. As agro tourism scales, the risk of it becoming a theme-park version of farm life grows. The farms that succeed long-term are those where tourism is woven into real agricultural operations, not built on top of them as a performance.</p>

<h2>The Road Forward</h2>
<p>India has approximately 146 million farm holdings. Even if one percent of them developed a modest agro-tourism offering, that would represent 1.46 million new rural enterprises. Technology is a key enabler — platforms like Farmstay India and StayWithFarmers allow farmers to list properties, manage bookings, and receive digital payments.</p>
<p>For Priya Mehta, who manages a lavender and herb farm in Himachal Pradesh's Kangra valley, the transformation has been personal as much as financial. "My children used to be embarrassed that we were farmers," she says. "Now they bring their college friends here for the weekend. The farm gave our family identity. Tourism gave it pride."</p>
<p>That pride — quiet, rooted, earned — may be agro tourism's most important export of all.</p>`,
}

const BLOG_CATEGORIES = [
  { value: "recent-blogs", label: "Recent Blogs" },
  { value: "tech-farming", label: "Tech Farming" },
  { value: "government-schemes", label: "Government Schemes" },
  { value: "others", label: "Others" },
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

  function loadHeroTemplate() {
    setEditingBlogId("")
    setTitle(HERO_TEMPLATE.title)
    setExcerpt(HERO_TEMPLATE.excerpt)
    setCategory(HERO_TEMPLATE.category)
    setTags(HERO_TEMPLATE.tags)
    setImageUrl(HERO_TEMPLATE.imageUrl)
    setContent(HERO_TEMPLATE.content)
    setIsPublished(true)
    setSubmitError("")
    setSubmitSuccess("")
    window.scrollTo({ top: 0, behavior: "smooth" })
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
                <Button type="submit" className="flex-1 bg-[#2d5a27] hover:bg-[#1e3d1a]" disabled={submitting}>
                  {submitting ? (isEditing ? "Updating..." : "Publishing...") : isEditing ? "Update blog" : "Publish blog"}
                </Button>
                {(isEditing || title) && (
                  <Button type="button" variant="outline" onClick={resetForm} disabled={submitting}>
                    {isEditing ? "Cancel" : "Clear"}
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-slate-900">Recent Posts</h2>

            {/* ── Pinned hero card ── */}
            <div className="mt-4 overflow-hidden rounded-xl border border-[#f97316]/40 bg-gradient-to-br from-[#fff8f3] to-[#fff3ea]">
              <div className="flex items-center gap-2 border-b border-[#f97316]/20 px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f97316]">Pinned · Hero Section</span>
              </div>
              <div className="flex gap-3 p-3">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={HERO_TEMPLATE.imageUrl}
                    alt={HERO_TEMPLATE.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold leading-snug text-slate-900 line-clamp-2">
                      {HERO_TEMPLATE.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">Priya Sharma · Agro Tourism</p>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      className="h-7 bg-[#2d5a27] px-3 text-xs hover:bg-[#1e3d1a]"
                      onClick={loadHeroTemplate}
                    >
                      Load into Editor
                    </Button>
                    <Link
                      href="/blog/how-agro-tourism-is-transforming-rural-indias-economy"
                      target="_blank"
                      className="text-xs font-medium text-[#f97316] hover:underline"
                    >
                      Preview →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Regular posts ── */}
            {loadingBlogs ? (
              <p className="mt-4 text-sm text-slate-500">Loading posts...</p>
            ) : blogs.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">No posts found.</p>
            ) : (
              <ul className="mt-3 space-y-3">
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
