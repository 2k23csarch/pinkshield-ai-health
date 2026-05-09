import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SURVIVORS } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/survivor-stories")({
  head: () => ({ meta: [{ title: "Survivor Stories — PinkShield" }] }),
  component: SurvivorStories,
});

function SurvivorStories() {
  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase text-primary bg-primary/10 mb-3">Stories of Strength</span>
        <h1 className="text-3xl sm:text-5xl font-bold">Hope, in <span className="gradient-text">their own words</span></h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-lg">Real journeys from women who beat breast cancer — their fears, their fights, and the quiet, ordinary moments of joy that brought them back to life.</p>
      </motion.div>

      <div className="space-y-8">
        {SURVIVORS.map((s, i) => (
          <motion.article key={s.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-strong rounded-3xl p-8 grid md:grid-cols-3 gap-6 hover-lift">
            <div className="md:col-span-1 text-center md:text-left">
              <div className="inline-block h-24 w-24 rounded-full gradient-primary grid place-items-center text-primary-foreground text-3xl font-bold mb-3">{s.name[0]}</div>
              <h3 className="text-xl font-bold">{s.name}</h3>
              <p className="text-sm text-muted-foreground">Age {s.age} · {s.years} years cancer-free</p>
            </div>
            <div className="md:col-span-2">
              <Quote className="h-8 w-8 text-primary/40 mb-2" />
              <p className="text-lg font-medium italic leading-relaxed">"{s.quote}"</p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{s.story}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 glass-strong rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full gradient-primary opacity-15 blur-3xl" />
        <h2 className="text-2xl font-bold">Have a story to share?</h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Your courage can guide someone newly diagnosed. Share your journey to inspire and uplift our community.</p>
        <button className="mt-5 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift">Submit Your Story</button>
      </div>
    </div>
  );
}
