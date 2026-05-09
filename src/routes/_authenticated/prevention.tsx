import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Apple, Leaf, Coffee, Beef, Cigarette, Wine, Cookie, Dumbbell, Brain, Calendar, Users, CheckCircle2, XCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";

export const Route = createFileRoute("/_authenticated/prevention")({
  head: () => ({
    meta: [
      { title: "Prevention, Diet & Lifestyle — PinkShield" },
      { name: "description", content: "Evidence-based prevention strategies, healthy diet, foods to eat and avoid, and lifestyle changes that lower breast cancer risk." },
    ],
  }),
  component: Prevention,
});

const lifestyle = [
  { icon: Dumbbell, title: "Regular Exercise", desc: "Just 150 minutes of moderate physical activity per week reduces breast cancer risk by up to 25% by lowering estrogen, insulin and inflammatory markers." },
  { icon: Brain, title: "Stress Management", desc: "Chronic stress elevates cortisol, suppresses immune surveillance and promotes inflammation. Mindfulness, yoga and quality sleep are clinically proven protectors." },
  { icon: Calendar, title: "Routine Screening", desc: "Annual clinical breast exams from age 40 and biennial mammography catch tumors years before they become palpable, dramatically improving outcomes." },
  { icon: Users, title: "Awareness Programs", desc: "Community education multiplies early-detection rates. PinkShield partners with NGOs to run free workshops in 42 countries." },
];

const goodFoods = [
  { name: "Berries & Citrus", desc: "Rich in flavonoids, vitamin C and ellagic acid that neutralize free radicals." },
  { name: "Cruciferous Vegetables", desc: "Broccoli, cauliflower and kale contain sulforaphane, a powerful estrogen-modulating compound." },
  { name: "Green Tea", desc: "EGCG polyphenols inhibit tumor growth signaling pathways in laboratory studies." },
  { name: "Fatty Fish & Omega-3", desc: "Salmon, sardines and walnuts reduce systemic inflammation and support cell membrane health." },
  { name: "Whole Grains & Legumes", desc: "Fiber binds excess estrogen for elimination and stabilizes insulin levels." },
  { name: "Turmeric & Garlic", desc: "Curcumin and allyl sulfides display promising anti-cancer activity in preclinical research." },
];

const badFoods = [
  { name: "Tobacco & Smoking", desc: "Carcinogens accumulate in breast tissue; smokers face 24% higher risk of breast cancer." },
  { name: "Alcohol", desc: "Each daily drink raises risk by 7–10%. Even moderate consumption matters." },
  { name: "Ultra-processed Foods", desc: "Trans fats, additives and refined oils drive chronic inflammation linked to tumor progression." },
  { name: "Excess Sugar & Refined Carbs", desc: "Spike insulin and IGF-1, hormones that fuel certain breast cancer cell growth." },
  { name: "Charred Red Meat", desc: "Heterocyclic amines formed during high-heat cooking are established carcinogens." },
];

function Prevention() {
  return (
    <>
      <Section>
        <SectionHeader eyebrow="Prevention" title="Lifestyle & Awareness" description="Up to 30% of breast cancers are preventable through lifestyle change. Small daily decisions compound into a powerful shield." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifestyle.map((l, i) => (
            <motion.div key={l.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass rounded-2xl p-6 hover-lift">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-soft">
                <l.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h4 className="font-semibold mb-2">{l.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Diet" title="Foods to Eat & Foods to Avoid" description="What lands on your plate every day quietly programs your hormonal and inflammatory environment for years." />

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-strong rounded-3xl p-7">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 className="h-6 w-6 text-success" />
              <h3 className="text-2xl font-bold">Foods to Embrace</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Build every meal around colorful plants, healthy fats and minimally processed proteins. A predominantly Mediterranean dietary pattern is associated with a 15–28% reduction in breast cancer incidence across multiple long-term cohort studies.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {goodFoods.map((f, i) => (
                <motion.div key={f.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-4 rounded-xl bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-1"><Leaf className="h-4 w-4 text-success" /><span className="font-semibold text-sm">{f.name}</span></div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-7">
            <div className="flex items-center gap-2 mb-5">
              <XCircle className="h-6 w-6 text-destructive" />
              <h3 className="text-2xl font-bold">Foods & Habits to Avoid</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              No single food causes cancer, but persistent exposure to certain substances measurably tilts your biology toward disease. Reducing or eliminating these is one of the most cost-effective interventions you can make.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {badFoods.map((f, i) => {
                const icons = [Cigarette, Wine, Cookie, Apple, Beef, Coffee];
                const Icon = icons[i % icons.length];
                return (
                  <motion.div key={f.name} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-2 mb-1"><Icon className="h-4 w-4 text-destructive" /><span className="font-semibold text-sm">{f.name}</span></div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="glass-strong rounded-3xl p-10">
          <h3 className="text-3xl font-bold mb-4 gradient-text">The Compound Effect of Daily Choices</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Public-health modelling consistently shows that women who maintain a healthy weight, exercise regularly, eat a plant-forward diet, limit alcohol and never smoke can lower their lifetime breast cancer risk by nearly one third — even in the presence of strong family history. These are not exotic interventions; they are the same habits that protect against heart disease, diabetes and cognitive decline.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Combining these everyday protective behaviours with regular self-examination and AI-assisted screening creates a multi-layered defence. PinkShield's mobile companion gently nudges you toward small, sustainable improvements every day — because prevention is not a single act but a thousand quiet ones.
          </p>
        </div>
      </Section>
    </>
  );
}
