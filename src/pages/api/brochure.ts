import type { APIRoute } from "astro";
import {
  BROCHURE_URL,
  LEAD_RECIPIENTS,
  RESEND_API_KEY,
  RESEND_FROM,
  TURNSTILE_SECRET_KEY,
} from "astro:env/server";
import { Resend } from "resend";
import { buyerAutoReply, leadNotification } from "@/lib/email";
import { brochureSchema } from "@/lib/schema";

export const prerender = false;

/* Basic per-isolate rate limit (5 requests / 10 min / IP). Add a Cloudflare WAF rate-limit
   rule on /api/brochure in production for a global limit. */
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function verifyTurnstile(token: string, ip: string) {
  if (!TURNSTILE_SECRET_KEY) {
    console.warn("[brochure] TURNSTILE_SECRET_KEY not set; skipping bot verification");
    return true;
  }
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const wantsJson = request.headers.get("accept")?.includes("application/json");
  const referer = request.headers.get("referer") ?? "/";
  const reply = (status: number, body: Record<string, unknown>, redirect: string) =>
    wantsJson
      ? Response.json(body, { status })
      : new Response(null, { status: 303, headers: { Location: redirect } });
  const fail = (status: number, errors?: Record<string, string>) =>
    reply(status, { ok: false, errors }, `${referer.split("#")[0]}#brochure`);
  const success = () => reply(200, { ok: true }, "/thank-you");

  const ip = request.headers.get("cf-connecting-ip") ?? clientAddress ?? "unknown";
  if (limited(ip)) return fail(429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400);
  }

  // Honeypot: pretend success so bots learn nothing.
  if (String(form.get("company") ?? "").trim()) return success();

  const parsed = brochureSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      errors[key] ??= issue.message;
    }
    return fail(422, errors);
  }

  const token = String(form.get("cf-turnstile-response") ?? "");
  if (!(await verifyTurnstile(token, ip))) return fail(403);

  const lead = parsed.data;
  const page = (() => {
    try {
      return new URL(referer).pathname;
    } catch {
      return "unknown";
    }
  })();
  const submittedAt = new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

  if (!RESEND_API_KEY) {
    console.info("[brochure] RESEND_API_KEY not set; lead not emailed:", { ...lead, page, submittedAt });
    return success();
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const notify = leadNotification(lead, { page, submittedAt });
    const auto = buyerAutoReply(lead, BROCHURE_URL);
    const recipients = LEAD_RECIPIENTS.split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const [n, a] = await Promise.all([
      resend.emails.send({ from: RESEND_FROM, to: recipients, replyTo: lead.email, ...notify }),
      resend.emails.send({ from: RESEND_FROM, to: lead.email, ...auto }),
    ]);
    if (n.error) throw n.error;
    if (a.error) console.error("[brochure] auto-reply failed", a.error);
    return success();
  } catch (err) {
    console.error("[brochure] send failed", err);
    return fail(502);
  }
};
