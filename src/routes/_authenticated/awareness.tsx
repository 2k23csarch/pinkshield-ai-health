import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { CAMPAIGNS } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/awareness")({
  head: () => ({ meta: [{ title: "Awareness Campaigns — PinkShield" }] }),
  component: Awareness,
});

function Awareness() {
  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase text-primary bg-primary/10 mb-3">Awareness Campaigns</span>
        <h1 className="text-3xl sm:text-4xl font-bold">Join the <span className="gradient-text">pink revolution</span></h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Awareness is the most powerful medicine. Browse upcoming events, screening camps and workshops happening across India.</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[["100M+", "Lives Reached"], ["1.4M", "Free Screenings"], ["240+", "Cities Served"]].map(([n, l]) => (
          <div key={l} className="glass-strong rounded-2xl p-5 text-center">
            <p className="text-3xl font-bold gradient-text">{n}</p><p className="text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {CAMPAIGNS.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-strong rounded-3xl overflow-hidden hover-lift">
            <div className="h-44 bg-cover bg-center relative" style={{ backgroundImage: `url(${c.image})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">Featured</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{c.title}</h3>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-primary" /> {c.date}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-primary" /> {c.location}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{c.description}</p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-soft hover-lift">Register</button>
                <button className="px-4 py-2 rounded-xl border border-border text-sm font-medium">Share</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
