import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
const Ctx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = (localStorage.getItem("pinkshield_theme") as Theme) || "light";
    setTheme(saved);
  }, []);
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (typeof window !== "undefined") localStorage.setItem("pinkshield_theme", theme);
  }, [theme]);
  return <Ctx.Provider value={{ theme, toggle: () => setTheme(theme === "light" ? "dark" : "light") }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
