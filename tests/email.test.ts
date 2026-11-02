import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { sendEnquiryNotification } = await import("@/lib/email");

const enquiry = { names: "Jo <b> & Sam", email: "jo@example.com", phone: "", weddingDate: "2027-02-14", design: "heirloom" as const, message: "Hi\nthere" };

describe("sendEnquiryNotification", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockReset();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("is skipped without Resend settings", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect(await sendEnquiryNotification(enquiry)).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("emails the owner with reply-to set to the couple and escaped HTML", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("ENQUIRY_FROM_EMAIL", "Enquiries <hello@example.com>");
    vi.stubEnv("ENQUIRY_TO_EMAIL", "owner@example.com");
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    expect(await sendEnquiryNotification(enquiry)).toBe(true);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({ to: ["owner@example.com"], reply_to: "jo@example.com" });
    expect(body.subject).toContain("Jo <b> & Sam (2027-02-14)");
    expect(body.html).toContain("Jo &lt;b&gt; &amp; Sam");
    expect(body.html).toContain("Hi<br>there");
    expect(body.text).toContain("Design: Heirloom");
  });

  it("returns false, without throwing, when Resend fails", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("ENQUIRY_FROM_EMAIL", "a@example.com");
    vi.stubEnv("ENQUIRY_TO_EMAIL", "b@example.com");
    fetchMock.mockResolvedValue(new Response("nope", { status: 403 }));
    expect(await sendEnquiryNotification(enquiry)).toBe(false);
    fetchMock.mockRejectedValue(new Error("offline"));
    expect(await sendEnquiryNotification(enquiry)).toBe(false);
  });
});
