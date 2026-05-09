import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { User as UserIcon, Settings, LogOut, FileText, ChevronDown, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function AvatarMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user) return null;
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-primary/10 transition group"
      >
        <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-soft">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">{initials}</div>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-72 glass-strong rounded-2xl border border-border/60 shadow-glow overflow-hidden z-50"
          >
            <div className="p-4 border-b border-border/60 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-primary/40">
                {user.avatar ? <img src={user.avatar} className="h-full w-full object-cover" /> : <div className="h-full w-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">{initials}</div>}
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-success font-medium"><ShieldCheck className="h-3 w-3" /> Verified Account</span>
              </div>
            </div>
            <div className="p-2">
              {[
                { to: "/profile", label: "My Profile", icon: UserIcon },
                { to: "/reports", label: "My Reports", icon: FileText },
                { to: "/settings", label: "Settings", icon: Settings },
              ].map((item) => (
                <button
                  key={item.to}
                  onClick={() => { setOpen(false); navigate({ to: item.to }); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-primary/10 transition text-left"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => { logout(); setOpen(false); navigate({ to: "/login" }); }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-destructive/10 text-destructive transition text-left mt-1 border-t border-border/40 pt-3"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
