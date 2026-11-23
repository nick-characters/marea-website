import { emailBrand as b } from "@/lib/brand";
import { site } from "@/data/site";
import type { BrochureLead } from "@/lib/schema";

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );

function shell(inner: string) {
  return `<!doctype html><html><body style="margin:0;background:${b.sand};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${b.sand};"><tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${b.cream};">
<tr><td style="background:${b.burgundy};padding:32px 40px;color:${b.sand};font-family:${b.display};font-size:28px;letter-spacing:2px;">MAREA<div style="font-family:${b.body};font-size:11px;letter-spacing:3px;margin-top:6px;">BATEMANS BAY</div></td></tr>
<tr><td style="padding:40px;font-family:${b.body};font-size:15px;line-height:1.6;color:${b.inkSoft};">${inner}</td></tr>
<tr><td style="padding:24px 40px;background:${b.burgundy};font-family:${b.body};font-size:11px;line-height:1.5;color:${b.sand};">${esc(site.address.short)}<br>${esc(site.disclaimer)}</td></tr>
</table></td></tr></table></body></html>`;
}

export function leadNotification(lead: BrochureLead, meta: { page: string; submittedAt: string }) {
  const rows: [string, string][] = [
    ["Name", `${lead.firstName} ${lead.surname}`],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Postcode", lead.postcode],
    ["Buyer type", lead.buyerType],
    ["Heard via", lead.referral],
    ["Page", meta.page],
    ["Submitted", meta.submittedAt],
  ];
  const table = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${b.muted};vertical-align:top;">${k}</td><td style="padding:8px 0;color:${b.ink};">${esc(v)}</td></tr>`,
    )
    .join("");
  return {
    subject: `New Marea brochure request: ${lead.firstName} ${lead.surname}`,
    html: shell(
      `<p style="font-family:${b.display};font-size:22px;color:${b.burgundy};margin:0 0 24px;">NEW BROCHURE REQUEST</p><table role="presentation" cellpadding="0" cellspacing="0">${table}</table>`,
    ),
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
  };
}

export function buyerAutoReply(lead: BrochureLead, brochureUrl: string) {
  const agents = site.agents.map((a) => `${a.name} ${a.phone}`).join(" · ");
  return {
    subject: "Your Marea brochure",
    html: shell(`<p style="font-family:${b.display};font-size:22px;color:${b.burgundy};margin:0 0 24px;">THANK YOU, ${esc(lead.firstName.toUpperCase())}</p>
<p style="margin:0 0 16px;">Thank you for your interest in Marea, a collection of six custom four-bedroom residences on the waterfront at Batemans Bay.</p>
<p style="margin:0 0 32px;">You can view the brochure at the link below. One of our agents from The Property Collective will be in touch shortly.</p>
<a href="${esc(brochureUrl)}" style="display:inline-block;background:${b.burgundy};color:${b.sand};text-decoration:none;font-family:${b.display};font-size:15px;letter-spacing:1px;padding:16px 40px;border-top-left-radius:100px;border-bottom-right-radius:100px;">VIEW BROCHURE</a>
<p style="margin:32px 0 0;font-size:13px;color:${b.muted};">${esc(agents)}</p>`),
    text: `Thank you for your interest in Marea.\n\nView the brochure: ${brochureUrl}\n\nOne of our agents will be in touch shortly.\n${agents}`,
  };
}
