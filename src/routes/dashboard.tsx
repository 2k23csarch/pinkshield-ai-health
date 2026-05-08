import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Users, ShieldCheck, TrendingUp } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { Section, SectionHeader } from "@/components/Section";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Analytics Dashboard — PinkShield" },
      { name: "description", content: "Real-time awareness statistics, scans performed, and detection metrics on PinkShield." },
    ],
  }),
  component: Dashboard,
});

const monthly = [
  { m: "Jan", scans: 1200, detections: 84 },
  { m: "Feb", scans: 1450, detections: 98 },
  { m: "Mar", scans: 1820, detections: 112 },
  { m: "Apr", scans: 2100, detections: 138 },
  { m: "May", scans: 2540, detections: 162 },
  { m: "Jun", scans: 2980, detections: 184 },
  { m: "Jul", scans: 3320, detections: 207 },
  { m: "Aug", scans: 3870, detections: 232 },
  { m: "Sep", scans: 4150, detections: 258 },
  { m: "Oct", scans: 4720, detections: 289 },
  { m: "Nov", scans: 5210, detections: 314 },
  { m: "Dec", scans: 5840, detections: 348 },
];

const distribution = [
  { name: "Normal", value: 62 },
  { name: "Low Risk", value: 21 },
  { name: "Medium Risk", value: 12 },
  { name: "High Risk", value: 5 },
];

const COLORS = ["oklch(0.74 0.18 155)", "oklch(0.78 0.16 75)", "oklch(0.68 0.20 35)", "oklch(0.62 0.24 25)"];

const stats = [
  { icon: Activity, label: "Total Scans", value: 184_320, suffix: "+", color: "from-pink-400 to-rose-500" },
  { icon: ShieldCheck, label: "AI Accuracy", value: 98, suffix: "%" },
  { icon: TrendingUp, label: "Early Detections", value: 12_480, suffix: "+" },
  { icon: Users, label: "Lives Reached", value: 2_400_000, suffix: "+" },
];

function Dashboard() {
  return (
    <Section>
      <SectionHeader eyebrow="Live Insights" title="Awareness & Detection Analytics" description="Aggregated, anonymised metrics from the PinkShield global network — updated continuously." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-strong rounded-2xl p-6 hover-lift">
            <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-soft">
              <s.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="text-3xl font-bold gradient-text"><Counter to={s.value} suffix={s.suffix} /></div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="glass-strong rounded-3xl p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Monthly Scan Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.74 0.20 350)" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="oklch(0.74 0.20 350)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="m" stroke="currentColor" fontSize={12} />
              <YAxis stroke="currentColor" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="scans" stroke="oklch(0.66 0.21 350)" strokeWidth={2.5} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-strong rounded-3xl p-6">
          <h3 className="font-semibold mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                {distribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            {distribution.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} /> {d.name} · {d.value}%
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-6 lg:col-span-3">
          <h3 className="font-semibold mb-4">Early Detections per Month</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="m" stroke="currentColor" fontSize={12} />
              <YAxis stroke="currentColor" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="detections" fill="oklch(0.74 0.20 350)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Section>
  );
}
