"use client"

import { useState, useMemo } from "react"
import { TimelineCard } from "@/components/timeline-card"
import { ActivityModal } from "@/components/activity-modal"

export interface Activity {
  id: string
  title: string
  age: string
  date: string
  timeInvestment: string
  whatWeTried: string
  whatHappened: string
  whyItWorked: string
  theLesson: string
  image: string
  tags?: string[]
  type: "activity" | "learning" | "skill"
  ageMonths: number // for filtering
  timestamp: Date
}

const activities: Activity[] = [
  {
    id: "let-them-lead",
    title: "Let Them Lead",
    age: "2.5 years",
    date: "October 2025",
    timeInvestment: "None - just a reframe",
    whatWeTried:
      'Instead of asking Quinn to get dressed for bedtime (which sometimes turned into debates), we changed the frame: "Show us how you can do it yourself!"',
    whatHappened:
      "The shift was immediate. He lights up with pride showing us he can do it. What used to be occasional resistance became a routine he actually looks forward to. He's in control, we're the audience cheering him on.",
    whyItWorked:
      "Turns out the resistance wasn't about getting dressed - it was about being told what to do. When he became the one showing off his skills instead of following instructions, the whole dynamic flipped.",
    theLesson: "Sometimes the activity isn't the problem - the framing is.",
    image: "/let-them-lead.jpg",
    tags: ["behavior", "independence"],
    type: "learning",
    ageMonths: 30,
    timestamp: new Date("2025-10-15"),
  },
  {
    id: "cardboard-city",
    title: "Building a Cardboard City",
    age: "3 years",
    date: "March 2024",
    timeInvestment: "2 hours (spread across an afternoon)",
    whatWeTried:
      "Saved up delivery boxes for a week and spent an afternoon turning them into buildings. We had tape, markers, and zero architectural plans.",
    whatHappened:
      "The tape situation got completely out of hand. We went through two rolls. But watching him design windows, doors, and a 'parking garage' was worth every sticky moment. The city stood in our living room for three days.",
    whyItWorked:
      "Open-ended building projects let kids be the architects. No instructions meant no wrong answers. Plus, the boxes were free and guilt-free to destroy.",
    theLesson: "The best toys are often the ones that came with something else inside.",
    image: "/cardboard-boxes-city-buildings-child-playing.jpg",
    tags: ["creative", "building"],
    type: "activity",
    ageMonths: 36,
    timestamp: new Date("2024-03-20"),
  },
  {
    id: "backyard-bug-hunt",
    title: "The Great Backyard Bug Hunt",
    age: "2.8 years",
    date: "March 2024",
    timeInvestment: "45 minutes",
    whatWeTried:
      "Armed with a magnifying glass from the dollar store and a notebook, we set out to discover what lives in our backyard.",
    whatHappened:
      "We found more residents than expected. Mostly ants. So many ants. But also a beetle, some pill bugs, and one very startled spider. He insisted on drawing each discovery.",
    whyItWorked:
      "Kids are natural scientists - they just need permission to look closely. The magnifying glass made everything feel official and important.",
    theLesson: "You don't need to go anywhere special. Your backyard is already full of tiny adventures.",
    image: "/child-with-magnifying-glass-looking-at-bugs-in-gra.jpg",
    tags: ["nature", "science"],
    type: "activity",
    ageMonths: 34,
    timestamp: new Date("2024-03-15"),
  },
  {
    id: "baking-soda-volcano",
    title: "Kitchen Science: Baking Soda Volcano",
    age: "3.2 years",
    date: "March 2024",
    timeInvestment: "30 minutes (plus cleanup)",
    whatWeTried:
      "The classic experiment. Built a volcano from playdough, added baking soda, then vinegar with food coloring for the eruption.",
    whatHappened:
      "Three eruptions later, we learned about chemical reactions. The kitchen learned about vinegar stains. He wanted to do it 'one more time' approximately seven times.",
    whyItWorked:
      "It's dramatic, it's safe, and it's repeatable. The cause-and-effect is immediate and satisfying. Plus, you probably have everything you need already.",
    theLesson: "Sometimes the classics are classics for a reason.",
    image: "/baking-soda-volcano-experiment-colorful-foam.jpg",
    tags: ["science", "messy"],
    type: "activity",
    ageMonths: 38,
    timestamp: new Date("2024-03-10"),
  },
  {
    id: "ice-cube-painting",
    title: "Painting with Ice Cubes",
    age: "2.6 years",
    date: "February 2024",
    timeInvestment: "20 minutes (plus freezing time)",
    whatWeTried:
      "Froze washable paint in ice cube trays with popsicle sticks. Once frozen, used them like crayons on paper.",
    whatHappened:
      "The melting was messy. The art was abstract. The sensory experience was fascinating. He loved watching the colors blend as the ice melted.",
    whyItWorked:
      "It combines painting with a totally different texture and temperature. The melting ice adds an element of time and change that regular painting doesn't have.",
    theLesson: "Art doesn't have to be about the final product. Sometimes it's about the weird, wonderful process.",
    image: "/colorful-ice-cube-painting-on-paper-art-project.jpg",
    tags: ["art", "sensory"],
    type: "activity",
    ageMonths: 31,
    timestamp: new Date("2024-02-20"),
  },
  {
    id: "shadow-tracing",
    title: "Shadow Tracing Adventures",
    age: "3.1 years",
    date: "January 2024",
    timeInvestment: "30 minutes",
    whatWeTried:
      "On a sunny morning, we taped large paper to the floor and traced shadows of toys, hands, and anything else we could find.",
    whatHappened:
      "He was amazed that shadows could be 'caught' on paper. We traced his favorite dinosaur in different positions, creating a shadow story.",
    whyItWorked:
      "It's magic that's also science. Shadows are free, endlessly variable, and introduce concepts like light, position, and shape in a hands-on way.",
    theLesson: "The best learning tools are often free and all around us.",
    image: "/shadow-tracing.jpg",
    tags: ["science", "art"],
    type: "skill",
    ageMonths: 37,
    timestamp: new Date("2024-01-15"),
  },
]

