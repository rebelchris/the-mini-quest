"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import type { Activity } from "@/app/page"

interface ActivityModalProps {
  activity: Activity | null
  onClose: () => void
}

export function ActivityModal({ activity, onClose }: ActivityModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (activity) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [activity, onClose])

  if (!activity) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{activity.age}</span>
            <span>•</span>
            <span>{activity.date}</span>
            <span>•</span>
            <span className="italic">{activity.timeInvestment}</span>
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance">
            {activity.title}
          </h1>

          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activity.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Sections */}
          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">What we tried</h2>
              <p className="mt-2 leading-relaxed text-foreground">{activity.whatWeTried}</p>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">What happened</h2>
              <p className="mt-2 leading-relaxed text-foreground">{activity.whatHappened}</p>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Why it worked</h2>
              <p className="mt-2 leading-relaxed text-foreground">{activity.whyItWorked}</p>
            </section>

            <section className="rounded-lg bg-accent/5 p-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">The lesson</h2>
              <p className="mt-2 leading-relaxed text-foreground">{activity.theLesson}</p>
            </section>
          </div>

          {/* Link to full page for SEO */}
          <div className="mt-8 border-t border-border pt-6">
            <Link href={`/activity/${activity.id}`} className="text-sm text-accent hover:underline">
              View full page →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
