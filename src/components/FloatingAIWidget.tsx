import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { Bot, Send, Sparkles, X, Loader2, Trash2 } from "lucide-react";
import { chatWithAI } from "@/lib/ai-chat.functions";

type Msg = { role: "user" | "assistant"; content: string; ts: number };

const STORAGE_KEY = "pinkshield_ai_chat_v1";

const SUGGESTIONS = [
  "What are early signs of breast cancer?",
  "How do I do a self-examination?",
  "What foods help reduce risk?",
  "I'm scared about my upcoming mammogram.",
];

export function FloatingAIWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chat = useServerFn(chatWithAI);

  // Hydrate
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMsgs(JSON.parse(raw));
      else setMsgs([{ role: "assistant", content: "Hi, I'm **PinkBot** 💖 — your AI healthcare companion. Ask me anything about breast health, prevention, screening, treatment, or wellness.", ts: Date.now() }]);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)); } catch {}
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }));
  }, [msgs, loading]);

  const send = async (override?: string) => {
    const content = (override ?? text).trim();
    if (!content || loading) return;
    const userMsg: Msg = { role: "user", content, ts: Date.now() };
    setMsgs((m) => [...m, userMsg]);
    setText("");
    setLoading(true);
    try {
      const history = [...msgs, userMsg].map(({ role, content }) => ({ role, content }));
      const res = await chat({ data: { messages: history } });
      setMsgs((m) => [...m, { role: "assistant", content: res.reply, ts: Date.now() }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", content: "I couldn't reach the AI service. Please try again.", ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMsgs([{ role: "assistant", content: "Chat cleared. How can I help you today? 💖", ts: Date.now() }]);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] h-16 w-16 rounded-full gradient-primary shadow-glow grid place-items-center text-primary-foreground"
        aria-label="Open AI Assistant"
      >
        <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-60" />
        <span className="relative">
          {open ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 22 }}
            className="fixed bottom-28 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[calc(100vh-9rem)] glass-strong rounded-3xl shadow-glow flex flex-col overflow-hidden border border-primary/20"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/60 flex items-center gap-3 bg-gradient-to-r from-primary/15 to-transparent">
              <div className="relative h-10 w-10 rounded-full gradient-primary grid place-items-center text-primary-foreground">
                <Sparkles className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-background" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">PinkBot AI Assistant</p>
                <p className="text-[11px] text-success flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Online · Healthcare AI
                </p>
              </div>
              <button onClick={clear} title="Clear chat" className="h-8 w-8 grid place-items-center rounded-lg hover:bg-muted/50 text-muted-foreground"><Trash2 className="h-4 w-4" /></button>
              <button onClick={() => setOpen(false)} className="h-8 w-8 grid place-items-center rounded-lg hover:bg-muted/50"><X className="h-4 w-4" /></button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`h-7 w-7 rounded-full grid place-items-center flex-shrink-0 text-xs ${m.role === "user" ? "bg-primary/20 text-primary" : "gradient-primary text-primary-foreground"}`}>
                    {m.role === "user" ? "You" : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "gradient-primary text-primary-foreground rounded-br-sm" : "glass border border-border/60 rounded-bl-sm"}`}>
                    {renderMarkdownLite(m.content)}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="h-7 w-7 rounded-full gradient-primary grid place-items-center text-primary-foreground"><Bot className="h-3.5 w-3.5" /></div>
                  <div className="glass border border-border/60 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggestions */}
            {msgs.length <= 1 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] px-2.5 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition border border-primary/20"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border/60 flex gap-2 bg-background/50">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask about breast health, screening, support…"
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-input/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
              <button
                onClick={() => send()}
                disabled={loading || !text.trim()}
                className="px-4 rounded-xl gradient-primary text-primary-foreground shadow-soft hover-lift disabled:opacity-50 grid place-items-center"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground pb-2">PinkBot is an AI assistant — not a substitute for medical advice.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Lightweight markdown: **bold** and bullet lines
function renderMarkdownLite(text: string) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const bullet = line.match(/^\s*[-*]\s+(.*)/);
        const content = bullet ? bullet[1] : line;
        const parts = content.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? <strong key={j}>{p.slice(2, -2)}</strong> : <span key={j}>{p}</span>
        );
        return (
          <div key={i} className={bullet ? "flex gap-2 pl-1" : ""}>
            {bullet && <span className="text-primary mt-1">•</span>}
            <span>{parts}</span>
          </div>
        );
      })}
    </>
  );
}
