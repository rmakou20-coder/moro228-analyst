/**
 * MORO228 ANALYST — Cloudflare Worker proxy for API-Football.
 * Configure secrets in Cloudflare:
 *   API_FOOTBALL_KEY = your API-Football key (secret)
 * Optional variable:
 *   ALLOWED_ORIGIN = https://rmakou20-coder.github.io
 */
const API_BASE = "https://v3.football.api-sports.io";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "https://rmakou20-coder.github.io";
    const corsOrigin = origin === allowedOrigin ? origin : allowedOrigin;

    const headers = {
      "Access-Control-Allow-Origin": corsOrigin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=60"
    };

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "GET") return json({ error: "Méthode non autorisée." }, 405, headers);

    if (!env.API_FOOTBALL_KEY) {
      return json({ error: "La variable secrète API_FOOTBALL_KEY n'est pas configurée dans Cloudflare." }, 500, headers);
    }

    if (url.pathname !== "/fixtures") return json({ error: "Route inconnue. Utilise /fixtures?date=YYYY-MM-DD" }, 404, headers);

    const date = url.searchParams.get("date");
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return json({ error: "La date est obligatoire au format YYYY-MM-DD." }, 400, headers);
    }

    const league = url.searchParams.get("league");
    const apiUrl = new URL(`${API_BASE}/fixtures`);
    apiUrl.searchParams.set("date", date);
    if (league && /^\d+$/.test(league)) apiUrl.searchParams.set("league", league);

    try {
      const apiResponse = await fetch(apiUrl.toString(), {
        headers: { "x-apisports-key": env.API_FOOTBALL_KEY }
      });
      const payload = await apiResponse.json();
      if (!apiResponse.ok) {
        return json({ error: `API-Football a répondu HTTP ${apiResponse.status}`, details: payload.errors || payload.message || null }, apiResponse.status, headers);
      }
      if (payload.errors && Object.keys(payload.errors).length) {
        return json({ error: "API-Football a retourné une erreur.", details: payload.errors }, 502, headers);
      }
      return json(payload, 200, headers);
    } catch (error) {
      return json({ error: "Impossible de joindre API-Football.", details: String(error) }, 502, headers);
    }
  }
};

function json(data, status, headers) {
  return new Response(JSON.stringify(data), { status, headers });
}
