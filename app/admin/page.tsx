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
  content: `<h2>What is Agro Tourism?</h2>
<p>Agro tourism — also known as farm tourism or agricultural tourism — is a form of rural travel in which visitors stay on or visit working farms to experience agricultural life firsthand. It blends the principles of ecotourism with authentic rural living, giving travellers a chance to participate in seasonal farming activities, learn about sustainable food production, and immerse themselves in the culture and traditions of India's countryside.</p>
<p>Unlike conventional tourism, agro tourism is not about sightseeing. It is about doing — milking buffaloes before sunrise, pressing sugarcane through a wooden kolhu, transplanting paddy in flooded fields, picking strawberries straight from the vine. The farm is not a backdrop; it is the entire experience.</p>

<h2>Why Agro Tourism is Booming in India</h2>
<p>India's agro tourism sector is growing at a remarkable pace. In 2024, the market was valued at USD 1,177.9 million and is projected to reach USD 4,911.9 million by 2033, expanding at a compound annual growth rate of 17.9 percent. Urban stress is pushing millions of city dwellers to seek slower, more grounded travel experiences. Growing awareness of organic food and sustainable living is making farm environments appealing destinations.</p>
<p>Ministry of Tourism data shows agro-tourism ventures registered a 38 percent year-on-year growth in visitor footfall, with Maharashtra alone hosting over 4.5 lakh tourists at certified farm properties in a single year.</p>

<h2>How Agro Tourism Transforms Farmers' Income</h2>
<p>For most Indian farmers, income has always been tied directly to what the land produces. Agro tourism changes this equation by creating a revenue stream independent of crop output. A kilogram of tomatoes sold wholesale fetches Rs. 8 to Rs. 12. The same tomato, picked by a tourist and eaten as part of a home-cooked lunch, becomes part of a Rs. 1,500-per-head day package. Average supplementary income for households in certified programmes has crossed Rs. 1.2 lakh per year.</p>
<p>Beyond direct guest income, farms hosting visitors consistently report higher sales of value-added products: cold-pressed oils, organic jaggery, handloom textiles, homemade pickles, and local honey. The visiting guest becomes a long-distance customer and brand ambassador.</p>

<h2>The Ripple Effect on Rural Economies</h2>
<p>When a village becomes an agro-tourism destination, the entire local economy shifts. Roadside tea stalls see new customers. Local artisans find buyers at source. Women's self-help groups gain reliable markets for food products. Young people discover viable livelihoods close to home — as guides, cooks, drivers, and hospitality workers.</p>
<p>In Wayanad, Kerala, tribal farming communities have used agro tourism to share traditional ecological knowledge — earning income while keeping ancient farming practices alive. In Maharashtra's Konkan belt, mango orchard owners now run seasonal pick-your-own experiences that draw urban families for entire weekends.</p>

<h2>Government Schemes Powering the Sector</h2>
<p>Maharashtra's Agri Tourism Development Corporation (ATDC) has certified over 1,200 farms and trained more than 3,000 farm hosts in hospitality, food safety, and digital marketing. Kerala's Responsible Tourism Mission has embedded agro-tourism nodes within its rural livelihood framework, ensuring income flows to women's self-help groups and landless labourers, not just farm owners.</p>
<p>At the national level, rural development programmes now include agro-tourism cluster components, providing infrastructure grants of Rs. 25 to Rs. 50 lakh to groups of five or more farms forming cooperative tourism circuits.</p>

<h2>Technology Bringing Farms to Travellers</h2>
<p>Platforms such as Farmstay India and StayWithFarmers allow small, remote farms to list offerings, manage bookings, and accept digital payments without a dedicated hospitality team. Social media has proven particularly powerful — a well-composed photograph of children feeding goats can reach tens of thousands of urban users organically within hours.</p>
<p>The infrastructure powering PM-KISAN direct benefit transfers — Aadhaar-linked bank accounts, mobile payment interfaces, and rural broadband expansion — has also made it easier for farmers to receive advance bookings and digital payments directly, improving margins.</p>

<h2>Challenges the Sector Must Overcome</h2>
<p>Connectivity is the most fundamental barrier: farms in genuinely remote locations struggle to attract visitors unable to navigate poor roads. Basic accommodation infrastructure — clean toilets, safe drinking water, reliable electricity — is still inconsistent across many properties. Seasonality creates structural tension, as India's peak tourism window coincides with the rabi crop season when farm labour demand is highest.</p>
<p>Authenticity is the sector's most delicate asset. Visitors seeking genuine rural connection recognise quickly when an experience has been staged. The farms that build long-term reputations are those that integrate tourism into actual agricultural operations rather than creating a parallel performance.</p>

<h2>The Future of Agro Tourism in India</h2>
<p>India has approximately 146 million farm holdings. If even half a percent developed a functioning agro-tourism offering, that would represent over 700,000 new rural enterprises — generating income, preserving agricultural knowledge, and creating employment in some of the country's most economically vulnerable communities.</p>
<p>Agro tourism is not a niche. It is not a trend. It is one of the most structurally important economic transformations available to rural India — and it is already underway, one farm stay at a time.</p>`,
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
              <div>
                <div className="flex flex-wrap gap-1.5 rounded-t-md border border-b-0 border-slate-200 bg-slate-50 px-2 py-1.5">
                  {[
                    { label: "H1", insert: "# " },
                    { label: "H2", insert: "## " },
                    { label: "H3", insert: "### " },
                    { label: "H4", insert: "#### " },
                  ].map(({ label, insert }) => (
                    <button
                      key={label}
                      type="button"
                      title={`Insert ${label} heading`}
                      onClick={() => setContent((prev) => prev + (prev.endsWith("\n\n") || prev === "" ? "" : "\n\n") + insert)}
                      className="rounded px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-white hover:text-[#2d5a27] border border-transparent hover:border-slate-200 transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                  <span className="ml-auto self-center text-[10px] text-slate-400">
                    Use ## for headings, blank line between paragraphs
                  </span>
                </div>
                <textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  required
                  rows={10}
                  placeholder={"## Introduction\n\nWrite your opening paragraph here...\n\n## Section Title\n\nYour section content goes here."}
                  className="w-full rounded-b-md rounded-t-none border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2d5a27] font-mono"
                />
              </div>

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
