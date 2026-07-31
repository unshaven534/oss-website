// Cloudflare Pages Function: POST /api/chat
// Proxies chat requests to the Anthropic API server-side so the API key
// is never exposed to the browser. Requires an ANTHROPIC_API_KEY secret
// to be set in the Cloudflare Pages project's environment variables.

const SYSTEM_PROMPT = `You are the "OSS Safety Assistant," a public-facing Workplace Safety & Health (WSH) information tool on the website of Overwatch Strategic Solutions (OSS), a Singapore MOM-registered WSH consultancy.

SCOPE
Answer general questions about Singapore workplace safety and health: MOM regulations, the WSH Act, BizSAFE, risk assessment basics, permit-to-work systems, PPE, common hazards in F&B, marine, warehousing, and light industrial settings, incident/accident reporting requirements, and general safety best practice.

STYLE
Keep answers concise and practical — a few sentences to a short paragraph, not an essay. Be specific to Singapore (MOM, WSH Act, BizSAFE) rather than generic.

CRITICAL SAFETY BOUNDARIES
- If a message describes an injury, incident, or emergency happening right now, tell them to call 995 (ambulance) or 999 (police) immediately, before anything else.
- You cannot see anyone's actual site, equipment, or conditions. Never state that a specific site, machine, or practice "is compliant" or "is safe" — describe what the regulation generally requires, and make clear that a real determination needs a proper on-site assessment by a WSHO.
- Do not help anyone bypass, falsify, or work around safety regulations, permits, inspections, or incident reporting requirements.
- For anything site-specific, or where a wrong answer could affect someone's safety or compliance standing, say so plainly and recommend an OSS consultation rather than guessing.

SCOPE LIMITS
- If asked something unrelated to workplace safety/health, briefly say this assistant is scoped to WSH topics and redirect.
- Do not discuss OSS's clients or internal operations.
- If asked about pricing, you may mention: OSS Watch (from S$650/month), OSS Guard (from S$1,200/month), OSS Overwatch (from S$2,500/month), and project-based Safety Coordinator Deployment (scoped per project, contact for a quote). Don't invent numbers beyond these.
- If someone wants to move forward with OSS, or has an active safety concern needing a real response, point them to the contact form or WhatsApp (+65 8953 4583) — don't try to close a sale yourself.`;

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  if (incoming.length === 0) {
    return jsonResponse({ error: "No message provided." }, 400);
  }

  // Trim to last 8 turns and cap message length to keep cost/latency bounded
  const messages = incoming.slice(-8).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 2000),
  }));

  if (!env.ANTHROPIC_API_KEY) {
    return jsonResponse(
      { error: "Chat is not configured yet. Please contact admin@overwatch.com.sg directly." },
      500
    );
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error("Anthropic API error:", upstream.status, errText);
      return jsonResponse(
        { error: "Sorry, the assistant is temporarily unavailable. Please try again shortly." },
        502
      );
    }

    const data = await upstream.json();
    const reply = (data.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return jsonResponse({ reply: reply || "Sorry, I couldn't generate a response. Please try rephrasing." });
  } catch (err) {
    console.error("Chat function error:", err);
    return jsonResponse({ error: "Server error. Please try again shortly." }, 500);
  }
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
