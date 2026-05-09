import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, AlertTriangle, MapPin, Clock, Heart } from "lucide-react";

export const Route = createFileRoute("/_authenticated/emergency")({
  head: () => ({ meta: [{ title: "Emergency — PinkShield" }] }),
  component: Emergency,
});

const HOTLINES = [
  { name: "PinkShield 24/7 Helpline", number: "1800-PINK-911", desc: "Trained breast cancer counsellors available around the clock" },
  { name: "National Cancer Helpline", number: "1800-11-2358", desc: "Government of India cancer information and referral service" },
  { name: "iCall Mental Health", number: "9152987821", desc: "Free counselling for patients and caregivers — call or chat" },
  { name: "Tata Memorial Centre", number: "022-2417-7000", desc: "India's leading cancer hospital — appointments and emergency triage" },
];

const CENTERS = [
  { name: "Tata Memorial Hospital", city: "Mumbai", time: "24x7 Emergency" },
  { name: "AIIMS Cancer Centre", city: "New Delhi", time: "24x7 Emergency" },
  { name: "Kidwai Memorial Institute", city: "Bengaluru", time: "24x7 Emergency" },
  { name: "Adyar Cancer Institute", city: "Chennai", time: "24x7 Emergency" },
];

function Emergency() {
  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-3xl p-8 mb-8 relative overflow-hidden border-2 border-destructive/30">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-destructive opacity-10 blur-3xl" />
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-12 w-12 text-destructive animate-pulse" />
          <div>
            <h1 className="text-3xl font-bold">Need urgent help?</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">If you're experiencing severe pain, sudden swelling, heavy bleeding or a medical emergency, call 102 (India ambulance) or visit the nearest emergency room immediately.</p>
            <a href="tel:102" className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-destructive text-destructive-foreground font-bold shadow-glow hover-lift">
              <Phone className="h-5 w-5" /> Call 102 — Ambulance
            </a>
          </div>
        </div>
      </motion.div>

      <h2 className="text-2xl font-bold mb-4">Emergency Hotlines</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {HOTLINES.map((h, i) => (
          <motion.div key={h.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-strong rounded-2xl p-5 hover-lift">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-full gradient-primary grid place-items-center text-primary-foreground"><Phone className="h-5 w-5" /></div>
              <div className="flex-1">
                <h3 className="font-semibold">{h.name}</h3>
                <a href={`tel:${h.number.replace(/[^\d]/g, "")}`} className="text-2xl font-bold gradient-text">{h.number}</a>
                <p className="text-xs text-muted-foreground mt-1">{h.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">24/7 Cancer Centers</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CENTERS.map((c) => (
          <div key={c.name} className="glass-strong rounded-2xl p-5">
            <Heart className="h-5 w-5 text-primary" />
            <h4 className="font-semibold mt-2">{c.name}</h4>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {c.city}</p>
            <p className="text-xs text-success font-medium flex items-center gap-1 mt-1"><Clock className="h-3 w-3" /> {c.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
