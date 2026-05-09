import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Microscope, AlertCircle, Activity, Eye, Droplet, Thermometer, ShieldAlert } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";

export const Route = createFileRoute("/about-cancer")({
  head: () => ({
    meta: [
      { title: "Understanding Breast Cancer — PinkShield" },
      { name: "description", content: "Detailed educational guide on breast cancer: causes, stages, risk factors, symptoms and the importance of early detection." },
    ],
  }),
  component: AboutCancer,
});

const symptoms = [
  { icon: AlertCircle, title: "Lumps in Breast or Armpit", desc: "A painless, hard lump with irregular edges is the most common early sign. Any new mass that persists across a menstrual cycle should be examined by a clinician." },
  { icon: Activity, title: "Swelling & Shape Changes", desc: "Unexplained swelling, asymmetry or sudden change in breast size or contour can indicate underlying tissue changes that warrant imaging." },
  { icon: Thermometer, title: "Redness & Warmth", desc: "Persistent redness, warmth or an orange-peel skin texture (peau d'orange) may signal inflammatory breast cancer — a rare but aggressive subtype." },
  { icon: Droplet, title: "Nipple Discharge", desc: "Spontaneous discharge — especially clear, bloody or from a single duct — should always be evaluated, even when no lump is felt." },
  { icon: Eye, title: "Skin Texture Changes", desc: "Dimpling, puckering, scaling or thickening of the skin around the nipple often appears before a palpable mass is detectable." },
  { icon: ShieldAlert, title: "Persistent Breast Pain", desc: "While most pain is benign, localized, persistent and non-cyclical pain in one specific area should be checked by a specialist." },
];

const stages = [
  { stage: "Stage 0", title: "Non-invasive (DCIS)", desc: "Abnormal cells are confined to the milk ducts and have not spread. Survival rates approach 99% with timely treatment." },
  { stage: "Stage I", title: "Early invasive", desc: "Tumor under 2 cm with little or no lymph node involvement. Highly treatable with surgery and adjuvant therapy." },
  { stage: "Stage II", title: "Localized growth", desc: "Tumor 2–5 cm or limited spread to nearby lymph nodes. Combination therapy yields strong long-term outcomes." },
  { stage: "Stage III", title: "Regional spread", desc: "Larger tumors with extensive nodal involvement. Multimodal treatment including chemotherapy is standard." },
  { stage: "Stage IV", title: "Metastatic", desc: "Cancer has spread to distant organs. Modern targeted therapies have transformed it into a manageable chronic disease for many patients." },
];

const risks = [
  "Female biological sex (the strongest single risk factor)",
  "Age above 40 — risk doubles every decade after 30",
  "Family history of breast or ovarian cancer",
  "Inherited BRCA1 / BRCA2 mutations",
  "Early menarche (before 12) or late menopause (after 55)",
  "Dense breast tissue on mammography",
  "Long-term hormone replacement therapy",
  "Obesity, sedentary lifestyle and high alcohol intake",
];

