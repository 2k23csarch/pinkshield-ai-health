import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create Account — PinkShield" }] }),
  component: SignupPage,
});

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", dob: "", gender: "Female", bloodGroup: "O+" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email || form.password.length < 6) { setError("Please complete all fields. Password 6+ chars."); return; }
    setLoading(true);
    try {
      await signup(form);
      navigate({ to: "/verify-otp" });
    } catch {
      setError("Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-lg">
        <div className="glass-strong rounded-3xl p-8 shadow-glow">
          <div className="text-center mb-7">
            <img src={logo} alt="PinkShield" className="h-14 w-14 mx-auto mb-3" />
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join the global awareness movement</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Full name" icon={User}>
                <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" className="ai" />
              </Field>
              <Field label="Phone" icon={Phone}>
                <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98xxxxxxxx" className="ai" />
              </Field>
            </div>
            <Field label="Email" icon={Mail}>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" className="ai" />
            </Field>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Date of birth</label>
                <input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-input/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Gender</label>
                <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Blood group</label>
                <select value={form.bloodGroup} onChange={(e) => set("bloodGroup", e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  {["O+","O-","A+","A-","B+","B-","AB+","AB-"].map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <Field label="Password" icon={Lock}>
              <input type={show ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="At least 6 characters" className="ai pr-10" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </Field>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Creating…" : "Create Account"}
            </button>

            <p className="text-center text-sm text-muted-foreground pt-2">
              Already a member? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </motion.div>
      <style>{`.ai{width:100%;padding:0.625rem 0.75rem 0.625rem 2.5rem;border-radius:0.5rem;background:color-mix(in oklab,var(--input) 40%, transparent);border:1px solid var(--border);font-size:0.875rem}.ai:focus{outline:none;box-shadow:0 0 0 2px var(--primary)}`}</style>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1 relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        {children}
      </div>
    </div>
  );
}
