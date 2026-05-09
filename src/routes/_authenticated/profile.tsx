import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Save, User, Phone, Mail, MapPin, Heart, Award, FileText } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { formatIST } from "@/lib/greeting";
import { downloadReport } from "@/lib/report";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Profile — PinkShield" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ ...user });
  const [tab, setTab] = useState<"info" | "medical" | "scans" | "reports">("info");
  const fileRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);

  if (!user) return null;
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const onAvatar = (f: File) => {
    const r = new FileReader();
    r.onload = (e) => { const url = e.target?.result as string; setForm((p) => ({ ...p, avatar: url })); updateUser({ avatar: url }); };
    r.readAsDataURL(f);
  };

  const save = () => { updateUser(form); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const age = form.dob ? Math.floor((Date.now() - new Date(form.dob).getTime()) / (365.25 * 86400000)) : null;
  const completion = [form.name, form.email, form.phone, form.dob, form.gender, form.bloodGroup, form.address, form.avatar].filter(Boolean).length * 12.5;

  return (
    <div className="px-4 sm:px-8 py-10 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-3xl p-8 mb-6 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full gradient-primary opacity-15 blur-3xl" />
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
          <div className="relative">
            <div className="h-28 w-28 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-glow">
              {form.avatar ? <img src={form.avatar} className="h-full w-full object-cover" /> : <div className="h-full w-full gradient-primary grid place-items-center text-primary-foreground text-3xl font-bold">{initials}</div>}
            </div>
            <button onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 p-2 rounded-full gradient-primary text-primary-foreground shadow-soft"><Camera className="h-4 w-4" /></button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onAvatar(f); }} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user.name} <span className="text-primary text-sm align-middle">✓ Verified</span></h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3 text-xs">
              {age && <Pill icon={Heart} label={`${age} years`} />}
              {form.bloodGroup && <Pill icon={Heart} label={`Blood ${form.bloodGroup}`} />}
              <Pill icon={Award} label={`Member since ${new Date(user.createdAt).getFullYear()}`} />
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1"><span>Profile completion</span><span className="font-semibold">{Math.round(completion)}%</span></div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-primary transition-all" style={{ width: `${completion}%` }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          { k: "info", label: "Personal Info" },
          { k: "medical", label: "Medical History" },
          { k: "scans", label: "Scan History" },
          { k: "reports", label: "Saved Reports" },
        ].map((t) => (
          <button key={t.k} onClick={() => setTab(t.k as typeof tab)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${tab === t.k ? "gradient-primary text-primary-foreground shadow-glow" : "glass border border-border hover:bg-primary/10"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "info" && (
        <div className="glass-strong rounded-3xl p-6 grid sm:grid-cols-2 gap-4">
          <Input icon={User} label="Full name" value={form.name || ""} onChange={(v) => setForm({ ...form, name: v })} />
          <Input icon={Mail} label="Email" value={form.email || ""} onChange={(v) => setForm({ ...form, email: v })} />
          <Input icon={Phone} label="Phone" value={form.phone || ""} onChange={(v) => setForm({ ...form, phone: v })} />
          <Input icon={User} label="Date of birth" type="date" value={form.dob || ""} onChange={(v) => setForm({ ...form, dob: v })} />
          <div>
            <label className="text-xs font-medium text-muted-foreground">Gender</label>
            <select value={form.gender || ""} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select</option><option>Female</option><option>Male</option><option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Blood group</label>
            <select value={form.bloodGroup || ""} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select</option>{["O+","O-","A+","A-","B+","B-","AB+","AB-"].map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <Input icon={MapPin} label="Address" value={form.address || ""} onChange={(v) => setForm({ ...form, address: v })} />
          <Input icon={Phone} label="Emergency contact" value={form.emergencyContact || ""} onChange={(v) => setForm({ ...form, emergencyContact: v })} />
          <button onClick={save} className="sm:col-span-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift">
            <Save className="h-4 w-4" /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      )}

      {tab === "medical" && (
        <div className="glass-strong rounded-3xl p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Medical history (allergies, conditions)</label>
            <textarea value={form.medicalHistory || ""} onChange={(e) => setForm({ ...form, medicalHistory: e.target.value })} rows={4} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Previous diagnoses</label>
            <textarea value={form.diagnoses || ""} onChange={(e) => setForm({ ...form, diagnoses: e.target.value })} rows={4} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <button onClick={save} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift">
            <Save className="h-4 w-4" /> {saved ? "Saved!" : "Save Medical Info"}
          </button>
        </div>
      )}

      {tab === "scans" && (
        <div className="grid md:grid-cols-2 gap-4">
          {user.scans.map((s) => (
            <div key={s.id} className="glass-strong rounded-2xl p-5">
              <div className="flex justify-between mb-2"><span className="text-xs font-mono text-primary">{s.id}</span><span className="text-xs">{s.risk}</span></div>
              <p className="text-sm">{s.summary}</p>
              <p className="text-xs text-muted-foreground mt-2">{formatIST(s.date)}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "reports" && (
        <div className="grid md:grid-cols-2 gap-4">
          {user.reports.map((s) => (
            <div key={s.id} className="glass-strong rounded-2xl p-5">
              <div className="flex justify-between mb-2"><FileText className="h-5 w-5 text-primary" /><button onClick={() => downloadReport(s, user.name, user.email)} className="text-xs text-primary hover:underline">Download</button></div>
              <p className="font-semibold">Report {s.id}</p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.summary}</p>
              <p className="text-xs text-muted-foreground mt-2">{formatIST(s.date)} · {s.confidence}% confidence</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Input({ icon: Icon, label, value, onChange, type = "text" }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1 relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
    </div>
  );
}

function Pill({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"><Icon className="h-3 w-3" /> {label}</span>;
}
