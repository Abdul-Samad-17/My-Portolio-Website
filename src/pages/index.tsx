import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import ScrollProgressBar from "@/components/layout/scroll-progress-bar";

export default function HomePage() {
  const sections = [
    { id: "about", title: "About Section" },
    { id: "experience", title: "Experience Section" },
    { id: "work", title: "Selected Work" },
    { id: "built-and-shipped", title: "Built & Shipped" },
    { id: "skills", title: "Technical Stack" },
    { id: "ai-twin", title: "AI Twin" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="min-h-screen bg-background text-foreground px-6 sm:px-14 md:px-20 py-10">
        <section id="home" className="min-h-[60vh] flex flex-col justify-center items-center text-center">
          <div className="rounded-2xl border border-border bg-surface-card p-8 shadow-lg max-w-xl">
            <h1 className="font-heading text-4xl font-bold">
              Abdul Samad <span className="text-accent">Portfolio</span>
            </h1>
            <p className="text-muted-foreground mt-3">
              Applied AI Engineer &bull; Generative AI &amp; Agentic Pipelines
            </p>
          </div>
        </section>

        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="min-h-[70vh] flex items-center justify-center border-t border-border/40 py-16"
          >
            <div className="text-center">
              <h2 className="font-heading text-3xl font-semibold text-foreground">
                {s.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Section #{s.id} (Scroll-spy target)
              </p>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
