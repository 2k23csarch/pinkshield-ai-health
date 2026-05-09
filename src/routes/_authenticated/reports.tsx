import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, Download, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { downloadReport } from "@/lib/report";
import { formatIST } from "@/lib/greeting";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({ meta: [{ title: "Reports — PinkShield" }] }),
  component: Reports,
});

function Reports() {
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  if (!user) return null;
  const filtered = user.reports.filter((r) => (filter === "All" || r.risk === filter) && r.id.toLowerCase().includes(q.toLowerCase()));
  const filters = ["All", "Normal", "Low Risk", "Medium Risk", "High Risk", "Critical"];

  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Your <span className="gradient-text">Medical Reports</span></h1>
        <p className="text-muted-foreground mt-2">Archive of all your AI-generated diagnostic reports. Download, share or compare.</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by report ID" className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${filter === f ? "gradient-primary text-primary-foreground shadow-glow" : "glass border border-border hover:bg-primary/10"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="glass-strong rounded-2xl p-5 hover-lift">
            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground"><FileText className="h-5 w-5" /></div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.risk === "Normal" ? "bg-success/15 text-success" : s.risk === "Low Risk" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"}`}>{s.risk}</span>
            </div>
            <p className="font-mono text-xs text-primary">{s.id}</p>
            <p className="font-semibold mt-1">PinkShield AI Report</p>
            <p className="text-xs text-muted-foreground mt-1">{formatIST(s.date)}</p>
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">{s.summary}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
              <span className="text-xs text-muted-foreground">{s.confidence}% confidence</span>
              <button onClick={() => downloadReport(s, user.name, user.email)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"><Download className="h-3 w-3" /> Download</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
