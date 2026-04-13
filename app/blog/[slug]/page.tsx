import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Linkedin, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  estimateReadTime,
  fetchPublicBlogBySlug,
  fetchPublicBlogs,
  formatCategory,
  formatDate,
} from "@/lib/api";

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&h=800&fit=crop";
const DEFAULT_AUTHOR_IMAGE =
  "https://ui-avatars.com/api/?name=Writer&background=2d5a27&color=fff&size=128";

// ─── Content renderer ────────────────────────────────────────────────────────
// Handles both raw HTML (from rich editors) and plain textarea text.
function ContentBody({ content }: { content: string }) {
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  if (isHtml) {
    return (
      <div
        className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-[#1e3d1a] prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-[17px] prose-p:leading-[1.85] prose-p:text-slate-700
          prose-a:text-[#2d5a27] prose-a:underline prose-a:underline-offset-2
          prose-strong:text-slate-900
          prose-ul:text-slate-700 prose-ol:text-slate-700
          prose-li:leading-relaxed prose-li:my-1
          prose-blockquote:border-l-4 prose-blockquote:border-[#2d5a27]
          prose-blockquote:bg-[#f0f5ee] prose-blockquote:rounded-r-lg
          prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic
          prose-blockquote:text-slate-700 prose-blockquote:my-8
          prose-img:rounded-xl prose-img:shadow-md prose-img:my-8"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Plain text — split double newlines into paragraphs
  const paragraphs = content.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="space-y-5">
      {paragraphs.map((para, i) => (
        <p
          key={i}
          className="text-[17px] leading-[1.85] text-slate-700"
        >
          {para.split("\n").map((line, j, arr) =>
            j < arr.length - 1 ? (
              <span key={j}>
                {line}
                <br />
              </span>
            ) : (
              <span key={j}>{line}</span>
            )
          )}
        </p>
      ))}
    </div>
  );
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPublicBlogBySlug(slug);

  if (!post) return { title: "Post Not Found – Agrihar Blog" };

  return {
    title: `${post.title} – Agrihar Blog`,
    description: post.excerpt || post.content.slice(0, 160),
    openGraph: {
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPublicBlogBySlug(slug);

  if (!post) notFound();

  const related = (
    await fetchPublicBlogs({ limit: 4, category: post.category })
  )
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const authorName = post.authorName || post.author || "Agrihar Writer";
  const authorImage = post.authorImage || DEFAULT_AUTHOR_IMAGE;
  const authorLinkedIn = post.authorLinkedIn || "";
  const readTime = estimateReadTime(post.content);
  const publishDate = formatDate(post.createdAt);

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Header />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="relative w-full" style={{ height: "min(68vh, 620px)" }}>
          <Image
            src={post.imageUrl || DEFAULT_COVER}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          {/* gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6 sm:pb-10 md:pb-14">
              {/* top pills row */}
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white border border-white/10"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Link>
                <span className="inline-flex items-center rounded-full bg-[#2d5a27] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
                  {formatCategory(post.category)}
                </span>
              </div>

              {/* title */}
              <h1 className="max-w-3xl text-balance text-3xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {/* subtitle */}
              {post.subTitle && (
                <p className="mt-3 max-w-2xl text-lg text-white/75 font-light leading-snug">
                  {post.subTitle}
                </p>
              )}

              {/* meta row */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                {/* author avatar + name */}
                <div className="flex items-center gap-2.5">
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
                    <Image
                      src={authorImage}
                      alt={authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {authorName}
                  </span>
                </div>

                <span className="hidden h-4 w-px bg-white/25 sm:block" />

                <div className="flex items-center gap-1.5 text-sm text-white/75">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>{publishDate}</span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-white/75">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Article body ─────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
          {/* excerpt pull-quote */}
          {post.excerpt && post.excerpt !== post.content.slice(0, post.excerpt.length) && (
            <p className="mb-10 border-l-4 border-[#2d5a27] pl-5 text-xl font-medium italic leading-relaxed text-slate-500">
              {post.excerpt}
            </p>
          )}

          <ContentBody content={post.content} />
        </div>

        {/* ── Author card ──────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 pb-14 sm:px-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-[0_4px_24px_rgba(15,23,42,0.07)] sm:flex-row sm:items-center sm:gap-5">
            {/* green accent bar on desktop */}
            <div className="hidden h-full w-1 rounded-full bg-[#2d5a27] sm:block self-stretch" />

            {/* avatar */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#2d5a27]/20">
              <Image
                src={authorImage}
                alt={authorName}
                fill
                className="object-cover"
              />
            </div>

            {/* text */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2d5a27]">
                Written by
              </p>
              <p className="mt-0.5 text-lg font-bold text-slate-900 truncate">
                {authorName}
              </p>
              <p className="mt-0.5 text-sm text-slate-500">Public Author · Agrihar Blog</p>
            </div>

            {/* LinkedIn CTA */}
            {authorLinkedIn && (
              <a
                href={authorLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#0a66c2]/20 bg-[#0a66c2]/5 px-4 py-2.5 text-sm font-semibold text-[#0a66c2] transition-all hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2]"
              >
                <Linkedin className="h-4 w-4" />
                View Profile
              </a>
            )}
          </div>
        </div>

        {/* ── Related articles ─────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="border-t border-slate-100 bg-[#f3f7f0] py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d5a27]">
                    Continue reading
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#1e3d1a]">
                    Related Articles
                  </h2>
                </div>
                <Link
                  href="/"
                  className="hidden items-center gap-1 text-sm font-medium text-[#2d5a27] hover:text-[#1e3d1a] sm:flex"
                >
                  All posts <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel._id}
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={
                          rel.imageUrl ||
                          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
                        }
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#f97316]">
                        {formatCategory(rel.category)}
                      </span>
                      <h3 className="mt-2 flex-1 text-base font-semibold leading-snug text-[#1e3d1a] line-clamp-2 group-hover:text-[#2d5a27] transition-colors">
                        {rel.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {rel.excerpt || rel.content.slice(0, 100)}
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(rel.createdAt)}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {estimateReadTime(rel.content)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
