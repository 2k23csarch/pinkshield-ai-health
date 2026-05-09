import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User as UserIcon, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/live-support")({
  head: () => ({ meta: [{ title: "Live Support — PinkShield" }] }),
  component: LiveSupport,
});

const REPLIES = [
  "Thank you for sharing. Let me check that for you — could you describe the symptom in a bit more detail?",
  "I understand. Based on what you've described, I'd recommend booking an appointment with one of our oncologists. Would you like me to find available slots?",
  "That's a great question. Self-exams should be done monthly, ideally a few days after your menstrual cycle ends. Look for lumps, dimpling, nipple discharge or skin changes.",
  "You're not alone in feeling this way. Many of our community members felt anxious after their first scan. I can connect you with our mental wellness team if that helps.",
  "Absolutely — your reports are private and encrypted. Only you and the doctors you grant access to can see them.",
];

function LiveSupport() {
  const [msgs, setMsgs] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Hello! I'm PinkBot, your AI healthcare assistant. How can I support you today?" },
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { ref.current?.scrollTo(0, ref.current.scrollHeight); }, [msgs, typing]);

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setText(""); setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: REPLIES[Math.floor(Math.random() * REPLIES.length)] }]);
    }, 1200);
  };

  return (
    <div className="px-4 sm:px-8 py-10 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold">Live <span className="gradient-text">Support</span></h1>
        <p className="text-muted-foreground mt-2">24/7 instant help from our AI assistant — and human counsellors when you need one.</p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        <div className="glass-strong rounded-3xl flex flex-col h-[600px]">
          <div className="p-4 border-b border-border/60 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full gradient-primary grid place-items-center text-primary-foreground"><Bot className="h-5 w-5" /></div>
            <div className="flex-1">
              <p className="font-semibold">PinkBot Assistant</p>
              <p className="text-xs text-success flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success animate-pulse" /> Online</p>
            </div>
          </div>
          <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`h-8 w-8 rounded-full grid place-items-center flex-shrink-0 ${m.from === "user" ? "bg-primary/20" : "gradient-primary text-primary-foreground"}`}>
                  {m.from === "user" ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${m.from === "user" ? "gradient-primary text-primary-foreground" : "glass border border-border"}`}>{m.text}</div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full gradient-primary grid place-items-center text-primary-foreground"><Bot className="h-4 w-4" /></div>
                <div className="glass border border-border px-4 py-3 rounded-2xl flex gap-1">
                  {[0,1,2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-border/60 flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type your message…" className="flex-1 px-4 py-2.5 rounded-xl bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <button onClick={send} className="px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground shadow-soft hover-lift"><Send className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-strong rounded-2xl p-5">
            <h3 className="font-semibold flex items-center gap-2"><MessageCircle className="h-4 w-4 text-primary" /> Connect Live</h3>
            <ul className="mt-3 space-y-3 text-sm">
              {[["Medical Questions", true], ["Mental Wellness", true], ["Insurance Help", false], ["Survivor Support", true]].map(([n, on]) => (
                <li key={n as string} className="flex items-center justify-between"><span>{n}</span><span className={`text-xs px-2 py-0.5 rounded-full ${on ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{on ? "Online" : "Offline"}</span></li>
              ))}
            </ul>
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <h3 className="font-semibold">Open a ticket</h3>
            <p className="text-xs text-muted-foreground mt-1">Need detailed help? Our team replies within 4 hours.</p>
            <button className="mt-3 w-full px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-soft">New Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
}
