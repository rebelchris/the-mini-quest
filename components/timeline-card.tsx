"use client"

import type React from "react"

import Image from "next/image"
import { Heart } from "lucide-react"
import { useEffect, useRef } from "react"
import type { Activity } from "@/app/page"

interface TimelineCardProps {
  activity: Activity
  onClick: () => void
  onLike: () => void
  likes: number
  isLiked: boolean
  observerRef: React.MutableRefObject<IntersectionObserver | null>
  index: number
}

export function TimelineCard({ activity, onClick, onLike, likes, isLiked, observerRef, index }: TimelineCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const currentCard = cardRef.current
    if (currentCard && observerRef.current) {
      observerRef.current.observe(currentCard)
    }
    return () => {
      if (currentCard && observerRef.current) {
        observerRef.current.unobserve(currentCard)
      }
    }
  }, [observerRef])

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

  const hasImage = activity.image && Math.random() > 0.3 // 70% chance to show image
  const isCompact = activity.whatWeTried.length < 150 // Short posts are more compact

  return (
    <article
      ref={cardRef}
      className="group cursor-pointer rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:border-accent/30 hover:shadow-md lg:p-5"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/70 text-sm">
            👨‍👦
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-medium text-foreground">Quinn's Dad</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{activity.age}</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{getRelativeTime(activity.timestamp)}</span>
      </div>

      <div onClick={onClick}>
        <h2
          className={`font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent ${
            isCompact ? "mb-2 text-base" : "mb-2 text-lg"
          }`}
        >
          {activity.title}
        </h2>
        <p className={`leading-relaxed text-foreground/90 ${isCompact ? "text-sm" : "text-sm"}`}>
          {activity.whatWeTried}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              activity.type === "activity"
                ? "bg-gradient-to-r from-blue-500/10 to-blue-400/10 text-blue-600 dark:text-blue-400"
                : activity.type === "learning"
                  ? "bg-gradient-to-r from-green-500/10 to-green-400/10 text-green-600 dark:text-green-400"
                  : "bg-gradient-to-r from-purple-500/10 to-purple-400/10 text-purple-600 dark:text-purple-400"
            }`}
          >
            {activity.type}
          </span>
          {activity.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        {hasImage && activity.image && (
          <div className="mt-3 overflow-hidden rounded-lg border border-border/50">
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
      </div>

      <div className="mt-3 flex items-center gap-3 border-t border-border/30 pt-3">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onLike()
          }}
          className={`group/like flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all ${
            isLiked
              ? "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 dark:text-red-400"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-all ${
              isLiked ? "fill-current animate-in zoom-in-50" : "group-hover/like:scale-110"
            }`}
          />
          <span className="font-medium">{likes}</span>
        </button>
        <span className="text-xs text-muted-foreground">Click to read more</span>
      </div>
    </article>
  )
}
