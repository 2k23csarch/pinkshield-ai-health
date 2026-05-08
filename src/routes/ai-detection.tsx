import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, ScanLine, ShieldCheck, AlertTriangle, FileText, RotateCcw } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";

export const Route = createFileRoute("/ai-detection")({
  head: () => ({
    meta: [
      { title: "AI Detection Demo — PinkShield" },
      { name: "description", content: "Demo AI scan: upload an image and view a simulated breast cancer risk assessment." },
    ],
  }),
  component: AIDetection,
});

type Result = {
  level: "Normal" | "Low Risk" | "Medium Risk" | "High Risk";
  confidence: number;
  notes: string;
  color: string;
};

function generateResult(): Result {
  const levels: Result[] = [
    { level: "Normal", confidence: 95 + Math.random() * 4, notes: "No suspicious tissue patterns detected. Continue routine annual screening as recommended for your age group.", color: "text-success" },
    { level: "Low Risk", confidence: 82 + Math.random() * 8, notes: "Minor density variations observed but no concerning features. A follow-up in 6–12 months is advised.", color: "text-success" },
    { level: "Medium Risk", confidence: 76 + Math.random() * 10, notes: "Some patterns warrant clinical correlation. We recommend an in-person consultation with a breast specialist within 2–4 weeks.", color: "text-warning" },
    { level: "High Risk", confidence: 88 + Math.random() * 8, notes: "Significant abnormality patterns detected. Immediate consultation with an oncologist and diagnostic mammography is strongly advised.", color: "text-destructive" },
  ];
  return levels[Math.floor(Math.random() * levels.length)];
}

function AIDetection() {
  const [preview, setPreview] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [result, setResult] = useState<Result | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setPhase("idle");
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const startScan = () => {
    if (!preview) return;
    setPhase("scanning");
    setResult(null);
    setTimeout(() => {
      setResult(generateResult());
      setPhase("done");
    }, 3500);
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    setPhase("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Section>
      <SectionHeader eyebrow="AI Scan · Demo" title="AI-Powered Detection" description="Upload a breast scan image to see our AI in action. This is a demonstration interface — results are simulated and not clinical advice." />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload + scan */}
        <div className="glass-strong rounded-3xl p-7">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Upload className="h-5 w-5 text-primary" /> Upload Image</h3>

          {!preview ? (
            <label
              htmlFor="file"
              className="block border-2 border-dashed border-primary/40 rounded-2xl p-12 text-center cursor-pointer hover:bg-primary/5 transition"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
            >
              <Upload className="h-10 w-10 mx-auto text-primary mb-3" />
              <p className="font-medium mb-1">Drop or click to upload a scan</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 10 MB</p>
              <input ref={inputRef} id="file" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </label>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-border">
              <img src={preview} alt="scan preview" className="w-full h-72 object-cover" />
              {phase === "scanning" && (
                <>
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                  <div className="absolute left-0 right-0 h-24 scan-line" style={{ animation: "scan 2.5s ease-in-out infinite" }} />
                  <div className="absolute inset-0 grid place-items-center bg-background/40 backdrop-blur-sm">
                    <div className="text-center">
                      <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-3" />
                      <p className="font-semibold">Analyzing tissue patterns…</p>
                      <p className="text-xs text-muted-foreground mt-1">Running AI inference on 14 layers</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-5">
            <button
              onClick={startScan}
              disabled={!preview || phase === "scanning"}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              <ScanLine className="h-4 w-4" /> {phase === "scanning" ? "Scanning…" : "Run AI Scan"}
            </button>
            {preview && (
              <button onClick={reset} className="px-4 py-3 rounded-xl glass-strong hover-lift" aria-label="reset">
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Result */}
        <div className="glass-strong rounded-3xl p-7 min-h-[28rem] flex flex-col">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Diagnostic Report</h3>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 grid place-items-center text-center">
                <div>
                  <div className="h-20 w-20 mx-auto rounded-full glass flex items-center justify-center mb-4">
                    <ShieldCheck className="h-10 w-10 text-primary/60" />
                  </div>
                  <p className="text-muted-foreground text-sm">Upload a scan and run the AI analysis to view your simulated risk report.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex-1">
                <div className="rounded-2xl p-6 bg-primary/5 border border-primary/15 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Prediction</span>
                    {result.level === "High Risk" || result.level === "Medium Risk" ? <AlertTriangle className={`h-5 w-5 ${result.color}`} /> : <ShieldCheck className={`h-5 w-5 ${result.color}`} />}
                  </div>
                  <div className={`text-3xl font-bold ${result.color}`}>{result.level}</div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1"><span>AI confidence</span><span className="font-semibold">{result.confidence.toFixed(1)}%</span></div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${result.confidence}%` }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full gradient-primary" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-xs uppercase text-muted-foreground tracking-wide mb-1">Clinical Notes</div>
                    <p className="text-muted-foreground leading-relaxed">{result.notes}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <div className="rounded-xl glass p-3">
                      <div className="text-xs text-muted-foreground">Tissue density</div>
                      <div className="font-semibold">{(35 + Math.random() * 50).toFixed(1)}%</div>
                    </div>
                    <div className="rounded-xl glass p-3">
                      <div className="text-xs text-muted-foreground">Anomaly markers</div>
                      <div className="font-semibold">{Math.floor(Math.random() * 9)}</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground/80 pt-4 border-t border-border/60">
                    ⚕️ This is a simulated demonstration. Always consult a qualified medical professional for any health concerns.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
