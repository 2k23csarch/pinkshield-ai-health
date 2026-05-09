import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Calendar, FileText, Megaphone, Sparkles, AlertTriangle } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/mock-data";

const ICONS = {
  appointment: Calendar,
  report: FileText,
  campaign: Megaphone,
  tip: Sparkles,
  alert: AlertTriangle,
} as const;

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);
  const unread = items.filter((i) => i.unread).length;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        className="relative p-2 rounded-lg hover:bg-primary/10 transition"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-pulse">{unread}</span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 glass-strong rounded-2xl border border-border/60 shadow-glow overflow-hidden z-50"
          >
            <div className="p-4 border-b border-border/60 flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <button onClick={() => setItems(items.map((i) => ({ ...i, unread: false })))} className="text-xs text-primary hover:underline">Mark all read</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {items.map((n) => {
                const Icon = ICONS[n.type];
                return (
                  <div key={n.id} className={`flex gap-3 p-3 border-b border-border/40 hover:bg-primary/5 transition ${n.unread ? "bg-primary/5" : ""}`}>
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{n.body}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                    </div>
                    {n.unread && <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />}
                  </div>
                );
              })}
            </div>
            <div className="p-3 text-center border-t border-border/60">
              <button className="text-xs text-primary font-medium hover:underline">View all notifications</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
