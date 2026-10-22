// Cloudflare Worker relay: phone -> this worker -> Cursor webhook. Secrets: GYMBO_WEBHOOK_URL, GYMBO_WEBHOOK_TOKEN
const ORIGIN = "https://daviddfm.github.io";
const cors = { "Access-Control-Allow-Origin": ORIGIN, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (req.method !== "POST") return new Response("gymbo relay ok", { headers: cors });
    const body = await req.text();
    if (body.length > 20000) return new Response("too big", { status: 413, headers: cors });
    const r = await fetch(env.GYMBO_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + env.GYMBO_WEBHOOK_TOKEN }, body });
    return new Response(JSON.stringify({ ok: r.ok, status: r.status }), { status: r.ok ? 200 : 502, headers: { ...cors, "Content-Type": "application/json" } });
  }
};
