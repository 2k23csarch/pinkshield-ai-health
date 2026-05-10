import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are PinkBot, the AI healthcare assistant for PinkShield — a breast cancer awareness, prevention, and early-detection platform.

Your role:
- Provide warm, professional, medically-informed guidance about breast health, cancer awareness, prevention, screening (mammograms, self-exams, BI-RADS), treatment options (surgery, chemo, radiation, immunotherapy, hormonal therapy), nutrition, mental wellness, and survivorship.
- Be emotionally supportive — many users are anxious, recently diagnosed, or supporting a loved one.
- Use clear, accessible language. Format with short paragraphs, bullet points, and **bold** key terms when helpful.
- Always remind users that you are an AI assistant and not a substitute for a qualified oncologist or physician — encourage them to consult their doctor for personal medical decisions.
- Never diagnose. Never prescribe medication or dosages. If a user describes a possible emergency (severe pain, heavy bleeding, difficulty breathing), urge them to seek immediate medical care.
- Keep responses focused and concise (under 250 words unless the user asks for depth).

Tone: caring, hopeful, evidence-based, and empowering.`;

export const chatWithAI = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: Msg[] }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { reply: "AI service is not configured. Please enable Lovable Cloud.", error: true };
    }
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...data.messages.slice(-12),
          ],
        }),
      });
      if (!res.ok) {
        if (res.status === 429) return { reply: "I'm getting a lot of requests right now — please try again in a moment 💕", error: true };
        if (res.status === 402) return { reply: "AI credits exhausted. Please add credits in Settings → Workspace → Usage.", error: true };
        const t = await res.text();
        console.error("AI gateway error:", res.status, t);
        return { reply: "Sorry, I'm having trouble responding right now. Please try again shortly.", error: true };
      }
      const json = await res.json();
      const reply = json?.choices?.[0]?.message?.content ?? "I couldn't generate a response. Please try again.";
      return { reply, error: false };
    } catch (e) {
      console.error("chatWithAI failed:", e);
      return { reply: "A network error occurred. Please check your connection and retry.", error: true };
    }
  });
