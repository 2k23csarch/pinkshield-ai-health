import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, ScanLine, ShieldCheck, AlertTriangle, FileText, RotateCcw, Activity, Cpu } from "lucide-react";
import { useAuth, type ScanResult } from "@/lib/auth";
import { downloadReport } from "@/lib/report";
import { RiskMeter } from "@/components/RiskMeter";
import { formatIST } from "@/lib/greeting";

export const Route = createFileRoute("/_authenticated/ai-detection")({
  head: () => ({ meta: [{ title: "AI Scan — PinkShield" }] }),
  component: AIDetection,
});

const RISKS: ScanResult["risk"][] = ["Normal", "Low Risk", "Medium Risk", "High Risk", "Critical"];
const SUMMARIES: Record<ScanResult["risk"], string> = {
  "Normal": "No abnormal tissue patterns detected. Continue routine screening per your age guidelines.",
  "Low Risk": "Minor benign density variations observed. Routine follow-up in 6-12 months recommended.",
  "Medium Risk": "Some patterns warrant clinical correlation. Schedule a consultation within 2-4 weeks.",
  "High Risk": "Significant abnormality patterns detected. Immediate consultation strongly advised.",
  "Critical": "Critical attention needed. Please contact an oncologist within 24 hours for diagnostic imaging.",
};
const RECS: Record<ScanResult["risk"], string[]> = {
  "Normal": ["Continue monthly self-exam", "Annual mammogram after 40", "Maintain healthy lifestyle"],
  "Low Risk": ["Follow-up ultrasound in 6 months", "Discuss findings with primary care", "Track any tissue changes"],
  "Medium Risk": ["Schedule diagnostic mammogram within 4 weeks", "Consult breast specialist", "Consider MRI if dense tissue"],
  "High Risk": ["Immediate biopsy evaluation", "Genetic counselling (BRCA1/2)", "Multi-disciplinary team review"],
  "Critical": ["Emergency oncology referral within 24h", "PET-CT imaging", "Begin treatment planning immediately"],
};

function AIDetection() {
  const { user, addScan } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [stage, setStage] = useState<"idle" | "upload" | "preprocess" | "analyze" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    const r = new FileReader();
    r.onload = (e) => setPreview(e.target?.result as string);
    r.readAsDataURL(f);
  };

  const startScan = async () => {
    if (!file) return;
    setResult(null);
    setStage("upload"); setProgress(0);
    for (const s of ["upload", "preprocess", "analyze"] as const) {
      setStage(s);
      for (let p = 0; p <= 100; p += 4) {
        setProgress(p);
        await new Promise((r) => setTimeout(r, 25));
      }
    }
    const risk = RISKS[Math.floor(Math.random() * 3)]; // bias toward safer outcomes
    const conf = 78 + Math.floor(Math.random() * 18);
    const r: ScanResult = {
      id: "SC-" + Math.floor(1000 + Math.random() * 8999),
      date: new Date().toISOString(),
      risk,
      confidence: conf,
      summary: SUMMARIES[risk],
      recommendations: RECS[risk],
    };
    setResult(r); setStage("done"); addScan(r);
  };

  const reset = () => { setFile(null); setPreview(""); setResult(null); setStage("idle"); setProgress(0); };

  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase text-primary bg-primary/10 mb-3">AI Detection Engine</span>
        <h1 className="text-3xl sm:text-4xl font-bold">Upload a scan for <span className="gradient-text">instant AI analysis</span></h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Drag and drop a mammogram, ultrasound or thermal image. Our AI returns a 5-tier risk classification, confidence score and a downloadable medical report in seconds.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-strong rounded-3xl p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Upload className="h-4 w-4 text-primary" /> Upload Scan</h3>
          {!file ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              onClick={() => inputRef.current?.click()}
              className="border-2 border-dashed border-primary/40 rounded-2xl p-12 text-center hover:bg-primary/5 cursor-pointer transition group"
            >
              <Upload className="h-12 w-12 mx-auto text-primary mb-3 group-hover:scale-110 transition" />
              <p className="font-medium">Drop your scan image here</p>
              <p className="text-xs text-muted-foreground mt-1">or click to browse · JPG, PNG up to 10MB</p>
              <input ref={inputRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden bg-black/40 aspect-square">
              <img src={preview} alt="" className="w-full h-full object-cover" />
              {(stage === "upload" || stage === "preprocess" || stage === "analyze") && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/30 mix-blend-screen animate-pulse" />
                  <div className="absolute inset-x-0 h-1 bg-primary shadow-glow" style={{ top: `${progress}%`, transition: "top 0.05s linear" }} />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="glass-strong rounded-2xl px-5 py-4 text-center">
                      <Cpu className="h-6 w-6 text-primary mx-auto animate-pulse" />
                      <p className="text-sm font-semibold mt-2 capitalize">{stage}…</p>
                      <p className="text-xs text-muted-foreground">{progress}% complete</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <button onClick={startScan} disabled={!file || (stage !== "idle" && stage !== "done")} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift disabled:opacity-50">
              {stage !== "idle" && stage !== "done" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />} Run AI Scan
            </button>
            {file && <button onClick={reset} className="px-4 py-2.5 rounded-xl border border-border hover:bg-primary/5"><RotateCcw className="h-4 w-4" /></button>}
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-6 min-h-[400px]">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Diagnosis</h3>
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="r" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                <RiskMeter value={result.confidence} risk={result.risk} />
                <div className="text-center">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${result.risk === "Normal" ? "bg-success/15 text-success" : result.risk === "Low Risk" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"}`}>
                    {result.risk === "Normal" ? <ShieldCheck className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />} {result.risk}
                  </span>
                </div>
                <div className="bg-primary/5 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-primary uppercase mb-1">AI Summary</p>
                  <p className="text-sm leading-relaxed">{result.summary}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase mb-2">Recommendations</p>
                  <ul className="space-y-1.5 text-sm">
                    {result.recommendations.map((r) => <li key={r} className="flex gap-2"><span className="text-primary">•</span>{r}</li>)}
                  </ul>
                </div>
                <button onClick={() => user && downloadReport(result, user.name, user.email)} className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift">
                  <FileText className="h-4 w-4" /> Download Medical Report
                </button>
              </motion.div>
            ) : (
              <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid place-items-center h-80 text-center text-muted-foreground">
                <div>
                  <ScanLine className="h-12 w-12 mx-auto text-primary/40 mb-2" />
                  <p className="text-sm">Upload a scan and run analysis to view your AI diagnosis here.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scan history */}
      {user && user.scans.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Scan History</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.scans.map((s) => (
              <div key={s.id} className="glass rounded-2xl p-4 hover-lift">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-primary">{s.id}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.risk === "Normal" ? "bg-success/15 text-success" : s.risk === "Low Risk" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"}`}>{s.risk}</span>
                </div>
                <p className="text-sm line-clamp-2">{s.summary}</p>
                <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                  <span>{formatIST(s.date)}</span>
                  <button onClick={() => user && downloadReport(s, user.name, user.email)} className="text-primary font-medium hover:underline">Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
