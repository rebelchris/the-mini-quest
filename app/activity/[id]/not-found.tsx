import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-semibold text-foreground">Activity not found</h1>
      <p className="mt-4 text-muted-foreground">The activity you're looking for doesn't exist.</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
      >
        Back to home
      </Link>
    </div>
  )
}
