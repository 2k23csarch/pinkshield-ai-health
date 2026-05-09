export function getGreeting(): string {
  try {
    const istHour = parseInt(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false }),
      10
    );
    if (istHour < 12) return "Good Morning";
    if (istHour < 17) return "Good Afternoon";
    if (istHour < 21) return "Good Evening";
    return "Good Night";
  } catch {
    return "Hello";
  }
}

export function formatIST(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
}
