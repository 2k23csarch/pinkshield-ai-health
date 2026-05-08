import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 py-16 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mb-12"
    >
      {eyebrow && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-primary bg-primary/10 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      {description && <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>}
    </motion.div>
  );
}
