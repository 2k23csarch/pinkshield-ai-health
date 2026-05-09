import { useState } from "react";

export function OtpInput({ length = 6, onChange }: { length?: number; onChange?: (v: string) => void }) {
  const [vals, setVals] = useState<string[]>(Array(length).fill(""));

  const setAt = (i: number, v: string) => {
    if (v && !/^\d$/.test(v)) return;
    const n = [...vals];
    n[i] = v;
    setVals(n);
    onChange?.(n.join(""));
    if (v && i < length - 1) {
      const nxt = document.getElementById(`otp-${i + 1}`);
      nxt?.focus();
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {vals.map((v, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={(e) => setAt(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !vals[i] && i > 0) document.getElementById(`otp-${i - 1}`)?.focus();
          }}
          className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl bg-input/40 border-2 border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
        />
      ))}
    </div>
  );
}
