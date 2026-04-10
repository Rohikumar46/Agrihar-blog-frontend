import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

interface ArticleCardProps {
  slug: string
  image: string
  category: string
  categoryColor?: string
  title: string
  description: string
  date: string
  readTime: string
  badge?: string
  badgeColor?: string
}

export function ArticleCard({
  slug,
  image,
  category,
  categoryColor = "#f97316",
  title,
  description,
  date,
  readTime,
  badge,
  badgeColor = "#2d5a27"
}: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)]"
    >
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {badge && (
          <span 
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
            style={{ backgroundColor: badgeColor }}
          >
            {badge}
          </span>
        )}
      </div>
      
      <div className="p-5">
        <span 
          className="text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: categoryColor }}
        >
          {category}
        </span>
        
        <h3 className="mt-2 line-clamp-2 text-[1.03rem] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-[#2d5a27]">
          {title}
        </h3>
        
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {description}
        </p>
        
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readTime}
            </span>
          </div>
          <span 
            className="text-sm font-medium transition-colors group-hover:text-[#1e3d1a]"
            style={{ color: categoryColor }}
          >
            Read →
          </span>
        </div>
      </div>
    </Link>
  )
}
