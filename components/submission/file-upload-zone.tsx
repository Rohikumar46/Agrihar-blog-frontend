"use client"

import { ChangeEvent, useRef, useState } from "react"
import Image from "next/image"
import { UploadCloud, X, ImageIcon, Loader2 } from "lucide-react"

interface FileUploadZoneProps {
  label: string
  value: string          // current compressed data-url or ""
  onChange: (dataUrl: string) => void
  required?: boolean
  hint?: string
  /** Max width in pixels after resize (default 1200) */
  maxWidth?: number
  /** JPEG quality 0–1 (default 0.75) */
  quality?: number
}

/**
 * Compress + resize an image File using Canvas.
 * Returns a base64 JPEG data-URL well under typical server limits.
 */
function compressImage(file: File, maxWidth: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)

      const scale = Math.min(1, maxWidth / img.width)
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)

      const canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = h

      const ctx = canvas.getContext("2d")
      if (!ctx) { reject(new Error("Canvas not supported")); return }

      ctx.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL("image/jpeg", quality))
    }

    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("Image load failed")) }
    img.src = objectUrl
  })
}

export function FileUploadZone({
  label,
  value,
  onChange,
  required,
  hint,
  maxWidth = 1200,
  quality = 0.75,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [processing, setProcessing] = useState(false)

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ""

    setProcessing(true)
    try {
      const compressed = await compressImage(file, maxWidth, quality)
      onChange(compressed)
    } catch {
      // fallback: read as-is if canvas fails
      const reader = new FileReader()
      reader.onload = () => onChange(String(reader.result || ""))
      reader.readAsDataURL(file)
    } finally {
      setProcessing(false)
    }
  }

  function clear() {
    onChange("")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {value ? (
        /* ── Preview state ── */
        <div className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <div className="relative h-40 w-full">
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-3 py-2">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <ImageIcon className="h-3.5 w-3.5" />
              Image ready
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-xs font-medium text-[#2d5a27] hover:text-[#1e3d1a] transition-colors"
              >
                Change
              </button>
              <button
                type="button"
                onClick={clear}
                className="flex items-center gap-0.5 text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── Empty / drop zone ── */
        <button
          type="button"
          onClick={() => !processing && inputRef.current?.click()}
          disabled={processing}
          className="flex w-full flex-col items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-8 text-center transition-all hover:border-[#2d5a27]/40 hover:bg-[#2d5a27]/4 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2d5a27]/8 text-[#2d5a27]">
            {processing
              ? <Loader2 className="h-5 w-5 animate-spin" />
              : <UploadCloud className="h-5 w-5" />
            }
          </span>
          {processing ? (
            <span className="text-sm text-slate-500">Compressing image…</span>
          ) : (
            <>
              <span>
                <span className="text-sm font-semibold text-[#2d5a27]">Click to browse</span>
                <span className="text-sm text-slate-500"> or drag & drop</span>
              </span>
              <span className="text-xs text-slate-400">PNG, JPG, WEBP · auto-compressed</span>
            </>
          )}
        </button>
      )}

      {hint && !value && (
        <p className="text-xs text-slate-400">{hint}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}
