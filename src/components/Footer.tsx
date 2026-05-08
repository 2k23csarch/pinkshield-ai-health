import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, Heart } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 glass">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="PinkShield" className="h-9 w-9" />
            <span className="text-lg font-bold gradient-text">PinkShield</span>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-powered breast cancer awareness & early detection platform. Empowering millions with knowledge, screening tools, and a global support community.
          </p>
          <div className="flex gap-3 mt-4">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="p-2 rounded-full glass hover:bg-primary/10 transition">
                <Icon className="h-4 w-4 text-primary" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about-cancer" className="hover:text-primary">About Cancer</Link></li>
            <li><Link to="/prevention" className="hover:text-primary">Prevention & Diet</Link></li>
            <li><Link to="/treatment" className="hover:text-primary">Treatment</Link></li>
            <li><Link to="/ai-detection" className="hover:text-primary">AI Scan</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Emergency & Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> Helpline: 1800-PINK-911</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> care@pinkshield.health</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Global · Available 24/7</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">Get monthly awareness updates and survivor stories.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input type="email" required placeholder="you@email.com" className="flex-1 px-3 py-2 rounded-lg bg-input/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium shadow-soft">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-center items-center">
        <span>© {new Date().getFullYear()} PinkShield. All rights reserved.</span>
        <span className="hidden sm:inline">·</span>
        <span className="flex items-center gap-1">Built with <Heart className="h-3 w-3 text-primary fill-primary" /> for breast cancer awareness</span>
      </div>
    </footer>
  );
}
