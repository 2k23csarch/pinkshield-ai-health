import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Heart, MapPin, Quote, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SURVIVORS, type Survivor } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/survivor-stories")({
  head: () => ({ meta: [{ title: "Survivor Stories — PinkShield" }] }),
  component: SurvivorStories,
});

const STORAGE_KEY = "pinkshield_user_survivor_stories_v1";

type UserStory = Survivor & { submittedAt: number; userSubmitted: true };

function SurvivorStories() {
  const [userStories, setUserStories] = useState<UserStory[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUserStories(JSON.parse(raw));
    } catch {}
  }, []);

  const addStory = (s: UserStory) => {
    const next = [s, ...userStories];
    setUserStories(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    setOpen(false);
    setToast("Thank you 💕 Your story has been added to the wall of strength.");
    setTimeout(() => setToast(""), 4000);
  };

  const all: (Survivor & { userSubmitted?: boolean })[] = [
    ...userStories,
    ...SURVIVORS,
  ];

  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase text-primary bg-primary/10 mb-3">Stories of Strength</span>
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">Hope, in <span className="gradient-text">their own words</span></h1>
        <p className="text-muted-foreground mt-3 max-w-3xl text-lg">Real journeys from women who beat breast cancer — their fears, their fights, and the quiet, ordinary moments of joy that brought them back to life. Every story here is a reminder that early detection, community and courage can rewrite an outcome.</p>

        {/* Stat strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { v: `${all.length}+`, l: "Stories shared" },
            { v: "92%", l: "5-yr survival (early stage)" },
            { v: "24+", l: "Cities represented" },
            { v: "1.4M", l: "Women reached" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold gradient-text">{s.v}</p>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {all.map((s, i) => (
          <motion.article
            key={`${s.name}-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.06, 0.4) }}
            className="glass-strong rounded-3xl overflow-hidden hover-lift group"
          >
            <div className="relative h-56 overflow-hidden">
              {s.image ? (
                <img
                  src={s.image}
                  alt={`Portrait of breast cancer survivor ${s.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full gradient-primary grid place-items-center text-primary-foreground text-5xl font-bold">{s.name[0]}</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-foreground drop-shadow">{s.name}</h3>
                  <p className="text-xs text-foreground/80 flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" /> Age {s.age} · {s.years} yrs cancer-free
                  </p>
                </div>
                {s.userSubmitted && (
                  <span className="px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Your story
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {s.location && (
                  <span className="text-[11px] px-2 py-1 rounded-full bg-muted/50 flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />{s.location}
                  </span>
                )}
                {s.stage && (
                  <span className="text-[11px] px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">{s.stage}</span>
                )}
              </div>
              <Quote className="h-6 w-6 text-primary/40 mb-2" />
              <p className="font-medium italic leading-relaxed">"{s.quote}"</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.story}</p>
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <button className="flex items-center gap-1.5 hover:text-primary transition">
                  <Heart className="h-4 w-4" /> Send love
                </button>
                <span>Verified survivor</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 glass-strong rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full gradient-primary opacity-15 blur-3xl" />
        <h2 className="text-2xl font-bold">Have a story to share?</h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Your courage can guide someone newly diagnosed. Share your journey to inspire and uplift our community.</p>
        <button
          onClick={() => setOpen(true)}
          className="mt-5 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift inline-flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" /> Submit Your Story
        </button>
      </div>

      <AnimatePresence>
        {open && <SubmitStoryDialog onClose={() => setOpen(false)} onSubmit={addStory} />}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[70] glass-strong px-5 py-3 rounded-2xl shadow-glow border border-primary/30 text-sm font-medium"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubmitStoryDialog({ onClose, onSubmit }: { onClose: () => void; onSubmit: (s: UserStory) => void }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [years, setYears] = useState("");
  const [location, setLocation] = useState("");
  const [stage, setStage] = useState("");
  const [quote, setQuote] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState("");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 3 * 1024 * 1024) { setError("Image must be under 3MB."); return; }
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !story.trim() || !quote.trim()) {
      setError("Please fill in your name, a short quote, and your story.");
      return;
    }
    onSubmit({
      name: name.trim().slice(0, 60),
      age: Number(age) || 0,
      years: Number(years) || 0,
      location: location.trim().slice(0, 80) || undefined,
      stage: stage.trim().slice(0, 40) || undefined,
      quote: quote.trim().slice(0, 180),
      story: story.trim().slice(0, 1200),
      image,
      userSubmitted: true,
      submittedAt: Date.now(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center p-4 bg-background/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl glass-strong rounded-3xl shadow-glow border border-primary/20 max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 z-10 p-5 border-b border-border/60 flex items-center justify-between bg-background/80 backdrop-blur">
          <div>
            <h3 className="text-xl font-bold">Share Your Survivor Story</h3>
            <p className="text-xs text-muted-foreground">Your words can save and uplift another life.</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-muted/50"><X className="h-4 w-4" /></button>
        </div>

        <form onSubmit={submit} className="p-5 space-y-4">
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-dashed border-primary/40 grid place-items-center bg-primary/5 hover:bg-primary/10 transition">
                {image ? (
                  <img src={image} alt="Your portrait preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-primary font-semibold text-center px-1">Add photo</span>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={onFile} />
            </label>
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground">Optional portrait</p>
              <p>Square JPG/PNG, under 3MB. We'll display it on your story card.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Your name *" value={name} onChange={setName} placeholder="e.g. Priya Sharma" />
            <Field label="Location" value={location} onChange={setLocation} placeholder="City, State" />
            <Field label="Age" type="number" value={age} onChange={setAge} placeholder="e.g. 42" />
            <Field label="Years cancer-free" type="number" value={years} onChange={setYears} placeholder="e.g. 3" />
            <div className="col-span-2">
              <Field label="Diagnosis / stage" value={stage} onChange={setStage} placeholder="e.g. Stage 1 — IDC" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-muted-foreground">A short quote that captures your journey *</label>
            <input
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              maxLength={180}
              placeholder="One sentence others can hold onto…"
              className="w-full px-3 py-2.5 rounded-xl bg-input/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-muted-foreground">Your story *</label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              maxLength={1200}
              rows={6}
              placeholder="Your diagnosis, treatment, what helped you, what you'd tell a newly diagnosed reader…"
              className="w-full px-3 py-2.5 rounded-xl bg-input/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-[10px] text-muted-foreground mt-1 text-right">{story.length}/1200</p>
          </div>

          {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-muted/50">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-soft hover-lift text-sm inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Publish My Story
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5 text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl bg-input/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
