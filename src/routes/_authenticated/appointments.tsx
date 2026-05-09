import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, MapPin, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { DOCTORS } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/appointments")({
  head: () => ({ meta: [{ title: "Appointments — PinkShield" }] }),
  component: AppointmentsPage,
});

function AppointmentsPage() {
  const { user, addAppointment } = useAuth();
  const [doc, setDoc] = useState(DOCTORS[0].id);
  const [date, setDate] = useState(new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10));
  const [time, setTime] = useState("10:30 AM");
  const [mode, setMode] = useState<"Video" | "In-person">("Video");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = DOCTORS.find((x) => x.id === doc)!;
    addAppointment({ id: "AP-" + Math.floor(100 + Math.random() * 9000), doctor: d.name, specialty: d.specialty, date, time, mode });
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  const slots = ["09:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:30 PM"];

  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Book an <span className="gradient-text">appointment</span></h1>
        <p className="text-muted-foreground mt-2">Choose your specialist, date and time. Video or in-person, always confidential.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={submit} className="glass-strong rounded-3xl p-6 space-y-5">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Doctor</label>
            <select value={doc} onChange={(e) => setDoc(e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              {DOCTORS.map((d) => <option key={d.id} value={d.id}>{d.name} · {d.specialty}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Available slots</label>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((s) => (
                <button key={s} type="button" onClick={() => setTime(s)} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${time === s ? "gradient-primary text-primary-foreground shadow-soft" : "glass border border-border hover:bg-primary/10"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Mode</label>
            <div className="grid grid-cols-2 gap-2">
              {(["Video", "In-person"] as const).map((m) => (
                <button key={m} type="button" onClick={() => setMode(m)} className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${mode === m ? "gradient-primary text-primary-foreground shadow-soft" : "glass border border-border hover:bg-primary/10"}`}>
                  {m === "Video" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />} {m}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift">
            {done ? <><CheckCircle2 className="h-4 w-4" /> Confirmed!</> : <><Calendar className="h-4 w-4" /> Confirm Booking</>}
          </button>
        </form>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Your Appointments</h3>
          {user?.appointments.map((a) => (
            <motion.div key={a.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-strong rounded-2xl p-5 hover-lift">
              <div className="flex items-start gap-4">
                <div className="text-center px-3 py-2 rounded-xl bg-primary/10 min-w-[64px]">
                  <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString("en", { month: "short" })}</p>
                  <p className="text-2xl font-bold gradient-text">{new Date(a.date).getDate()}</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{a.doctor}</h4>
                  <p className="text-xs text-muted-foreground">{a.specialty}</p>
                  <p className="text-sm mt-1 flex items-center gap-1.5"><Clock className="h-3 w-3 text-primary" /> {a.time} · {a.mode}</p>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground font-medium">{a.mode === "Video" ? "Join" : "View"}</button>
              </div>
            </motion.div>
          ))}
          {(user?.appointments.length ?? 0) === 0 && <p className="text-sm text-muted-foreground">No appointments yet.</p>}
        </div>
      </div>
    </div>
  );
}
