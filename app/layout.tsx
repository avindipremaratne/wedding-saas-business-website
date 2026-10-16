import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Ephesis, Montserrat } from "next/font/google";
import "./globals.css";

// Brand fonts (shared with Theme 1 for now), self-hosted by next/font and
// exposed as CSS variables that globals.css maps to font-script, font-sans
// and font-serif.
const ephesis = Ephesis({ variable: "--font-ephesis", weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Wedding websites that feel like the invitation", template: "%s · Wedding SaaS" },
  description: "Elegant, personal wedding websites with RSVPs, galleries and music.",
};

export const viewport: Viewport = {
  themeColor: "#F7F3EE",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ephesis.variable} ${montserrat.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
