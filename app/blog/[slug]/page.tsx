import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareBar } from "@/components/blog/share-bar";
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
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://agrihar.com";

// ─── Content renderer ────────────────────────────────────────────────────────
function ContentBody({ content, bodyImage }: { content: string; bodyImage?: string }) {
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  // Inject bodyImage into HTML content after ~45% of </p> tags
  function htmlWithImage(html: string, img: string) {
    const count = (html.match(/<\/p>/gi) || []).length;
    if (count === 0) return html + bodyImageBlock(img);
    const target = Math.max(1, Math.floor(count * 0.45));
    let seen = 0;
    return html.replace(/<\/p>/gi, (match) => {
      seen++;
      if (seen === target) return `</p>${bodyImageBlock(img)}`;
      return match;
    });
  }

  function bodyImageBlock(src: string) {
    return `<figure class="my-8"><img src="${src}" alt="Blog illustration" class="w-full rounded-xl object-cover shadow-md" /></figure>`;
  }

  if (isHtml) {
    const finalHtml = bodyImage ? htmlWithImage(content, bodyImage) : content;
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
        dangerouslySetInnerHTML={{ __html: finalHtml }}
      />
    );
  }

  // Plain text — inject bodyImage after ~45% of paragraphs
  const paragraphs = content.split(/\n{2,}/).filter(Boolean);
  const insertAfter = Math.max(1, Math.floor(paragraphs.length * 0.45));

  return (
    <div className="space-y-5">
      {paragraphs.map((para, i) => (
        <div key={i}>
          <p className="text-[17px] leading-[1.85] text-slate-700">
            {para.split("\n").map((line, j, arr) =>
              j < arr.length - 1 ? (
                <span key={j}>{line}<br /></span>
              ) : (
                <span key={j}>{line}</span>
              )
            )}
          </p>
          {bodyImage && i === insertAfter - 1 && (
            <figure className="my-8 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bodyImage}
                alt="Blog illustration"
                className="w-full rounded-xl object-cover shadow-md"
              />
            </figure>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Metadata ────────────────────────────────────────────────────────────────
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
    openGraph: { images: post.imageUrl ? [post.imageUrl] : [] },
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

  const related = (await fetchPublicBlogs({ limit: 4, category: post.category }))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const authorName    = post.authorName || post.author || "Agrihar Writer";
  const authorImage   = post.authorImage || DEFAULT_AUTHOR_IMAGE;
  const authorLinkedIn = post.authorLinkedIn || "";
  const readTime      = estimateReadTime(post.content);
  const publishDate   = formatDate(post.createdAt);
  const postUrl       = `${SITE_URL}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* ── Reading progress bar ─────────────────────────────────────────── */}
      <ReadingProgress />

      <Header />

      <main>
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="relative">
          {/* full-bleed cover image */}
          <div className="relative h-[58vh] min-h-[380px] max-h-[560px] w-full overflow-hidden">
            <Image
              src={post.imageUrl || DEFAULT_COVER}
              alt={post.title}
              fill
              className="object-cover scale-[1.02]"
              priority
            />
            {/* multi-stop gradient: bottom-heavy for text, slight vignette on sides */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.25)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
          </div>

          {/* content lifts over the image bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 sm:pb-14">

              {/* breadcrumb + category row */}
              <div className="mb-5 flex flex-wrap items-center gap-2.5">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </Link>
                <span className="h-3.5 w-px bg-white/20" />
                <span className="rounded-full bg-[#2d5a27] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                  {formatCategory(post.category)}
                </span>
              </div>

              {/* title */}
              <h1 className="max-w-3xl text-balance text-[1.9rem] font-extrabold leading-[1.18] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                {post.title}
              </h1>

              {post.subTitle && (
                <p className="mt-3 max-w-2xl text-base text-white/65 font-normal leading-relaxed sm:text-lg">
                  {post.subTitle}
                </p>
              )}

              {/* author + meta pill */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {/* author chip */}
                <div className="flex items-center gap-2.5 rounded-full bg-white/10 px-3.5 py-2 backdrop-blur-md border border-white/10">
                  <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/30">
                    <Image src={authorImage} alt={authorName} fill className="object-cover" />
                  </div>
                  <span className="text-sm font-semibold text-white">{authorName}</span>
                </div>

                {/* date chip */}
                <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs text-white/75 backdrop-blur-md border border-white/10">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  {publishDate}
                </div>

                {/* read time chip */}
                <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs text-white/75 backdrop-blur-md border border-white/10">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {readTime}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Article body ────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
          {/* excerpt pull-quote */}
          {post.excerpt && post.excerpt !== post.content.slice(0, post.excerpt.length) && (
            <p className="mb-10 border-l-4 border-[#2d5a27] pl-5 text-xl font-medium italic leading-relaxed text-slate-500">
              {post.excerpt}
            </p>
          )}

          <ContentBody content={post.content} bodyImage={post.bodyImage} />

          {/* ── Share bar ─────────────────────────────────────────────────── */}
          <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
            <span className="text-sm text-slate-400">Found this helpful? Share it.</span>
            <ShareBar title={post.title} url={postUrl} />
          </div>
        </div>

        {/* ── Author card ─────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0f7ee] to-[#e8f4e4] border border-[#2d5a27]/12 shadow-[0_4px_24px_rgba(45,90,39,0.08)]">

            {/* top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#2d5a27] via-[#4a8c3f] to-[#a3e48c]" />

            <div className="flex items-center gap-5 px-6 py-6 sm:px-8 sm:py-7">
              {/* avatar */}
              <div className="relative shrink-0">
                <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full ring-[3px] ring-[#2d5a27]/25 ring-offset-2 ring-offset-[#f0f7ee] shadow-md">
                  <Image src={authorImage} alt={authorName} fill className="object-cover" />
                </div>
              </div>

              {/* name + bio */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2d5a27]/60">
                  Written by
                </p>
                <p className="mt-0.5 text-lg font-bold text-[#1e3d1a] leading-tight truncate">
                  {authorName}
                </p>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed line-clamp-2">
                  Contributing writer at Agrihar — sharing knowledge on farming, rural innovation, and agri-tech.
                </p>
              </div>

              {/* LinkedIn icon button */}
              {authorLinkedIn && (
                <a
                  href={authorLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View LinkedIn profile"
                  className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#0a66c2] text-white shadow-md transition-all hover:bg-[#004182] hover:shadow-lg hover:scale-110"
                >
                  {/* LinkedIn SVG */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Related articles ────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="border-t border-slate-100 bg-gradient-to-b from-[#f0f5ee] to-[#f7fbf5] py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d5a27]">
                    Continue reading
                  </p>
                  <h2 className="mt-1.5 text-2xl font-bold text-[#1e3d1a] sm:text-3xl">
                    Related Articles
                  </h2>
                </div>
                <Link
                  href="/"
                  className="hidden items-center gap-1.5 rounded-full border border-[#2d5a27]/25 px-4 py-2 text-sm font-medium text-[#2d5a27] transition-all hover:bg-[#2d5a27] hover:text-white sm:inline-flex"
                >
                  All posts <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel._id}
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={rel.imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="absolute top-3 left-3 rounded-full bg-[#2d5a27] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {formatCategory(rel.category)}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#f97316]">
                        {formatCategory(rel.category)}
                      </span>
                      <h3 className="mt-2 flex-1 text-base font-semibold leading-snug text-[#1e3d1a] line-clamp-2 transition-colors group-hover:text-[#2d5a27]">
                        {rel.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {rel.excerpt || rel.content.slice(0, 100)}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-3 text-xs text-slate-400">
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
                        <span className="text-xs font-semibold text-[#2d5a27] opacity-0 transition-opacity group-hover:opacity-100">
                          Read →
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
