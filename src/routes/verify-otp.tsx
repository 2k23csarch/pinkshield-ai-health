import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2 } from "lucide-react";
import { OtpInput } from "@/components/OtpInput";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({ meta: [{ title: "Verify OTP — PinkShield" }] }),
  component: VerifyOtp,
});

function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(30);

  useEffect(() => {
    const t = setInterval(() => setResend((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <form onSubmit={submit} className="glass-strong rounded-3xl p-8 shadow-glow">
          <div className="text-center mb-6">
            <img src={logo} alt="" className="h-14 w-14 mx-auto mb-3" />
            <h1 className="text-2xl font-bold">Verify your account</h1>
            <p className="text-sm text-muted-foreground mt-1">We've sent a 6-digit code to your email. Enter it below to continue.</p>
          </div>
          <OtpInput onChange={setOtp} />
          <button disabled={loading || otp.length !== 6} className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />} Verify & Continue
          </button>
          <div className="text-center text-xs text-muted-foreground mt-5">
            {resend > 0 ? `Resend code in ${resend}s` : (
              <button type="button" onClick={() => setResend(30)} className="text-primary font-medium hover:underline">Resend code</button>
            )}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            <Link to="/login" className="text-primary hover:underline">Back to login</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
