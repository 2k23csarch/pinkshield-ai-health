import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Smile, Activity, Droplets, Pill, Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/health-tracker")({
  head: () => ({ meta: [{ title: "Health Tracker — PinkShield" }] }),
  component: HealthTracker,
});

const MOODS = ["😢", "😕", "😐", "🙂", "😄"];
const data = Array.from({ length: 14 }, (_, i) => ({ day: `D${i + 1}`, mood: 3 + Math.sin(i / 2) + Math.random(), weight: 62 + Math.sin(i / 3) }));

function HealthTracker() {
  const [mood, setMood] = useState(3);
  const [symptoms, setSymptoms] = useState("");
  const [water, setWater] = useState(4);
  const [logs, setLogs] = useState<{ date: string; mood: number; symptoms: string }[]>([]);

  const log = () => {
    setLogs([{ date: new Date().toLocaleDateString(), mood, symptoms }, ...logs]);
    setSymptoms("");
  };

  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Health <span className="gradient-text">Tracker</span></h1>
        <p className="text-muted-foreground mt-2">Track mood, weight, water, medication and symptoms — your personal wellness journal.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-strong rounded-3xl p-6">
          <h3 className="font-semibold flex items-center gap-2"><Smile className="h-4 w-4 text-primary" /> Today's mood</h3>
          <div className="flex justify-between gap-2 mt-4">
            {MOODS.map((m, i) => (
              <button key={i} onClick={() => setMood(i)} className={`flex-1 aspect-square rounded-2xl text-3xl transition ${mood === i ? "gradient-primary scale-110 shadow-glow" : "glass border border-border hover:bg-primary/10"}`}>{m}</button>
            ))}
          </div>
          <label className="block text-xs font-medium text-muted-foreground mt-5 mb-1">Symptoms / notes</label>
          <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          <button onClick={log} className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift"><Plus className="h-4 w-4" /> Log entry</button>
        </div>

        <div className="glass-strong rounded-3xl p-6">
          <h3 className="font-semibold flex items-center gap-2"><Droplets className="h-4 w-4 text-primary" /> Water intake</h3>
          <div className="flex justify-center gap-2 mt-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <button key={i} onClick={() => setWater(i + 1)} className={`h-16 w-7 rounded-full border-2 transition ${i < water ? "bg-gradient-to-t from-primary to-primary-glow border-primary" : "border-border"}`} />
            ))}
          </div>
          <p className="text-center text-sm mt-3"><b>{water * 250}ml</b> of <b>2000ml</b> daily goal</p>
          <h3 className="font-semibold flex items-center gap-2 mt-6"><Pill className="h-4 w-4 text-primary" /> Medication reminders</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {[["Tamoxifen 20mg", "8:00 AM", true], ["Vitamin D3", "1:00 PM", true], ["Calcium", "9:00 PM", false]].map(([n, t, ok]) => (
              <li key={n as string} className="flex justify-between items-center px-3 py-2 rounded-lg bg-primary/5">
                <div><p className="font-medium">{n}</p><p className="text-xs text-muted-foreground">{t}</p></div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${ok ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{ok ? "Taken" : "Pending"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-strong rounded-3xl p-6 mt-6">
        <h3 className="font-semibold flex items-center gap-2 mb-4"><Activity className="h-4 w-4 text-primary" /> Wellness Trend (14 days)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
            <Line type="monotone" dataKey="mood" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="weight" stroke="var(--success)" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {logs.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Recent entries</h3>
          <div className="space-y-2">
            {logs.map((l, i) => (
              <div key={i} className="glass rounded-2xl p-4 flex items-center gap-4">
                <span className="text-2xl">{MOODS[l.mood]}</span>
                <div className="flex-1"><p className="text-sm font-medium">{l.date}</p><p className="text-xs text-muted-foreground">{l.symptoms || "No notes"}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
