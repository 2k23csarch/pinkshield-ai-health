import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Pill, Radiation, Scissors, FlaskConical, Target, Heart, Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import doc1 from "@/assets/doctor1.jpg";
import doc2 from "@/assets/doctor2.jpg";
import doc3 from "@/assets/doctor3.jpg";

export const Route = createFileRoute("/treatment")({
  head: () => ({
    meta: [
      { title: "Treatment & Doctor Advice — PinkShield" },
      { name: "description", content: "Learn about chemotherapy, radiation, surgery, hormonal and targeted therapies, plus expert oncologist advice." },
    ],
  }),
  component: Treatment,
});

const treatments = [
  { icon: Scissors, title: "Surgery", desc: "Lumpectomy preserves the breast while removing the tumour with a clear margin; mastectomy removes the entire breast when clinically warranted. Sentinel node biopsy minimises lymphatic complications.", color: "from-pink-400 to-rose-500" },
  { icon: Radiation, title: "Radiation Therapy", desc: "High-energy beams precisely target residual cancer cells after surgery, reducing local recurrence by up to 70%. Modern hypofractionated regimens shorten treatment from six weeks to three." },
  { icon: Pill, title: "Chemotherapy", desc: "Systemic cytotoxic agents destroy rapidly dividing cells throughout the body. Modern protocols are highly tailored, with anti-nausea regimens making side effects far more manageable than a decade ago." },
  { icon: FlaskConical, title: "Hormonal Therapy", desc: "Tamoxifen and aromatase inhibitors block estrogen-driven growth in hormone-receptor-positive tumours, reducing recurrence risk by nearly half over a 5–10 year course." },
  { icon: Target, title: "Targeted Therapy", desc: "Drugs like trastuzumab and CDK4/6 inhibitors home in on specific molecular vulnerabilities — transforming aggressive HER2+ disease into a highly treatable condition." },
  { icon: Heart, title: "Emotional & Survivorship Care", desc: "Counselling, peer support groups, fertility preservation and rehabilitation are integrated from day one. Healing the whole person is as essential as treating the tumour." },
];

const doctors = [
  { img: doc1, name: "Dr. Aisha Verma", spec: "Surgical Oncologist", hospital: "Apollo Cancer Institute · Mumbai", advice: "I have walked alongside thousands of women on this journey. The single most powerful lesson I share is this: do not fear the screening — fear only the silence of waiting. A ten-minute mammogram every two years can save twenty years of your life. Bring a friend, share the appointment, normalise it for the next generation." },
  { img: doc2, name: "Dr. Marcus Hale", spec: "Medical Oncologist", hospital: "Mayo Clinic · Rochester", advice: "Modern breast cancer therapy is no longer one-size-fits-all. We now sequence the tumour itself and design a regimen built for your unique biology. My advice to every patient is to ask three questions at every appointment: What is my plan? What are my options? What is my support system? Knowledge transforms fear into agency." },
  { img: doc3, name: "Dr. Layla Al-Hassan", spec: "Radiation Oncologist", hospital: "King Faisal Specialist Hospital", advice: "Survivorship begins on the day of diagnosis, not the day of remission. Eat in colour, move every day, sleep deeply, and lean on the women in your life — they will carry you when you cannot carry yourself. And remember: a scar is not a wound. It is the proof that you survived." },
];

function Treatment() {
  return (
    <>
      <Section>
        <SectionHeader eyebrow="Modern Treatment" title="A Personalized Path to Healing" description="Today's breast cancer care is more precise, less toxic and more curative than ever. Each plan is custom-built around your tumour biology and your life goals." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t, i) => (
            <motion.div key={t.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass rounded-2xl p-7 hover-lift">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-soft">
                <t.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{t.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Expert Voices" title="Doctor Advice" description="Real guidance from leading oncologists working at the front lines of breast cancer care worldwide." />
        <div className="grid lg:grid-cols-3 gap-6">
          {doctors.map((d, i) => (
            <motion.article key={d.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-strong rounded-3xl overflow-hidden hover-lift">
              <div className="relative h-64">
                <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <h4 className="text-xl font-bold">{d.name}</h4>
                  <p className="text-sm text-primary font-medium">{d.spec}</p>
                  <p className="text-xs text-muted-foreground">{d.hospital}</p>
                </div>
              </div>
              <div className="p-6">
                <Quote className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{d.advice}"</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
    </>
  );
}
