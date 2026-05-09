import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Bell, Lock, Globe, Eye, Shield, Trash2 } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — PinkShield" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  const { logout } = useAuth();
  const [notif, setNotif] = useState({ email: true, sms: false, push: true, campaigns: true });
  const [lang, setLang] = useState("English");

  return (
    <div className="px-4 sm:px-8 py-10 max-w-4xl mx-auto space-y-6">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl font-bold">Settings</motion.h1>

      <Card title="Appearance" icon={theme === "dark" ? Moon : Sun}>
        <Row label="Dark mode" desc="Switch between pink-light and pink-dark themes">
          <button onClick={toggle} className={`relative w-12 h-6 rounded-full transition ${theme === "dark" ? "bg-primary" : "bg-muted"}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition shadow ${theme === "dark" ? "left-6" : "left-0.5"}`} />
          </button>
        </Row>
      </Card>

      <Card title="Notifications" icon={Bell}>
        {(["email", "sms", "push", "campaigns"] as const).map((k) => (
          <Row key={k} label={k.charAt(0).toUpperCase() + k.slice(1) + " notifications"} desc="Receive timely updates">
            <Toggle value={notif[k]} onToggle={() => setNotif({ ...notif, [k]: !notif[k] })} />
          </Row>
        ))}
      </Card>

      <Card title="Account & Security" icon={Lock}>
        <Row label="Change password" desc="Update your account password regularly"><button className="text-xs px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground font-medium">Change</button></Row>
        <Row label="Two-factor authentication" desc="Add an extra layer of security"><Toggle value /></Row>
        <Row label="Active sessions" desc="Sign out of other devices"><button className="text-xs px-3 py-1.5 rounded-lg border border-border">View</button></Row>
      </Card>

      <Card title="Privacy" icon={Eye}>
        <Row label="Allow anonymized data for research" desc="Help improve detection models"><Toggle value /></Row>
        <Row label="Show profile in community" desc="Visible in survivor & support groups"><Toggle value={false} /></Row>
      </Card>

      <Card title="Language" icon={Globe}>
        <Row label="Display language" desc="Interface language">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="px-3 py-1.5 rounded-lg bg-input/40 border border-border text-sm">
            <option>English</option><option>हिन्दी</option><option>தமிழ்</option><option>తెలుగు</option><option>বাংলা</option>
          </select>
        </Row>
      </Card>

      <Card title="Accessibility" icon={Shield}>
        <Row label="High contrast mode" desc="Improve readability"><Toggle value={false} /></Row>
        <Row label="Larger text" desc="Bigger fonts across the app"><Toggle value={false} /></Row>
        <Row label="Reduce motion" desc="Minimize animations"><Toggle value={false} /></Row>
      </Card>

      <Card title="Danger Zone" icon={Trash2}>
        <Row label="Sign out everywhere" desc="End all your active sessions"><button onClick={logout} className="text-xs px-3 py-1.5 rounded-lg border border-destructive text-destructive font-medium">Sign out</button></Row>
        <Row label="Delete account" desc="Permanently remove your data"><button className="text-xs px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground font-medium">Delete</button></Row>
      </Card>
    </div>
  );
}

function Card({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-3xl p-6">
      <h3 className="font-semibold flex items-center gap-2 mb-4"><Icon className="h-4 w-4 text-primary" /> {title}</h3>
      <div className="divide-y divide-border/40">{children}</div>
    </motion.div>
  );
}
function Row({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 gap-4">
      <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
      {children}
    </div>
  );
}
function Toggle({ value, onToggle }: { value: boolean; onToggle?: () => void }) {
  const [v, setV] = useState(value);
  return (
    <button onClick={() => { setV(!v); onToggle?.(); }} className={`relative w-12 h-6 rounded-full transition ${v ? "bg-primary" : "bg-muted"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition shadow ${v ? "left-6" : "left-0.5"}`} />
    </button>
  );
}
