export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  badge?: string;
  badgeColor?: string;
}

export const blogPosts: BlogPost[] = [
  // Recent Articles
  {
    id: "1",
    slug: "how-agro-tourism-is-transforming-rural-indias-economy",
    title: "How Agro Tourism is Transforming Rural India's Economy",
    excerpt: "Discover how farm stays and agro-tourism experiences are creating new income streams for farmers across 12 states.",
    content: `
      <p>Agro-tourism is rapidly emerging as a transformative force in rural India's economic landscape. As urban dwellers increasingly seek authentic experiences away from city life, farmers across the country are discovering new revenue streams by opening their doors to visitors.</p>
      
      <h2>The Rise of Farm Tourism</h2>
      <p>Over the past five years, agro-tourism has grown by an impressive 40% annually in India. States like Maharashtra, Kerala, and Karnataka have been at the forefront of this movement, with thousands of farms now offering immersive experiences to tourists.</p>
      
      <p>These experiences range from simple farm stays where guests participate in daily agricultural activities, to elaborate farm-to-table dining experiences that showcase local cuisine and traditional cooking methods.</p>
      
      <h2>Economic Impact on Rural Communities</h2>
      <p>The economic benefits extend far beyond individual farmers. Entire villages are being transformed as ancillary services develop around farm tourism. Local artisans, transportation providers, and food suppliers all benefit from the influx of visitors.</p>
      
      <blockquote>"Since we started our farm stay three years ago, our income has tripled. But more importantly, our children no longer want to migrate to cities - they see a future here," says Ramesh Patil, a farmer from Maharashtra's Konkan region.</blockquote>
      
      <h2>Government Support and Initiatives</h2>
      <p>Recognizing the potential, state governments have launched various schemes to promote agro-tourism. Subsidies for infrastructure development, training programs for farmers, and marketing support have all contributed to the sector's growth.</p>
      
      <h2>Challenges and the Way Forward</h2>
      <p>Despite the growth, challenges remain. Many farmers lack the skills needed to manage tourism operations, and infrastructure in remote areas often needs improvement. However, organizations like Agrihar are bridging these gaps by providing training and connecting farmers with tourists.</p>
      
      <p>As we look to the future, agro-tourism holds immense promise for rural India. It offers a sustainable path to economic development while preserving traditional farming practices and cultural heritage.</p>
    `,
    category: "AGRO TOURISM",
    categorySlug: "agro-tourism",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    author: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    date: "Apr 3, 2026",
    readTime: "5 min read",
    badge: "Trending",
    badgeColor: "bg-orange-500"
  },
  {
    id: "2",
    slug: "rise-of-experiential-farm-stays-what-travelers-want-in-2026",
    title: "The Rise of Experiential Farm Stays: What Travelers Want in 2026",
    excerpt: "Modern travelers seek authentic connections with nature. We explore what makes a farm stay truly memorable.",
    content: `
      <p>The travel industry is witnessing a significant shift as more travelers seek meaningful, immersive experiences over traditional tourism. Farm stays have emerged as a perfect answer to this evolving demand.</p>
      
      <h2>What Modern Travelers Seek</h2>
      <p>Today's travelers, particularly millennials and Gen Z, are looking for experiences that connect them with nature, local communities, and sustainable practices. They want to understand where their food comes from and participate in the agricultural process.</p>
      
      <h2>The Experiential Element</h2>
      <p>Successful farm stays go beyond just accommodation. They offer workshops on organic farming, cooking classes with farm-fresh ingredients, animal interactions, and cultural immersion activities.</p>
      
      <blockquote>"The best farm stays are those that make you feel like part of the family, not just a guest. It's about authentic connections and learning experiences," explains travel expert Ananya Mehta.</blockquote>
      
      <h2>Technology Meets Tradition</h2>
      <p>While the appeal lies in simplicity, smart farm stays are using technology to enhance the experience - from online booking systems to virtual tours that help travelers choose their perfect stay.</p>
      
      <h2>The Future of Farm Tourism</h2>
      <p>As environmental consciousness grows, farm stays that emphasize sustainability and regenerative practices are seeing the highest demand. The future belongs to farms that can balance authenticity with modern comfort.</p>
    `,
    category: "FARM STAYS",
    categorySlug: "farm-stays",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop",
    author: {
      name: "Amit Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    date: "Apr 3, 2026",
    readTime: "4 min read",
    badge: "Popular",
    badgeColor: "bg-green-600"
  },
  {
    id: "3",
    slug: "5-workshops-that-changed-how-we-think-about-sustainable-farming",
    title: "5 Workshops That Changed How We Think About Sustainable Farming",
    excerpt: "From Cordyceps cultivation to hydroponics, these hands-on workshops are sparking a green revolution.",
    content: `
      <p>Sustainable farming is no longer just a concept - it's a movement being driven by innovative workshops that are changing how farmers approach agriculture. Here are five transformative workshops making waves across India.</p>
      
      <h2>1. Hydroponics Masterclass</h2>
      <p>This intensive 3-day workshop teaches participants how to grow crops without soil, using 90% less water than traditional farming. Attendees learn to set up their own hydroponic systems and manage nutrient solutions.</p>
      
      <h2>2. Cordyceps Cultivation Workshop</h2>
      <p>The high-value medicinal mushroom Cordyceps militaris is now being cultivated by small farmers. This workshop covers the entire process from spawn preparation to harvesting and marketing.</p>
      
      <h2>3. Regenerative Agriculture Bootcamp</h2>
      <p>Going beyond organic, regenerative agriculture focuses on rebuilding soil health. Participants learn techniques like no-till farming, cover cropping, and composting.</p>
      
      <h2>4. Spirulina Farming Intensive</h2>
      <p>This superfood can be cultivated in small spaces with minimal investment. The workshop covers everything from setting up production tanks to quality control and packaging.</p>
      
      <h2>5. Smart Farming with IoT</h2>
      <p>Technology meets agriculture in this workshop that teaches farmers to use sensors, automation, and data analytics to optimize their operations.</p>
      
      <blockquote>"These workshops are democratizing knowledge that was once available only to large agricultural corporations," notes Dr. Sunita Narain, environmental activist.</blockquote>
    `,
    category: "WORKSHOPS",
    categorySlug: "workshops",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
    author: {
      name: "Deepak Verma",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    date: "Apr 1, 2026",
    readTime: "6 min read",
    badge: "Featured",
    badgeColor: "bg-amber-500"
  },
  // Tech Farm Blogs
  {
    id: "4",
    slug: "hydroponics-101-growing-crops-without-soil-in-urban-india",
    title: "Hydroponics 101: Growing Crops Without Soil in Urban India",
    excerpt: "Learn how hydroponics is enabling city dwellers to grow fresh produce in small spaces.",
    content: `
      <p>Hydroponics is revolutionizing urban agriculture in India, enabling city dwellers to grow fresh, nutritious produce right in their homes and rooftops. This comprehensive guide will walk you through everything you need to know to get started.</p>
      
      <h2>What is Hydroponics?</h2>
      <p>Hydroponics is a method of growing plants without soil, using mineral nutrient solutions in water. The roots are supported by an inert medium like perlite, clay pellets, or rockwool.</p>
      
      <h2>Why Hydroponics for Urban India?</h2>
      <p>With increasing urbanization and shrinking spaces, hydroponics offers a viable solution for food security. It uses 90% less water than traditional farming and can produce yields 3-10 times higher in the same space.</p>
      
      <h2>Getting Started: Basic Setup</h2>
      <p>You can start with a simple deep water culture (DWC) system for under ₹5,000. All you need is a container, an air pump, growing medium, and nutrient solution. Leafy greens like lettuce, spinach, and herbs are perfect for beginners.</p>
      
      <h2>Common Challenges and Solutions</h2>
      <p>Managing pH levels and preventing algae growth are the most common challenges. Regular monitoring and maintaining water temperature between 18-24°C will help you succeed.</p>
      
      <blockquote>"I started with 10 plants on my balcony. Now I supply fresh lettuce to three restaurants in my neighborhood," shares Kavita Reddy, an urban farmer from Bangalore.</blockquote>
    `,
    category: "TECH FARMING",
    categorySlug: "tech-farming",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop",
    author: {
      name: "Kavita Reddy",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    date: "Mar 28, 2026",
    readTime: "7 min read",
    badge: "Tech",
    badgeColor: "bg-blue-500"
  },
  {
    id: "5",
    slug: "cordyceps-militaris-golden-mushroom-transforming-indian-agriculture",
    title: "Cordyceps Militaris: The Golden Mushroom Transforming Indian Agriculture",
    excerpt: "High-value medicinal mushroom cultivation is becoming a game-changer for small-scale farmers.",
    content: `
      <p>Cordyceps militaris, often called the "Himalayan Gold," is creating new opportunities for Indian farmers. This high-value medicinal mushroom, once harvested wild in the Himalayas, can now be cultivated indoors with remarkable returns.</p>
      
      <h2>The Market Opportunity</h2>
      <p>Dried Cordyceps can fetch anywhere from ₹50,000 to ₹1,50,000 per kilogram depending on quality. The global market for Cordyceps is growing at 9.8% annually, driven by demand for natural health supplements.</p>
      
      <h2>Cultivation Requirements</h2>
      <p>Unlike other mushrooms, Cordyceps requires controlled environment agriculture. You'll need a climate-controlled room maintaining 15-20°C, specific light cycles, and sterile conditions for spawn preparation.</p>
      
      <h2>Investment and Returns</h2>
      <p>A small-scale setup of 500 boxes can be started with an investment of ₹3-5 lakhs. With proper management, farmers can expect monthly revenues of ₹50,000-80,000 after the initial 3-month learning curve.</p>
      
      <h2>Success Stories</h2>
      <blockquote>"I was a struggling paddy farmer earning ₹2 lakhs annually. After switching to Cordyceps cultivation, my income has increased tenfold," reveals Suresh Babu from Karnataka.</blockquote>
      
      <h2>Getting Started</h2>
      <p>Several organizations, including Agrihar, offer comprehensive training programs covering everything from spawn production to marketing. The key is to start small, learn the process, and scale gradually.</p>
    `,
    category: "TECH FARMING",
    categorySlug: "tech-farming",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&h=600&fit=crop",
    author: {
      name: "Suresh Babu",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    date: "Mar 25, 2026",
    readTime: "5 min read",
    badge: "Innovative",
    badgeColor: "bg-emerald-500"
  },
  {
    id: "6",
    slug: "spirulina-farming-superfood-revolution-in-small-spaces",
    title: "Spirulina Farming: A Superfood Revolution in Small Spaces",
    excerpt: "How spirulina cultivation offers massive ROI with minimal land requirements — and where to start.",
    content: `
      <p>Spirulina, the blue-green algae packed with protein and nutrients, is emerging as one of the most profitable crops for small-scale farmers. With minimal space and investment, anyone can start a spirulina farm.</p>
      
      <h2>Why Spirulina?</h2>
      <p>Spirulina contains 60-70% protein, all essential amino acids, and is rich in vitamins and minerals. The global spirulina market is expected to reach $779 million by 2027, with India being a major producer and consumer.</p>
      
      <h2>Space and Investment</h2>
      <p>You can start spirulina cultivation in just 100 sq ft of space with tanks or even cement tubs. Initial investment ranges from ₹50,000 to ₹2 lakhs depending on scale. The culture multiplies every 3-5 days, providing continuous harvests.</p>
      
      <h2>Production Process</h2>
      <p>The process involves maintaining spirulina culture in alkaline water with specific nutrients, harvesting using fine mesh, and drying. Fresh spirulina can be sold directly, or dried and powdered for longer shelf life.</p>
      
      <h2>Market and Pricing</h2>
      <p>Dried spirulina powder sells for ₹1,500-3,000 per kg retail. A small farm can produce 30-50 kg monthly, generating revenues of ₹45,000-1,50,000.</p>
      
      <blockquote>"Spirulina farming changed my life. I started on my terrace and now supply to health food stores across Chennai," says Lakshmi Narayanan, a former IT professional turned spirulina farmer.</blockquote>
    `,
    category: "TECH FARMING",
    categorySlug: "tech-farming",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    author: {
      name: "Lakshmi Narayanan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
    },
    date: "Mar 20, 2026",
    readTime: "4 min read",
    badge: "Profitable",
    badgeColor: "bg-yellow-500"
  },
  // Government Schemes
  {
    id: "7",
    slug: "pm-kisan-samman-nidhi-everything-farmers-need-to-know-2026",
    title: "PM Kisan Samman Nidhi: Everything Farmers Need to Know in 2026",
    excerpt: "A complete breakdown of India's flagship direct income support scheme — eligibility, process, and updates.",
    content: `
      <p>The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) scheme continues to be a lifeline for millions of Indian farmers. Here's your complete guide to understanding and benefiting from this scheme in 2026.</p>
      
      <h2>What is PM-KISAN?</h2>
      <p>Launched in 2019, PM-KISAN provides income support of ₹6,000 per year to eligible farmer families. The amount is paid in three equal installments of ₹2,000 directly to beneficiaries' bank accounts.</p>
      
      <h2>Eligibility Criteria</h2>
      <p>All landholding farmer families are eligible, except those who: paid income tax in the last financial year, are government employees, receive pension above ₹10,000/month, or are professionals like doctors, engineers, lawyers, and CAs.</p>
      
      <h2>2026 Updates</h2>
      <p>The government has introduced mandatory e-KYC for all beneficiaries. Additionally, the installment amount is being reviewed for potential increase to ₹8,000 annually, though this is yet to be confirmed.</p>
      
      <h2>How to Apply</h2>
      <p>New beneficiaries can register through the PM-KISAN portal (pmkisan.gov.in), Common Service Centers, or through their state agriculture department. Required documents include Aadhaar card, land records, and bank account details.</p>
      
      <blockquote>"The ₹6,000 annual support helps us buy seeds and fertilizers at the start of each season. It's not much, but it provides crucial support," says Govind Singh, a wheat farmer from UP.</blockquote>
      
      <h2>Checking Your Status</h2>
      <p>Beneficiaries can check their payment status on the PM-KISAN portal using their Aadhaar number, mobile number, or account number.</p>
    `,
    category: "GOVERNMENT SCHEMES",
    categorySlug: "government-schemes",
    image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=800&h=600&fit=crop",
    author: {
      name: "Rajesh Gupta",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
    },
    date: "Mar 16, 2026",
    readTime: "6 min read",
    badge: "Essential",
    badgeColor: "bg-red-500"
  },
  {
    id: "8",
    slug: "nabard-subsidies-for-agro-tourism-complete-guide",
    title: "NABARD Subsidies for Agro-Tourism: A Complete Guide",
    excerpt: "Unlock NABARD's financial support programs specifically designed for agro-tourism ventures in India.",
    content: `
      <p>The National Bank for Agriculture and Rural Development (NABARD) offers substantial subsidies and loans for agro-tourism projects. This guide explains how you can access these funds to start or expand your agro-tourism venture.</p>
      
      <h2>Available Schemes</h2>
      <p>NABARD supports agro-tourism through multiple schemes including the Rural Infrastructure Development Fund, Agricultural Marketing Infrastructure, and specific state-level agro-tourism promotion schemes.</p>
      
      <h2>Subsidy Components</h2>
      <p>Eligible projects can receive capital subsidies of 25-35% depending on the category. SC/ST farmers and women entrepreneurs may receive additional subsidies up to 44%. The maximum project cost eligible for subsidy is ₹50 lakhs.</p>
      
      <h2>Eligible Activities</h2>
      <p>Subsidies cover construction of farm stay units, development of recreational facilities, purchase of equipment, landscaping, and marketing activities. The infrastructure should be on agricultural land and integrated with farming activities.</p>
      
      <h2>Application Process</h2>
      <p>Applications are routed through commercial banks, cooperative banks, or Regional Rural Banks. You'll need a detailed project report, land documents, and business plan. The bank evaluates the project and forwards it to NABARD for subsidy approval.</p>
      
      <blockquote>"The NABARD subsidy covered 35% of our project cost. Without it, we couldn't have built the cottages and facilities that now host 200 guests monthly," shares Meena Devi, an agro-tourism operator from Himachal Pradesh.</blockquote>
    `,
    category: "GOVERNMENT SCHEMES",
    categorySlug: "government-schemes",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    author: {
      name: "Meena Devi",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop"
    },
    date: "Mar 10, 2026",
    readTime: "6 min read",
    badge: "Guide",
    badgeColor: "bg-purple-500"
  },
  {
    id: "9",
    slug: "soil-health-card-scheme-boost-crop-yields-with-data",
    title: "Soil Health Card Scheme: How to Boost Crop Yields with Data",
    excerpt: "Using government soil health data to make smarter farming decisions — a practical guide for modern farmers.",
    content: `
      <p>The Soil Health Card Scheme is transforming how Indian farmers approach crop management. By understanding your soil's specific needs, you can optimize inputs, reduce costs, and significantly improve yields.</p>
      
      <h2>What is the Soil Health Card?</h2>
      <p>Launched in 2015, the scheme provides farmers with a detailed report on their soil's nutrient status. The card includes information on 12 parameters including nitrogen, phosphorus, potassium, pH, and micronutrients.</p>
      
      <h2>How to Get Your Card</h2>
      <p>Visit your nearest Krishi Vigyan Kendra or agriculture department office. Soil samples are collected, tested in authorized labs, and the card is issued within 2-3 months. The service is free for farmers.</p>
      
      <h2>Reading Your Card</h2>
      <p>The card uses a color-coded system: Red indicates deficiency, Yellow indicates moderate levels, and Green indicates sufficient nutrients. Recommendations for fertilizer application are provided based on the crop you intend to grow.</p>
      
      <h2>Practical Benefits</h2>
      <p>Farmers using soil health card recommendations report 15-20% increase in yields and 20-25% reduction in fertilizer costs. The key is to follow the recommendations consistently over 2-3 crop cycles.</p>
      
      <blockquote>"I was over-applying urea and under-applying potash. After following my soil health card recommendations, my rice yield improved by 18% while my fertilizer bill dropped by ₹3,000 per acre," reports Venkatesh Rao from Telangana.</blockquote>
      
      <h2>Digital Access</h2>
      <p>You can now access your soil health card online through the soilhealth.dac.gov.in portal using your registered mobile number.</p>
    `,
    category: "GOVERNMENT SCHEMES",
    categorySlug: "government-schemes",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop",
    author: {
      name: "Venkatesh Rao",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
    },
    date: "Mar 10, 2026",
    readTime: "5 min read"
  }
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.categorySlug === category);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogBySlug(currentSlug);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.categorySlug === currentPost.categorySlug)
    .slice(0, limit);
}