function AboutCancer() {
  return (
    <>
      <Section>
        <SectionHeader eyebrow="Knowledge is Power" title="Understanding Breast Cancer" description="A complete, evidence-informed educational guide to one of the most common cancers affecting women — and increasingly men — across the world." />

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <article className="glass rounded-2xl p-7 lg:col-span-2 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center"><Microscope className="h-5 w-5 text-primary-foreground" /></div>
              <h3 className="text-xl font-semibold">What is Breast Cancer?</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Breast cancer is a disease in which cells in the breast grow uncontrollably, forming a malignant tumor that can invade surrounding tissue and spread to other parts of the body through the lymphatic and blood systems. It typically begins in the inner lining of the milk-producing ducts (ductal carcinoma) or the lobules that supply them (lobular carcinoma). Although it overwhelmingly affects women, men account for roughly one in every hundred cases globally.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The disease is profoundly heterogeneous — under the microscope no two breast cancers behave exactly alike. Modern oncology classifies tumors by hormone-receptor status (ER, PR), HER2 protein expression and proliferation rate, allowing clinicians to design highly personalized treatment plans. This molecular understanding has driven survival rates from below 50% in the 1970s to more than 90% for early-stage disease today.
            </p>
          </article>

          <article className="glass rounded-2xl p-7 hover-lift">
            <h3 className="text-xl font-semibold mb-3">How it Develops</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Cancer begins when DNA inside a single breast cell mutates — usually due to a combination of inherited predisposition, hormonal exposure, environmental factors and random replication errors. Over months to years the abnormal cell divides unchecked, eventually forming a microscopic cluster, then a palpable lump. If undetected, malignant cells break away, travel through lymph vessels and seed distant organs — a process called metastasis, responsible for the majority of cancer-related deaths.
            </p>
          </article>
        </div>

        {/* Causes */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <article className="glass rounded-2xl p-7 hover-lift">
            <h3 className="text-xl font-semibold mb-3">Causes & Triggers</h3>
            <p className="text-muted-foreground leading-relaxed">
              No single cause has been identified for breast cancer; instead it arises from an intricate interplay of genetic, hormonal and lifestyle influences. Inherited mutations — particularly in the BRCA1 and BRCA2 tumour-suppressor genes — confer a lifetime risk as high as 70%. Lifelong exposure to estrogen, dense glandular tissue, ionizing radiation to the chest, alcohol consumption and obesity all contribute to elevating risk. Importantly, around 75% of women diagnosed have no family history at all, which is why universal awareness and screening matter.
            </p>
          </article>
          <article className="glass rounded-2xl p-7 hover-lift">
            <h3 className="text-xl font-semibold mb-3">Why Early Detection Matters</h3>
            <p className="text-muted-foreground leading-relaxed">
              Survival in breast cancer is dictated more by the stage at diagnosis than by any single treatment choice. When detected at Stage 0 or I, five-year survival exceeds 95%; once the disease becomes metastatic that figure falls below 30%. Routine self-examination, annual clinical exams after age 40 and biennial mammography — augmented by AI-assisted screening platforms like PinkShield — can shift detection to its earliest, most curable phase. Every minute saved in diagnosis can translate into years of life regained.
            </p>
          </article>
        </div>
      </Section>

      {/* SYMPTOMS */}
      <Section>
        <SectionHeader eyebrow="Know the Signs" title="Common Symptoms to Watch For" description="Most breast changes are not cancer, but every persistent change deserves a clinical opinion. Knowing what to look for can shorten time-to-diagnosis dramatically." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {symptoms.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 hover-lift"
            >
              <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center mb-3 shadow-soft">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h4 className="font-semibold mb-2">{s.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* STAGES */}
      <Section>
        <SectionHeader eyebrow="Disease Progression" title="The Five Stages of Breast Cancer" description="Staging guides treatment intensity and prognostic outlook. Understanding it empowers patients to participate meaningfully in their care plans." />
        <div className="space-y-4">
          {stages.map((s, i) => (
            <motion.div
              key={s.stage}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass rounded-2xl p-6 flex flex-col sm:flex-row gap-4 sm:items-center hover-lift"
            >
              <div className="shrink-0 w-24 text-center">
                <div className="text-2xl font-bold gradient-text">{s.stage}</div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{s.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* RISK FACTORS */}
      <Section>
        <SectionHeader eyebrow="Risk Factors" title="What Increases Your Risk" description="Some risks are unmodifiable, others are firmly within your control. Understanding both lets you build a personalized prevention strategy." />
        <div className="glass-strong rounded-3xl p-8 grid sm:grid-cols-2 gap-3">
          {risks.map((r) => (
            <div key={r} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5">
              <div className="h-2 w-2 mt-2 rounded-full gradient-primary shrink-0" />
              <span className="text-sm">{r}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* GLOBAL */}
      <Section>
        <div className="glass-strong rounded-3xl p-10">
          <h3 className="text-3xl font-bold mb-4 gradient-text">A Global Health Priority</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Breast cancer became the world's most diagnosed cancer in 2021, with 2.3 million new cases annually and an estimated 685,000 deaths. The burden falls disproportionately on low- and middle-income countries, where late presentation and limited treatment infrastructure account for nearly 70% of all breast cancer mortality. Awareness campaigns, mobile screening units and AI-powered triage tools are rapidly closing this survival gap.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Patients face challenges far beyond the medical: the emotional weight of diagnosis, financial toxicity of treatment, body-image concerns after surgery, fertility considerations and the long shadow of recurrence anxiety. PinkShield exists to address every one of these dimensions — because curing the cancer is only half of healing the person.
          </p>
        </div>
      </Section>
    </>
  );
}
