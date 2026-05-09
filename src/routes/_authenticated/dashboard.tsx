import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Activity, FileText, Calendar, Heart, Bell, TrendingUp, Sparkles, Award, Droplets, Footprints, Moon, Bot } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, RadialBar, RadialBarChart } from "recharts";
import { useAuth } from "@/lib/auth";
import { getGreeting, formatIST } from "@/lib/greeting";
import { HEALTH_TIPS, QUOTES } from "@/lib/mock-data";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PinkShield" }] }),
  component: Dashboard,
});

const monthly = [
  { m: "Jan", scans: 12, score: 78 }, { m: "Feb", scans: 14, score: 80 }, { m: "Mar", scans: 18, score: 82 },
  { m: "Apr", scans: 16, score: 81 }, { m: "May", scans: 22, score: 85 }, { m: "Jun", scans: 24, score: 87 },
  { m: "Jul", scans: 26, score: 89 }, { m: "Aug", scans: 28, score: 90 },
];

const distribution = [
  { name: "Normal", value: 68, fill: "var(--success)" },
  { name: "Low Risk", value: 21, fill: "#a3c853" },
  { name: "Medium", value: 8, fill: "var(--warning)" },
  { name: "High", value: 3, fill: "var(--destructive)" },
];

function Dashboard() {
  const { user } = useAuth();
  const [greeting] = useState(getGreeting());
  const tip = HEALTH_TIPS[new Date().getDate() % HEALTH_TIPS.length];
  const quote = QUOTES[new Date().getDate() % QUOTES.length];
  const scoreData = [{ name: "score", value: 87, fill: "var(--primary)" }];

  return (
    <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{formatIST(new Date())}</p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1">{greeting}, <span className="gradient-text">{user?.name?.split(" ")[0]}</span> 👋</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">Here's your wellness summary. Keep up the great work — early awareness is the best medicine.</p>
        </div>
        <div className="glass rounded-2xl px-5 py-3 shadow-soft">
          <p className="text-xs text-muted-foreground">Profile completion</p>
          <p className="text-xl font-bold gradient-text">82%</p>
        </div>
      </motion.div>

      {/* Stat Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Health Score", value: 87, suffix: "%", icon: Heart, color: "from-pink-400 to-rose-500" },
          { label: "AI Scans", value: user?.scans.length ?? 0, icon: Activity, color: "from-fuchsia-400 to-pink-500" },
          { label: "Reports", value: user?.reports.length ?? 0, icon: FileText, color: "from-rose-400 to-pink-600" },
          { label: "Day Streak", value: 24, icon: Award, color: "from-pink-500 to-purple-500" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-strong rounded-2xl p-5 hover-lift relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${s.color} opacity-20 blur-2xl group-hover:opacity-40 transition`} />
            <s.icon className="h-5 w-5 text-primary" />
            <p className="text-3xl font-bold mt-3"><Counter to={s.value} suffix={s.suffix ?? ""} /></p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Scan Trend */}
        <div className="lg:col-span-2 glass-strong rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Health & Scan Trend</h3>
              <p className="text-xs text-muted-foreground">Last 8 months</p>
            </div>
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.5} /><stop offset="95%" stopColor="var(--primary)" stopOpacity={0} /></linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--success)" stopOpacity={0.5} /><stop offset="95%" stopColor="var(--success)" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="score" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2} />
              <Area type="monotone" dataKey="scans" stroke="var(--success)" fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Health Score Radial */}
        <div className="glass-strong rounded-2xl p-6 flex flex-col">
          <h3 className="font-semibold">Wellness Score</h3>
          <p className="text-xs text-muted-foreground">AI-computed from activity</p>
          <div className="flex-1 grid place-items-center relative">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={scoreData} startAngle={90} endAngle={-270}>
                <RadialBar background dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <p className="text-4xl font-bold gradient-text">87</p>
              <p className="text-xs text-muted-foreground">out of 100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Trackers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Heart Rate", value: 72, unit: "bpm", icon: Heart },
          { label: "Steps Today", value: 8420, unit: "", icon: Footprints },
          { label: "Hydration", value: 1.8, unit: "L", icon: Droplets },
          { label: "Sleep", value: 7.5, unit: "h", icon: Moon },
        ].map((m) => (
          <div key={m.label} className="glass rounded-2xl p-4 hover-lift">
            <m.icon className="h-4 w-4 text-primary" />
            <p className="text-2xl font-bold mt-2">{m.value}<span className="text-sm font-normal text-muted-foreground"> {m.unit}</span></p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Risk Distribution */}
        <div className="glass-strong rounded-2xl p-6">
          <h3 className="font-semibold mb-1">Global Risk Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">From PinkShield community scans</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={distribution} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {distribution.map((d) => <Cell key={d.name} fill={d.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            {distribution.map((d) => (
              <div key={d.name} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: d.fill }} /> {d.name} · {d.value}%</div>
            ))}
          </div>
        </div>

        {/* Recent Scans */}
        <div className="glass-strong rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Recent AI Scans</h3>
          <div className="space-y-3">
            {user?.scans.slice(0, 4).map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition">
                <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground font-bold text-xs">{s.id.slice(-3)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{s.summary}</p>
                  <p className="text-xs text-muted-foreground">{formatIST(s.date)} · {s.confidence}% confidence</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.risk === "Normal" ? "bg-success/15 text-success" : s.risk === "Low Risk" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"}`}>{s.risk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="glass-strong rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Upcoming Appointments</h3>
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-3">
            {user?.appointments.map((a) => (
              <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl border border-border/60 hover:bg-primary/5 transition">
                <div className="text-center px-3 py-1 rounded-lg bg-primary/10 min-w-[64px]">
                  <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString("en", { month: "short" })}</p>
                  <p className="text-xl font-bold gradient-text">{new Date(a.date).getDate()}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{a.doctor}</p>
                  <p className="text-xs text-muted-foreground">{a.specialty} · {a.time} · {a.mode}</p>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground font-medium">Join</button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant */}
        <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full gradient-primary opacity-20 blur-2xl" />
          <Bot className="h-6 w-6 text-primary" />
          <h3 className="font-semibold mt-2">PinkShield AI Assistant</h3>
          <p className="text-sm text-muted-foreground mt-2">Ask anything — symptoms, treatments, diet plans, mental wellness or emergency steps.</p>
          <button className="mt-4 w-full px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-glow hover-lift">Open Assistant</button>
        </div>
      </div>

      {/* Tips & Quote */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold mt-2">Daily Wellness Tip</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{tip}</p>
        </div>
        <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold mt-2">Awareness Quote</h3>
          <p className="text-base italic mt-2 leading-relaxed">"{quote}"</p>
        </div>
      </div>
    </div>
  );
}
