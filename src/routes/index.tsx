import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, HeartPulse, Sparkles, ArrowRight, Stethoscope, Brain, Globe2 } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Section, SectionHeader } from "@/components/Section";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PinkShield – Early Detection Saves Lives" },
      { name: "description", content: "AI-powered breast cancer awareness, early detection, prevention guidance and survivor community." },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Brain, title: "AI-Powered Detection", desc: "Deep-learning models trained on millions of mammographic patterns to flag suspicious tissue at the earliest stage." },
  { icon: ShieldCheck, title: "Privacy First", desc: "End-to-end encrypted scans. Your medical images never leave secure clinical-grade infrastructure." },
  { icon: HeartPulse, title: "24/7 Support", desc: "Connect with certified oncology nurses, survivors and counsellors anytime, anywhere in the world." },
  { icon: Globe2, title: "Global Awareness", desc: "Localized awareness campaigns running across 42 countries in 18 languages with over 2M lives reached." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" /> Trusted by 200+ hospitals worldwide
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              Early Detection <br />
              <span className="gradient-text">Saves Lives.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
              PinkShield combines clinical-grade AI with human compassion to help you understand, screen for, and overcome breast cancer. Knowledge today is survival tomorrow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/ai-detection" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift">
                Try AI Scan <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about-cancer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-strong font-semibold hover-lift">
                Learn More
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
              {[
                { v: 2_400_000, s: "+", l: "Lives reached" },
                { v: 98, s: "%", l: "AI accuracy" },
                { v: 42, s: "", l: "Countries" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold gradient-text"><Counter to={s.v} suffix={s.s} /></div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="absolute inset-0 gradient-primary rounded-[2.5rem] blur-3xl opacity-30" />
            <div className="relative glass-strong rounded-[2rem] p-3 shadow-glow" style={{ animation: "float 7s ease-in-out infinite" }}>
              <img src={hero} alt="AI healthcare visualization" className="rounded-[1.5rem] w-full h-auto" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4 shadow-soft hidden sm:flex items-center gap-3" style={{ animation: "float 5s ease-in-out infinite" }}>
              <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center"><Activity className="h-5 w-5 text-primary-foreground" /></div>
              <div>
                <div className="text-xs text-muted-foreground">Live scans today</div>
                <div className="font-bold"><Counter to={1842} /></div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 glass-strong rounded-2xl p-4 shadow-soft hidden sm:flex items-center gap-3" style={{ animation: "float 6s ease-in-out infinite reverse" }}>
              <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center"><Stethoscope className="h-5 w-5 text-primary-foreground" /></div>
              <div>
                <div className="text-xs text-muted-foreground">Specialists online</div>
                <div className="font-bold">312</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <Section>
        <SectionHeader eyebrow="Why PinkShield" title="A complete awareness ecosystem" description="Everything you need to learn, screen and act — designed by oncologists, engineered with empathy." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover-lift"
            >
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-soft">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* MISSION CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-16">
          <div className="absolute inset-0 gradient-hero opacity-50" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">Our mission is simple — <span className="gradient-text">no woman left behind.</span></h3>
              <p className="text-muted-foreground leading-relaxed">
                Every 14 seconds, a woman is diagnosed with breast cancer somewhere in the world. PinkShield exists to make sure that diagnosis comes early enough to save her life. Through accessible AI screening, evidence-based education and a global support network, we are rewriting the survival story — one woman at a time.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link to="/signup" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift">
                Join the Movement <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
