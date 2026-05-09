import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Apple, Leaf, Coffee, Fish } from "lucide-react";

export const Route = createFileRoute("/_authenticated/diet")({
  head: () => ({ meta: [{ title: "Diet & Nutrition — PinkShield" }] }),
  component: Diet,
});

const PLANS = [
  { title: "Mediterranean Anti-Inflammatory", icon: Leaf, desc: "Olive oil, leafy greens, whole grains, fatty fish twice a week, nuts, beans and a glass of red wine occasionally. Linked to a 15% lower breast cancer risk in long-term cohort studies.", foods: ["Olive oil", "Spinach, kale", "Salmon, sardines", "Walnuts, almonds", "Lentils, chickpeas"] },
  { title: "Plant-Forward Recovery", icon: Apple, desc: "60-70% plant-based meals rich in cruciferous vegetables, berries, turmeric and green tea. Supports estrogen metabolism and reduces oxidative stress during and after treatment.", foods: ["Broccoli, cauliflower", "Berries, pomegranate", "Turmeric (with black pepper)", "Green tea", "Flax seeds"] },
  { title: "Chemo-Friendly Comfort", icon: Coffee, desc: "Bland, easy-to-digest meals for nausea management — ginger tea, plain rice, bananas, applesauce, oats. Small frequent meals keep energy stable.", foods: ["Ginger tea", "Plain oatmeal", "Banana, applesauce", "Boiled potatoes", "Yogurt, kefir"] },
  { title: "High-Protein Survivor Plan", icon: Fish, desc: "1.2-1.5g protein per kg body weight to rebuild muscle post-treatment. Lean meats, eggs, dairy, legumes and quinoa. Supports immune recovery and energy.", foods: ["Eggs, paneer", "Chicken, fish", "Tofu, tempeh", "Greek yogurt", "Quinoa, dal"] },
];

const AVOID = [
  "Processed meats (bacon, sausage, deli) — strong link to higher cancer risk",
  "Excess alcohol — even one drink/day raises risk by ~7-10%",
  "Sugary beverages and ultra-processed snacks",
  "Charred or deep-fried foods (acrylamide, HCAs)",
  "High-mercury fish during treatment (king mackerel, swordfish)",
];

function Diet() {
  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase text-primary bg-primary/10 mb-3">Nutrition</span>
        <h1 className="text-3xl sm:text-4xl font-bold">Diet & <span className="gradient-text">Nutrition Guide</span></h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-lg">What you eat shapes your risk, your recovery and your day-to-day energy. These plans were curated by oncology nutritionists at top Indian hospitals.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {PLANS.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-strong rounded-3xl p-6 hover-lift">
            <div className="h-12 w-12 rounded-2xl gradient-primary grid place-items-center text-primary-foreground"><p.icon className="h-5 w-5" /></div>
            <h3 className="text-xl font-bold mt-3">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
            <div className="mt-4">
              <p className="text-xs font-semibold text-primary uppercase mb-2">Featured foods</p>
              <div className="flex flex-wrap gap-2">{p.foods.map((f) => <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{f}</span>)}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 glass-strong rounded-3xl p-6 border-2 border-destructive/20">
        <h3 className="text-xl font-bold text-destructive">Foods to limit or avoid</h3>
        <ul className="mt-3 space-y-2">
          {AVOID.map((a) => <li key={a} className="flex gap-2 text-sm"><span className="text-destructive">×</span>{a}</li>)}
        </ul>
      </div>
    </div>
  );
}
