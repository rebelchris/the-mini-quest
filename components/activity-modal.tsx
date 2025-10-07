"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Heart, MessageCircle } from "lucide-react"
import type { Activity } from "@/app/page"

interface ActivityModalProps {
  activity: Activity | null
  onClose: () => void
  likes: number
  isLiked: boolean
  onLike: () => void
}

const mockComments = [
  {
    id: 1,
    author: "Sarah M.",
    avatar: "👩",
    text: "This is brilliant! We tried something similar and it worked wonders. Thanks for sharing!",
    time: "2 days ago",
  },
  {
    id: 2,
    author: "Mike R.",
    avatar: "👨",
    text: "Love the reframing approach. Going to try this with my 3-year-old tonight.",
    time: "3 days ago",
  },
  {
    id: 3,
    author: "Emma L.",
    avatar: "👩‍🦰",
    text: "The lesson at the end really resonates. Sometimes it's all about perspective!",
    time: "5 days ago",
  },
]

export function ActivityModal({ activity, onClose, likes, isLiked, onLike }: ActivityModalProps) {
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
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gradient-to-br from-accent/20 via-background/40 to-accent/10 p-4 backdrop-blur-xl lg:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-2xl rounded-2xl border border-border/50 bg-card shadow-2xl lg:my-0"
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

        <div className="max-h-[85vh] overflow-y-auto">
          {/* Image - optional */}
          {activity.image && (
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{activity.age}</span>
              <span>•</span>
              <span>{activity.date}</span>
              <span>•</span>
              <span className="italic">{activity.timeInvestment}</span>
            </div>

            <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
              {activity.title}
            </h1>

            {/* Tags */}
            {activity.tags && activity.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {activity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gradient-to-r from-accent/10 to-accent/5 px-3 py-1 text-sm font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={onLike}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isLiked
                    ? "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 dark:text-red-400"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{likes}</span>
              </button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>{mockComments.length} comments</span>
              </div>
            </div>

            {/* Sections */}
            <div className="mt-6 space-y-5">
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">What we tried</h2>
                <p className="mt-2 leading-relaxed text-foreground">{activity.whatWeTried}</p>
              </section>

              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">What happened</h2>
                <p className="mt-2 leading-relaxed text-foreground">{activity.whatHappened}</p>
              </section>

              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">Why it worked</h2>
                <p className="mt-2 leading-relaxed text-foreground">{activity.whyItWorked}</p>
              </section>

              <section className="rounded-lg bg-gradient-to-r from-accent/5 to-accent/10 p-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">The lesson</h2>
                <p className="mt-2 leading-relaxed text-foreground">{activity.theLesson}</p>
              </section>
            </div>

            <div className="mt-8 border-t border-border/50 pt-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <MessageCircle className="h-4 w-4" />
                Comments ({mockComments.length})
              </h3>
              <div className="space-y-4">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/10 text-sm">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/90">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link to full page for SEO */}
            <div className="mt-6 border-t border-border/50 pt-4">
              <Link href={`/activity/${activity.id}`} className="text-sm text-accent hover:underline">
                View full page →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
