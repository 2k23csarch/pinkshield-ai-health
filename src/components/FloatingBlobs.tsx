export function FloatingBlobs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)", animation: "blob 20s ease-in-out infinite" }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--primary-glow), transparent 70%)", animation: "blob 24s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)", animation: "blob 28s ease-in-out infinite" }}
      />
    </div>
  );
}
