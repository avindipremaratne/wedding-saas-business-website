import "server-only";
import { brand } from "@/lib/brand";
import { DESIGN_CHOICES, type EnquiryInput } from "@/lib/enquiry";

// New-enquiry email to the business owner through Resend's HTTP API. Reply-to
// is the couple, so answering the email answers them. Returns whether it was
// sent; never throws.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function sendEnquiryNotification(enquiry: EnquiryInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.info("[email] Enquiry email skipped: RESEND_API_KEY, ENQUIRY_FROM_EMAIL or ENQUIRY_TO_EMAIL is not set.");
    return false;
  }

  const rows: [string, string][] = [
    ["Names", enquiry.names],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "—"],
    ["Wedding date", enquiry.weddingDate || "—"],
    ["Design", DESIGN_CHOICES[enquiry.design]],
    ["Message", enquiry.message || "—"],
  ];
  const html = `
    <h2 style="font-family:Georgia,serif">New enquiry from ${escapeHtml(enquiry.names)}</h2>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">
      ${rows.map(([label, value]) => `<tr><td valign="top"><strong>${label}</strong></td><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`).join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:13px;color:#666">Reply to this email to answer them directly.</p>`;
  const text = [`New enquiry from ${enquiry.names}`, "", ...rows.map(([label, value]) => `${label}: ${value}`)].join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject: `${brand.name} enquiry: ${enquiry.names}${enquiry.weddingDate ? ` (${enquiry.weddingDate})` : ""}`,
        html,
        text,
      }),
    });
    if (!response.ok) {
      console.error("[email] Resend rejected the enquiry email:", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[email] Could not reach Resend:", error);
    return false;
  }
}
