"use client"

import Image from "next/image"
import type { Activity } from "@/app/page"

interface TimelineCardProps {
  activity: Activity
  onClick: () => void
}

export function TimelineCard({ activity, onClick }: TimelineCardProps) {
  // Calculate relative time
  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "today"
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-md"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-lg">👨‍👦</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Quinn's Dad</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{activity.age}</span>
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  activity.type === "activity"
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : activity.type === "learning"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                }`}
              >
                {activity.type}
              </span>
              {activity.tags?.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{getRelativeTime(activity.timestamp)}</span>
      </div>

      {/* Content */}
      <div>
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
          {activity.title}
        </h2>
        <p className="text-sm leading-relaxed text-foreground">{activity.whatWeTried}</p>
      </div>

      {/* Image */}
      {activity.image && (
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <div className="relative aspect-video bg-muted">
            <Image
              src={activity.image || "/placeholder.svg"}
              alt={activity.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      )}

      {/* Footer hint */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Click to read more</span>
        <span>→</span>
      </div>
    </article>
  )
}
