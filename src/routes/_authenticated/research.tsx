import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FlaskConical, Cpu, Microscope, Database } from "lucide-react";

export const Route = createFileRoute("/_authenticated/research")({
  head: () => ({ meta: [{ title: "Research & Innovation — PinkShield" }] }),
  component: Research,
});

const PAPERS = [
  { title: "Deep Learning for Mammography Triage in Low-Resource Settings", authors: "Iyer, Mehta et al.", year: 2025, journal: "The Lancet Digital Health", abstract: "A multi-center study evaluating a CNN-based triage model across 12 Indian hospitals, demonstrating 94% sensitivity and a 38% reduction in radiologist workload. Particularly effective for dense-tissue cases that historically pose detection challenges." },
  { title: "Liquid Biopsy and Circulating Tumor DNA in Early Breast Cancer", authors: "Kapoor, Singh et al.", year: 2024, journal: "Nature Medicine", abstract: "Investigation of ctDNA detection thresholds in Stage 0-I breast cancer. Demonstrates clinical utility of liquid biopsies as a non-invasive monitoring tool for recurrence risk stratification." },
  { title: "AI-Assisted Risk Stratification Using Polygenic Scores + Imaging", authors: "Banerjee, Verma et al.", year: 2025, journal: "JAMA Oncology", abstract: "Combining BRCA1/2 polygenic risk scores with mammographic density features improves 10-year risk prediction AUC from 0.68 to 0.83. Suggests a path toward truly personalized screening intervals." },
  { title: "Immunotherapy Outcomes in Triple-Negative Breast Cancer", authors: "Reddy, Joshi et al.", year: 2024, journal: "Cell", abstract: "Phase III trial results for pembrolizumab combined with chemotherapy in TNBC. Significant improvement in pathologic complete response rates, especially in PD-L1 positive subgroups." },
];

function Research() {
  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase text-primary bg-primary/10 mb-3">Research</span>
        <h1 className="text-3xl sm:text-4xl font-bold">AI Research & <span className="gradient-text">Medical Innovation</span></h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-lg">PinkShield collaborates with leading institutions to advance early detection. Explore landmark papers, ongoing trials and the latest breakthroughs.</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: FlaskConical, n: "47", l: "Active trials" },
          { icon: Microscope, n: "12", l: "Hospital partners" },
          { icon: Cpu, n: "94%", l: "Model sensitivity" },
          { icon: Database, n: "2.4M", l: "Annotated scans" },
        ].map((s) => (
          <div key={s.l} className="glass-strong rounded-2xl p-5 text-center">
            <s.icon className="h-6 w-6 text-primary mx-auto" />
            <p className="text-3xl font-bold gradient-text mt-2">{s.n}</p><p className="text-xs text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Featured Publications</h2>
      <div className="space-y-4">
        {PAPERS.map((p, i) => (
          <motion.article key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-strong rounded-2xl p-6 hover-lift">
            <div className="flex justify-between items-start gap-4 mb-2">
              <div>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.authors} · {p.journal} · {p.year}</p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">Peer-Reviewed</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.abstract}</p>
            <div className="flex gap-2 mt-3">
              <button className="text-xs px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground font-medium">Read Full Paper</button>
              <button className="text-xs px-3 py-1.5 rounded-lg border border-border font-medium">Cite</button>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 glass-strong rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full gradient-primary opacity-15 blur-3xl" />
        <h2 className="text-2xl font-bold">Contribute to research</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">Opt in to share anonymized scan data with PinkShield's research consortium. Every annotated case helps train better detection models for the next generation.</p>
        <button className="mt-4 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift">Learn how to contribute</button>
      </div>
    </div>
  );
}
