import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { ShareBar } from "@/components/blog/share-bar"

const POST = {
  title: "How Agro Tourism is Transforming Rural India's Economy",
  subTitle:
    "Farm stays, rural trails, and hands-on harvest experiences are giving farmers a second income — and travellers a new story to tell.",
  category: "AGRO TOURISM",
  categorySlug: "agro-tourism",
  authorName: "Priya Sharma",
  authorInitial: "P",
  publishDate: "April 2025",
  readTime: "8 min read",
  imageUrl:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&h=800&fit=crop",
  excerpt:
    "Discover how farm stays and agro-tourism experiences are creating new income streams for farmers across 12 states.",
  slug: "how-agro-tourism-is-transforming-rural-indias-economy",
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://agrihar.com"
const POST_URL = `${SITE_URL}/blog/${POST.slug}`

export const metadata = {
  title: `${POST.title} – Agrihar Blog`,
  description: POST.excerpt,
  openGraph: { images: [POST.imageUrl] },
}

export default function AgroTourismPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <ReadingProgress />
      <Header />

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative">
          <div className="relative h-[58vh] min-h-[380px] max-h-[560px] w-full overflow-hidden">
            <Image
              src={POST.imageUrl}
              alt={POST.title}
              fill
              className="object-cover scale-[1.02]"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.25)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 sm:pb-14">
              {/* breadcrumb + category */}
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
                  {POST.category}
                </span>
              </div>

              {/* title */}
              <h1 className="max-w-3xl text-balance text-[1.9rem] font-extrabold leading-[1.18] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                {POST.title}
              </h1>

              <p className="mt-3 max-w-2xl text-base text-white/65 font-normal leading-relaxed sm:text-lg">
                {POST.subTitle}
              </p>

              {/* author + meta */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2.5 rounded-full bg-white/10 px-3.5 py-2 backdrop-blur-md border border-white/10">
                  <div className="h-7 w-7 rounded-full bg-[#2d5a27] flex items-center justify-center text-[11px] font-bold text-white">
                    {POST.authorInitial}
                  </div>
                  <span className="text-sm font-semibold text-white">{POST.authorName}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs text-white/75 backdrop-blur-md border border-white/10">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  {POST.publishDate}
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs text-white/75 backdrop-blur-md border border-white/10">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {POST.readTime}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Article body ──────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-[#1e3d1a] prose-headings:tracking-tight
              prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-5
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
            dangerouslySetInnerHTML={{
              __html: `
<h2>What is Agro Tourism?</h2>
<p>Agro tourism — also known as farm tourism or agricultural tourism — is a form of rural travel in which visitors stay on or visit working farms to experience agricultural life firsthand. It blends the principles of ecotourism with authentic rural living, giving travellers a chance to participate in seasonal farming activities, learn about sustainable food production, and immerse themselves in the culture and traditions of India's countryside.</p>
<p>Unlike conventional tourism, agro tourism is not about sightseeing. It is about doing — milking buffaloes before sunrise, pressing sugarcane through a wooden kolhu, transplanting paddy in flooded fields, picking strawberries straight from the vine. The farm is not a backdrop; it is the entire experience.</p>

<h2>Why Agro Tourism is Booming in India</h2>
<p>India's agro tourism sector is growing at a remarkable pace. In 2024, the market was valued at USD 1,177.9 million and is projected to reach USD 4,911.9 million by 2033, expanding at a compound annual growth rate of 17.9 percent. This explosive growth is being driven by a convergence of powerful forces.</p>
<p>Urban stress is pushing millions of city dwellers to seek slower, more grounded travel experiences. Growing awareness of organic food and sustainable living is making farm environments appealing destinations rather than working places to be passed through. And the expansion of domestic tourism — accelerated since 2020 — has brought rural India into the travel plans of families who previously looked overseas for holiday destinations.</p>
<p>Ministry of Tourism data shows agro-tourism ventures registered a 38 percent year-on-year growth in visitor footfall, with Maharashtra alone hosting over 4.5 lakh tourists at certified farm properties in a single year.</p>

<h2>How Agro Tourism Transforms Farmers' Income</h2>
<p>For most Indian farmers, income has always been tied directly to what the land produces. A bad monsoon, a price crash at the mandi, or a pest outbreak can erase an entire season's earnings. Agro tourism changes this equation fundamentally by creating a revenue stream that runs parallel to — and independent of — crop output.</p>
<p>The economics are striking. A kilogram of tomatoes sold wholesale to a middleman fetches ₹8 to ₹12. The same tomato, picked by a tourist on a guided farm walk and eaten as part of a home-cooked lunch, becomes part of a ₹1,500-per-head day package. An acre of tomatoes stops being a commodity and becomes an experience economy. Average supplementary income for households participating in certified agro-tourism programmes has crossed ₹1.2 lakh per year — nearly doubling what a comparable rain-fed plot would earn through crop sales alone.</p>
<p>Beyond direct guest income, farms that host visitors consistently report higher sales of value-added products: cold-pressed oils, organic jaggery, handloom textiles, homemade pickles, and local honey. The visiting guest becomes a long-distance customer and a brand ambassador, returning home with produce and sharing photographs that no marketing budget could replicate.</p>

<h2>The Ripple Effect on Rural Economies</h2>
<p>The economic transformation extends far beyond the individual farm. When a village becomes an agro-tourism destination, the entire local economy begins to shift. Roadside tea stalls see new customers. Local artisans find buyers for their craft at source rather than through distant wholesalers. Women's self-help groups gain reliable markets for their food products. Young people who might otherwise migrate to Pune, Hyderabad, or Delhi discover viable livelihoods close to home — as guides, cooks, drivers, and hospitality workers.</p>
<p>In Wayanad, Kerala, tribal farming communities have used agro tourism to share their traditional ecological knowledge — a form of cultural preservation that also generates dignified income. In Maharashtra's Konkan belt, mango orchard owners now run seasonal pick-your-own experiences that draw urban families for entire weekends. These are not performances staged for tourists; they are real agricultural operations made financially visible.</p>

<h2>Government Schemes Powering the Sector</h2>
<p>Recognising agro tourism's potential to simultaneously boost rural incomes, preserve agricultural heritage, and reduce distress migration, multiple levels of government have stepped in with dedicated support.</p>
<p>Maharashtra's Agri Tourism Development Corporation (ATDC) — the oldest and most established programme of its kind in India — has certified over 1,200 farms and trained more than 3,000 farm hosts in hospitality, food safety, hygiene, and digital marketing. Kerala's Responsible Tourism Mission has embedded agro-tourism nodes within its broader rural livelihood framework, ensuring that income flows to women's self-help groups and landless labourers, not just farm owners.</p>
<p>At the national level, the central government's rural development programmes now include dedicated agro-tourism cluster components, providing infrastructure grants of ₹25 to ₹50 lakh to groups of five or more farms that form cooperative tourism circuits. Early adopters in Himachal Pradesh's apple and lavender belts have used this funding to build accessible walking trails, install eco-friendly sanitation, and train local youth as certified nature guides.</p>

<h2>Technology Bringing Farms to Travellers</h2>
<p>One of the most significant shifts enabling agro tourism's growth has been the democratisation of digital marketing and online booking. Platforms such as Farmstay India and StayWithFarmers allow even small, remote farms to list their offerings, manage bookings, and accept digital payments without requiring a dedicated hospitality team. Google Maps and Instagram have become as essential to a successful farm stay as a well-maintained guestroom.</p>
<p>Social media has proven particularly powerful in this sector. A well-composed photograph of children feeding goats, or a reel of early-morning paddy transplantation, can reach tens of thousands of urban users organically within hours. Farms that invest consistently in basic visual storytelling report booking rates three to five times higher than those relying solely on word of mouth.</p>
<p>The infrastructure that powers PM-KISAN direct benefit transfers — bank accounts linked to Aadhaar, mobile payment interfaces, and rural broadband expansion — has also made it easier for small farmers to receive advance bookings and digital payments directly, reducing dependency on tour operators and improving margins.</p>

<h2>Challenges the Sector Must Overcome</h2>
<p>For all its momentum, agro tourism in India faces real and persistent challenges. Connectivity is the most fundamental barrier: farms in genuinely remote locations struggle to attract visitors who are unwilling or unable to navigate poor roads. Basic accommodation infrastructure — clean toilets, safe drinking water, reliable electricity — is still inconsistent across many agro-tourism properties. And the certification and compliance requirements that unlock government support can be bureaucratically burdensome for small farmers navigating the system alone.</p>
<p>Seasonality creates a structural tension. India's peak domestic tourism window — November through February — coincides with the rabi crop season, when farm labour demand is at its highest. Farmers who are simultaneously managing a crop and hosting guests report stress and service quality issues. Building agro tourism sustainably requires either spreading the season across different crop cycles or bringing in supplementary help.</p>
<p>Authenticity is the sector's most delicate asset. Visitors who travel seeking genuine rural connection are perceptive — they recognise quickly when an experience has been staged or sanitised for their comfort. The farms that build long-term reputations are those that integrate tourism into their actual agricultural operations rather than creating a parallel performance alongside them.</p>

<h2>The Future of Agro Tourism in India</h2>
<p>India has approximately 146 million farm holdings. If even half a percent developed a functioning agro-tourism offering, that would represent over 700,000 new rural enterprises — generating income, preserving agricultural knowledge, and creating employment in some of the country's most economically vulnerable communities.</p>
<p>The next decade will be defined by how well the sector manages its own success. This means investing in rural road connectivity and broadband to open up genuinely remote destinations, building affordable certification pathways so small farms can formalise without prohibitive cost, integrating agro-tourism education into agricultural university curricula, and developing sustainable visitor management protocols that protect soil, water, and livestock from the pressures of popularity.</p>
<p>It will also be shaped by choices made on the demand side — by the urban families who decide to spend their next holiday on a working farm instead of a beach resort, and by the travel industry that chooses to promote these experiences with the same energy it brings to international packages.</p>
<p>Agro tourism is not a niche. It is not a trend. It is one of the most structurally important economic transformations available to rural India — and it is already underway, one farm stay at a time.</p>
`,
            }}
          />

          {/* share bar */}
          <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
            <span className="text-sm text-slate-400">Found this helpful? Share it.</span>
            <ShareBar title={POST.title} url={POST_URL} />
          </div>
        </div>

        {/* ── Author card ──────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0f7ee] to-[#e8f4e4] border border-[#2d5a27]/12 shadow-[0_4px_24px_rgba(45,90,39,0.08)]">
            <div className="h-1 w-full bg-gradient-to-r from-[#2d5a27] via-[#4a8c3f] to-[#a3e48c]" />
            <div className="flex items-center gap-5 px-6 py-6 sm:px-8 sm:py-7">
              <div className="h-[72px] w-[72px] shrink-0 rounded-full bg-[#2d5a27] ring-[3px] ring-[#2d5a27]/25 ring-offset-2 ring-offset-[#f0f7ee] shadow-md flex items-center justify-center text-2xl font-bold text-white">
                P
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2d5a27]/60">Written by</p>
                <p className="mt-0.5 text-lg font-bold text-[#1e3d1a] leading-tight">{POST.authorName}</p>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed line-clamp-2">
                  Contributing writer at Agrihar — sharing knowledge on farming, rural innovation, and agri-tech.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Back to category ─────────────────────────────────────────── */}
        <section className="border-t border-slate-100 bg-gradient-to-b from-[#f0f5ee] to-[#f7fbf5] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d5a27]">Continue reading</p>
                <h2 className="mt-1.5 text-2xl font-bold text-[#1e3d1a] sm:text-3xl">More on Agro Tourism</h2>
              </div>
              <Link
                href="/blog/category/agro-tourism"
                className="hidden items-center gap-1.5 rounded-full border border-[#2d5a27]/25 px-4 py-2 text-sm font-medium text-[#2d5a27] transition-all hover:bg-[#2d5a27] hover:text-white sm:inline-flex"
              >
                All posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="text-center py-8">
              <Link
                href="/blog/category/agro-tourism"
                className="inline-flex items-center gap-2 rounded-full bg-[#2d5a27] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1e3d1a] hover:shadow-lg"
              >
                Browse Agro Tourism articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
