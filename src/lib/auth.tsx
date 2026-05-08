import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = { name: string; email: string };
type AuthCtx = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("pinkshield_user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem("pinkshield_user", JSON.stringify(u));
      else localStorage.removeItem("pinkshield_user");
    }
  };

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 700));
    const name = email.split("@")[0].replace(/[._-]/g, " ");
    persist({ name: name.charAt(0).toUpperCase() + name.slice(1), email });
  };

  const signup = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    persist({ name, email });
  };

  const logout = () => persist(null);

  return <Ctx.Provider value={{ user, login, signup, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
