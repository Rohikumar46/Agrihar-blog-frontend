import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react";
import { getBlogBySlug, getRelatedPosts, blogPosts } from "@/lib/blog-data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  
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
  const post = getBlogBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = getRelatedPosts(slug, 3);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative h-100 md:h-125 w-full">
          <Image
            src={post.image}
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
                  {post.category}
                </span>
              </div>

              <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/82">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full ring-2 ring-white/20"
                  />
                  <span className="font-medium text-white">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          {/* Share Bar */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Share this article:</span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full bg-[#1877f2] text-white hover:opacity-90 transition-opacity">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-[#1da1f2] text-white hover:opacity-90 transition-opacity">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-[#0a66c2] text-white hover:opacity-90 transition-opacity">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Bookmark className="w-4 h-4" />
              <span className="text-sm">Save</span>
            </button>
          </div>
          
          {/* Article Content */}
          <article 
            className="prose prose-lg max-w-none prose-headings:text-[#1e3d1a] prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-[#2d5a27] prose-blockquote:bg-[#f0f7ed] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-700 prose-a:text-[#2d5a27] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Author Box */}
          <div className="mt-12 p-6 bg-[#f0f7ed] rounded-2xl">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <p className="text-sm text-[#2d5a27] font-medium mb-1">Written by</p>
                <h3 className="text-xl font-bold text-[#1e3d1a] mb-2">{post.author.name}</h3>
                <p className="text-gray-600">
                  Passionate about sustainable agriculture and rural development. 
                  Contributing to Agrihar&apos;s mission of connecting farmers with opportunities.
                </p>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 mr-2">Tags:</span>
            <Link href="#" className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">
              {post.category.toLowerCase()}
            </Link>
            <Link href="#" className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">
              farming
            </Link>
            <Link href="#" className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">
              agriculture
            </Link>
            <Link href="#" className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">
              india
            </Link>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-[#f8faf7] py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3d1a] mb-8">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-medium text-[#f97316]">{relatedPost.category}</span>
                      <h3 className="text-lg font-semibold text-[#1e3d1a] mt-2 mb-2 group-hover:text-[#2d5a27] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{relatedPost.date}</span>
                        <span className="mx-1">•</span>
                        <Clock className="w-3 h-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* CTA Section */}
        <section className="bg-[#2d5a27] py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to explore farm stays and workshops?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join 200+ partner farms and get access to expert workshops, authentic farm stays, 
              and a community of sustainable agriculture enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#"
                className="px-8 py-3 bg-[#f97316] text-white font-medium rounded-lg hover:bg-[#ea580c] transition-colors"
              >
                Explore Workshops
              </Link>
              <Link 
                href="#"
                className="px-8 py-3 bg-white text-[#2d5a27] font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse Farm Stays
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
