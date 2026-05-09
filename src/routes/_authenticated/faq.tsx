import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/faq")({
  head: () => ({ meta: [{ title: "FAQ — PinkShield" }] }),
  component: FAQ,
});

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="px-4 sm:px-8 py-10 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <HelpCircle className="h-12 w-12 text-primary mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-bold mt-3">Frequently Asked <span className="gradient-text">Questions</span></h1>
        <p className="text-muted-foreground mt-2">Everything you wanted to know about PinkShield, screening and breast health.</p>
      </motion.div>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center p-5 text-left hover:bg-primary/5 transition">
              <span className="font-semibold">{f.q}</span>
              <ChevronDown className={`h-5 w-5 text-primary transition ${open === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
