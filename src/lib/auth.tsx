import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ScanResult = {
  id: string;
  date: string;
  risk: "Normal" | "Low Risk" | "Medium Risk" | "High Risk" | "Critical";
  confidence: number;
  summary: string;
  recommendations: string[];
};

export type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  mode: "In-person" | "Video";
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: string;
  diagnoses?: string;
  avatar?: string; // dataURL
  scans: ScanResult[];
  appointments: Appointment[];
  reports: ScanResult[];
  createdAt: string;
};

type AuthCtx = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: Partial<User> & { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  addScan: (scan: ScanResult) => void;
  addAppointment: (appt: Appointment) => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "pinkshield_user_v2";

const seedScans = (): ScanResult[] => [
  { id: "SC-1042", date: new Date(Date.now() - 86400000 * 12).toISOString(), risk: "Normal", confidence: 96, summary: "No abnormal tissue patterns detected. Continue routine self-examination monthly.", recommendations: ["Monthly self-exam", "Annual mammogram after 40", "Maintain healthy lifestyle"] },
  { id: "SC-1086", date: new Date(Date.now() - 86400000 * 5).toISOString(), risk: "Low Risk", confidence: 88, summary: "Minor benign density observed. Follow-up imaging recommended in 6 months.", recommendations: ["Follow-up ultrasound in 6 months", "Discuss with oncologist", "Track any changes"] },
];

const seedAppointments = (): Appointment[] => [
  { id: "AP-001", doctor: "Dr. Aanya Mehta", specialty: "Oncologist", date: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10), time: "10:30 AM", mode: "Video" },
  { id: "AP-002", doctor: "Dr. Rohan Kapoor", specialty: "Radiologist", date: new Date(Date.now() + 86400000 * 9).toISOString().slice(0, 10), time: "4:00 PM", mode: "In-person" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
    setHydrated(true);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(KEY, JSON.stringify(u));
      else localStorage.removeItem(KEY);
    }
  };

  const login: AuthCtx["login"] = async (email) => {
    await new Promise((r) => setTimeout(r, 600));
    const name = email.split("@")[0].replace(/[._-]/g, " ");
    const existing = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    const prev = existing ? (JSON.parse(existing) as User) : null;
    const u: User = prev && prev.email === email ? prev : {
      id: "U-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      scans: seedScans(),
      reports: seedScans(),
      appointments: seedAppointments(),
      createdAt: new Date().toISOString(),
    };
    persist(u);
  };

  const signup: AuthCtx["signup"] = async (data) => {
    await new Promise((r) => setTimeout(r, 700));
    const u: User = {
      id: "U-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      address: data.address,
      scans: seedScans(),
      reports: seedScans(),
      appointments: seedAppointments(),
      createdAt: new Date().toISOString(),
    };
    persist(u);
  };

  const logout = () => persist(null);

  const updateUser = (patch: Partial<User>) => {
    if (!user) return;
    persist({ ...user, ...patch });
  };

  const addScan = (scan: ScanResult) => {
    if (!user) return;
    persist({ ...user, scans: [scan, ...user.scans], reports: [scan, ...user.reports] });
  };

  const addAppointment = (appt: Appointment) => {
    if (!user) return;
    persist({ ...user, appointments: [appt, ...user.appointments] });
  };

  return (
    <Ctx.Provider value={{ user, isAuthenticated: !!user && hydrated, login, signup, logout, updateUser, addScan, addAppointment }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
