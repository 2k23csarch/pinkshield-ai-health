import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Stethoscope, Calendar, MapPin, Search } from "lucide-react";
import { DOCTORS } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/doctors")({
  head: () => ({ meta: [{ title: "Doctors — PinkShield" }] }),
  component: DoctorsPage,
});

const SPECIALTIES = ["All", "Oncologist", "Radiologist", "Surgical Oncologist", "Therapist", "Nutritionist"];

function DoctorsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const list = DOCTORS.filter((d) => (filter === "All" || d.specialty === filter) && (d.name.toLowerCase().includes(q.toLowerCase()) || d.hospital.toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase text-primary bg-primary/10 mb-3">Verified Specialists</span>
        <h1 className="text-3xl sm:text-4xl font-bold">Meet our <span className="gradient-text">expert doctors</span></h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Top-tier oncologists, radiologists, surgeons, therapists and nutritionists, all verified by PinkShield's medical board. Book a video or in-person consultation in two clicks.</p>
      </motion.div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or hospital" className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {SPECIALTIES.map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${filter === s ? "gradient-primary text-primary-foreground shadow-glow" : "glass border border-border hover:bg-primary/10"}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass-strong rounded-2xl p-5 hover-lift relative overflow-hidden">
            <div className="flex gap-4">
              <div className="relative">
                <img src={d.image} alt={d.name} className="h-20 w-20 rounded-2xl object-cover ring-2 ring-primary/30" />
                <span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ring-2 ring-background ${d.available ? "bg-success" : "bg-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold leading-tight">{d.name}</h3>
                <p className="text-xs text-primary font-medium flex items-center gap-1"><Stethoscope className="h-3 w-3" /> {d.specialty}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {d.hospital}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="flex items-center gap-0.5 text-xs"><Star className="h-3 w-3 fill-warning text-warning" /> {d.rating}</span>
                  <span className="text-xs text-muted-foreground">· {d.experience}y exp</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 line-clamp-3 leading-relaxed">{d.bio}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
              <div>
                <p className="text-xs text-muted-foreground">Consultation</p>
                <p className="text-lg font-bold gradient-text">₹{d.fee}</p>
              </div>
              <button onClick={() => navigate({ to: "/appointments" })} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-soft hover-lift disabled:opacity-50" disabled={!d.available}>
                <Calendar className="h-4 w-4" /> {d.available ? "Book" : "Unavailable"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
