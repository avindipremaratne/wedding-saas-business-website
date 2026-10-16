import { describe, expect, it } from "vitest";
import { parseCheckoutForm } from "@/lib/checkout";

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

describe("parseCheckoutForm", () => {
  it("accepts and normalises a valid form", () => {
    expect(
      parseCheckoutForm(form({ coupleNames: " Amali & Ashen ", email: "Us@Example.com", weddingDate: "2027-05-01" })),
    ).toEqual({ coupleNames: "Amali & Ashen", email: "us@example.com", weddingDate: "2027-05-01" });
  });

  it("treats the wedding date as optional and drops malformed ones", () => {
    expect(parseCheckoutForm(form({ coupleNames: "A & B", email: "a@b.co" }))?.weddingDate).toBe("");
    expect(parseCheckoutForm(form({ coupleNames: "A & B", email: "a@b.co", weddingDate: "soon" }))?.weddingDate).toBe("");
  });

  it("caps long names", () => {
    expect(parseCheckoutForm(form({ coupleNames: "x".repeat(300), email: "a@b.co" }))?.coupleNames).toHaveLength(120);
  });

  it("rejects a missing name or invalid email", () => {
    expect(parseCheckoutForm(form({ coupleNames: "", email: "a@b.co" }))).toBeNull();
    expect(parseCheckoutForm(form({ coupleNames: "A & B", email: "not-an-email" }))).toBeNull();
  });
});
