import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Activity, FileText, Stethoscope, Calendar,
  Shield, Pill, Apple, Users, Megaphone, Heart, FlaskConical,
  HelpCircle, AlertTriangle, User, Settings, ChevronLeft, MessageCircle,
} from "lucide-react";

const ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/ai-detection", label: "AI Scan", icon: Activity },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/appointments", label: "Appointments", icon: Calendar },
  { to: "/prevention", label: "Prevention", icon: Shield },
  { to: "/treatment", label: "Treatments", icon: Pill },
  { to: "/diet", label: "Diet & Nutrition", icon: Apple },
  { to: "/health-tracker", label: "Health Tracker", icon: Heart },
  { to: "/community", label: "Community", icon: Users },
  { to: "/awareness", label: "Awareness", icon: Megaphone },
  { to: "/survivor-stories", label: "Survivor Stories", icon: Heart },
  { to: "/research", label: "Research", icon: FlaskConical },
  { to: "/live-support", label: "Live Support", icon: MessageCircle },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/emergency", label: "Emergency", icon: AlertTriangle },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={`hidden lg:flex flex-col sticky top-[60px] self-start h-[calc(100vh-60px)] glass-strong border-r border-border/60 transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}
    >
      <div className="flex items-center justify-end p-2 border-b border-border/40">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-primary/10 transition"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {ITEMS.map((item) => {
          const active = path === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition relative ${
                active
                  ? "bg-primary/15 text-primary shadow-soft"
                  : "text-foreground/75 hover:bg-primary/8 hover:text-primary"
              }`}
              title={collapsed ? item.label : undefined}
            >
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full gradient-primary" />}
              <Icon className={`h-4 w-4 flex-shrink-0 ${active ? "drop-shadow-[0_0_6px_var(--primary)]" : ""}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
