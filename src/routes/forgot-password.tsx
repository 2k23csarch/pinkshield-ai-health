import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset Password — PinkShield" }] }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false); setSent(true);
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md glass-strong rounded-3xl p-8 shadow-glow">
        <div className="text-center mb-6">
          <img src={logo} alt="" className="h-14 w-14 mx-auto mb-3" />
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send you a reset link.</p>
        </div>
        {sent ? (
          <div className="text-center py-6">
            <CheckCircle2 className="h-14 w-14 text-success mx-auto mb-3" />
            <p className="font-semibold">Check your inbox</p>
            <p className="text-sm text-muted-foreground mt-1">We've sent reset instructions to <b>{email}</b></p>
            <Link to="/login" className="inline-block mt-5 text-primary font-medium hover:underline">Back to login</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />} Send reset link
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Remember it? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