export default function Home() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedAge, setSelectedAge] = useState<string | null>(null)

  // Get unique years from activities
  const years = useMemo(() => {
    const yearSet = new Set(activities.map((a) => new Date(a.timestamp).getFullYear()))
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [])

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activities
      .filter((activity) => {
        if (selectedYear && new Date(activity.timestamp).getFullYear() !== Number.parseInt(selectedYear)) {
          return false
        }
        if (selectedType && activity.type !== selectedType) {
          return false
        }
        if (selectedAge) {
          const [min, max] = selectedAge.split("-").map(Number)
          if (activity.ageMonths < min || activity.ageMonths > max) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }, [selectedYear, selectedType, selectedAge])

  // Count by type
  const typeCounts = useMemo(() => {
    const counts = { all: activities.length, activity: 0, learning: 0, skill: 0 }
    activities.forEach((a) => {
      counts[a.type]++
    })
    return counts
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Filters */}
      <aside className="sticky top-0 h-screen w-48 flex-shrink-0 border-r border-border bg-sidebar p-6">
        {/* Time Filters */}
        <div className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time</h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedYear(null)}
              className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                selectedYear === null
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              All time
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year.toString())}
                className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                  selectedYear === year.toString()
                    ? "bg-accent/10 font-medium text-accent"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Age Filters */}
        <div className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Age</h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedAge(null)}
              className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                selectedAge === null
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              All ages
            </button>
            <button
              onClick={() => setSelectedAge("24-30")}
              className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                selectedAge === "24-30"
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              2-2.5 years
            </button>
            <button
              onClick={() => setSelectedAge("30-36")}
              className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                selectedAge === "30-36"
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              2.5-3 years
            </button>
            <button
              onClick={() => setSelectedAge("36-48")}
              className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                selectedAge === "36-48"
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              3-4 years
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Type Filter Bar */}
        <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex gap-2 px-8 py-4">
            <button
              onClick={() => setSelectedType(null)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedType === null ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span>all</span>
              <span className="text-xs opacity-60">{typeCounts.all}</span>
            </button>
            <button
              onClick={() => setSelectedType("activity")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedType === "activity"
                  ? "bg-accent/10 text-accent"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span>activity</span>
              <span className="text-xs opacity-60">{typeCounts.activity}</span>
            </button>
            <button
              onClick={() => setSelectedType("learning")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedType === "learning"
                  ? "bg-accent/10 text-accent"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span>learning</span>
              <span className="text-xs opacity-60">{typeCounts.learning}</span>
            </button>
            <button
              onClick={() => setSelectedType("skill")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedType === "skill"
                  ? "bg-accent/10 text-accent"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span>skill</span>
              <span className="text-xs opacity-60">{typeCounts.skill}</span>
            </button>
          </div>
        </div>

        {/* Timeline Feed */}
        <main className="flex-1 px-8 py-8">
          <div className="mx-auto max-w-2xl space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">The Mini Quest</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {filteredActivities.length} {filteredActivities.length === 1 ? "post" : "posts"}
              </p>
            </div>

            {/* Activity Cards */}
            {filteredActivities.map((activity) => (
              <TimelineCard key={activity.id} activity={activity} onClick={() => setSelectedActivity(activity)} />
            ))}

            {filteredActivities.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground">No activities found with the selected filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      <ActivityModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
    </div>
  )
}
