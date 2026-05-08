import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Moon, Sun, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about-cancer", label: "About Cancer" },
  { to: "/prevention", label: "Prevention" },
  { to: "/treatment", label: "Treatment" },
  { to: "/ai-detection", label: "AI Scan" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-border/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 hover-lift">
          <img src={logo} alt="PinkShield" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold gradient-text hidden sm:inline">PinkShield</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary bg-primary/10" }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded-lg hover:bg-primary/10 transition">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold shadow-soft">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button onClick={() => { logout(); navigate({ to: "/" }); }} className="p-2 rounded-lg hover:bg-primary/10" aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition">Login</Link>
              <Link to="/signup" className="px-4 py-2 rounded-lg text-sm font-semibold gradient-primary text-primary-foreground shadow-glow hover-lift">
                Get Started
              </Link>
            </div>
          )}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-primary/10" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 px-4 py-3 space-y-1 animate-fade-in">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm hover:bg-primary/10">
              {l.label}
            </Link>
          ))}
          {!user && (
            <div className="flex gap-2 pt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 rounded-lg border border-border">Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 rounded-lg gradient-primary text-primary-foreground">Sign up</Link>
            </div>
          )}
          <div className="flex items-center gap-2 pt-2">
            <Shield className="h-4 w-4 text-primary" /> <span className="text-xs text-muted-foreground">PinkShield · Awareness Saves Lives</span>
          </div>
        </div>
      )}
    </header>
  );
}
