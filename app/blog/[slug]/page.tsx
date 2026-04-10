import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  estimateReadTime,
  fetchBlogBySlug,
  fetchBlogs,
  formatCategory,
  formatDate,
} from "@/lib/api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found - Agrihar Blog",
    };
  }

  return {
    title: `${post.title} - Agrihar Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = (await fetchBlogs({ limit: 4, category: post.category }))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <div className="relative h-100 md:h-125 w-full">
          <Image
            src={post.imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=700&fit=crop"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12">
            <div className="mx-auto max-w-4xl rounded-[28px] bg-black/20 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-[2px] sm:p-6 md:p-8">
              <div className="mb-5 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>

                <span className="inline-flex items-center rounded-full border border-white/15 bg-[#2d5a27] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                  {formatCategory(post.category)}
                </span>
              </div>

              <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/82">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{estimateReadTime(post.content)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article
            className="prose prose-lg max-w-none prose-headings:text-[#1e3d1a] prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {related.length > 0 && (
          <section className="bg-[#f8faf7] py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3d1a] mb-8">Related Articles</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={
                          relatedPost.imageUrl ||
                          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
                        }
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-medium text-[#f97316]">{formatCategory(relatedPost.category)}</span>
                      <h3 className="text-lg font-semibold text-[#1e3d1a] mt-2 mb-2 group-hover:text-[#2d5a27] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(relatedPost.createdAt)}</span>
                        <span className="mx-1">•</span>
                        <Clock className="w-3 h-3" />
                        <span>{estimateReadTime(relatedPost.content)}</span>
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
