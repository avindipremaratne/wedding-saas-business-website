import { describe, expect, it } from "vitest";
import { parseEnquiry } from "@/lib/enquiry";

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

describe("parseEnquiry", () => {
  it("accepts and normalises a full enquiry", () => {
    expect(
      parseEnquiry(
        form({
          names: " Nimali & Ravi ",
          email: "Us@Example.com",
          phone: " +94 77 123 4567 ",
          weddingDate: "2027-02-14",
          design: "custom",
          message: " Beach theme! ",
        }),
      ),
    ).toEqual({
      ok: true,
      data: { names: "Nimali & Ravi", email: "us@example.com", phone: "+94 77 123 4567", weddingDate: "2027-02-14", design: "custom", message: "Beach theme!" },
    });
  });

  it("needs only names and an email, and defaults an unknown design to 'unsure'", () => {
    const result = parseEnquiry(form({ names: "A & B", email: "a@b.co", design: "<script>" }));
    expect(result).toEqual({ ok: true, data: { names: "A & B", email: "a@b.co", phone: "", weddingDate: "", design: "unsure", message: "" } });
  });

  it("reports each problem", () => {
    const result = parseEnquiry(form({ names: "", email: "nope", weddingDate: "soon", phone: "1".repeat(41), message: "x".repeat(4001) }));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.errors).sort()).toEqual(["email", "message", "names", "phone", "weddingDate"]);
  });
});
