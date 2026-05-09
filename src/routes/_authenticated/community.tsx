import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, MessageCircle, TrendingUp, Award } from "lucide-react";
import { THREADS } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/community")({
  head: () => ({ meta: [{ title: "Community — PinkShield" }] }),
  component: Community,
});

function Community() {
  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase text-primary bg-primary/10 mb-3">Community Forum</span>
        <h1 className="text-3xl sm:text-4xl font-bold">A safe space to <span className="gradient-text">share & support</span></h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Connect with survivors, caregivers and medical experts. Share your story, ask questions, find your tribe.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {THREADS.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-strong rounded-2xl p-5 hover-lift">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">{t.tag}</span>
                <span className="text-xs text-muted-foreground">by {t.author}</span>
              </div>
              <h3 className="font-bold text-lg mt-1">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-primary" /> {t.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3 text-primary" /> {t.comments}</span>
                <button className="ml-auto text-primary font-medium hover:underline">Read more →</button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="glass-strong rounded-2xl p-5">
            <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Trending Topics</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {["#earlydetection", "#survivorlife", "#chemo-tips", "#nutrition", "#mentalhealth", "#caregivers", "#TNBC", "#pinkOctober"].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 cursor-pointer">{t}</span>
              ))}
            </div>
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <h3 className="font-semibold flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Top Contributors</h3>
            <ul className="mt-3 space-y-3">
              {[["Dr. Iyer", "1.2k pts"], ["Anita R.", "980 pts"], ["Sameer K.", "742 pts"], ["Reena J.", "611 pts"]].map(([n, p]) => (
                <li key={n} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full gradient-primary grid place-items-center text-primary-foreground text-xs font-bold">{n[0]}</div>
                  <div className="flex-1"><p className="text-sm font-medium">{n}</p><p className="text-xs text-muted-foreground">{p}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-strong rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full gradient-primary opacity-15 blur-2xl" />
            <h3 className="font-semibold">Support Groups</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {["Newly diagnosed", "In treatment", "Survivors circle", "Caregivers", "Young adults (18-35)"].map((g) => (
                <li key={g} className="flex justify-between items-center"><span>{g}</span><button className="text-xs text-primary hover:underline">Join</button></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
