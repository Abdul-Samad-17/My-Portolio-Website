export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-lg">
        <h1 className="font-heading text-3xl font-bold">
          Abdul Samad <span className="text-accent">Portfolio</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Design system tokens active.
        </p>
      </div>
    </main>
  );
}
