import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Activity } from "@/app/page"

// This would typically come from a database or CMS
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
  },
]

export async function generateStaticParams() {
  return activities.map((activity) => ({
    id: activity.id,
  }))
}

export default function ActivityPage({ params }: { params: { id: string } }) {
  const activity = activities.find((a) => a.id === params.id)

  if (!activity) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="mx-auto max-w-4xl px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all activities
        </Link>
      </div>

      {/* Image */}
      <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl bg-muted px-6">
        <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
      </div>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">{activity.age}</span>
          <span>•</span>
          <span>{activity.date}</span>
          <span>•</span>
          <span className="italic">{activity.timeInvestment}</span>
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl text-balance">
          {activity.title}
        </h1>

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {activity.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Sections */}
        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">What we tried</h2>
            <p className="mt-3 text-lg leading-relaxed text-foreground">{activity.whatWeTried}</p>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">What happened</h2>
            <p className="mt-3 text-lg leading-relaxed text-foreground">{activity.whatHappened}</p>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Why it worked</h2>
            <p className="mt-3 text-lg leading-relaxed text-foreground">{activity.whyItWorked}</p>
          </section>

          <section className="rounded-xl bg-accent/5 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">The lesson</h2>
            <p className="mt-3 text-lg leading-relaxed text-foreground">{activity.theLesson}</p>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">About</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground text-pretty">
            A dad documenting activities tried with his kid. Sometimes they work, sometimes they don't. Always learning.
          </p>
        </div>
      </footer>
    </div>
  )
}
