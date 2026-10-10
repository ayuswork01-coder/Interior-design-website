import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://nepal-interior-design-studio.sites.openai.com"),
  applicationName: "Velora Interiors",
  title: { default: "Velora Interiors | Interior Design Nepal", template: "%s | Velora Interiors" },
  description: "Interior design consulting and premium interior products for beautiful, functional homes in Nepal.",
  keywords: ["interior design Nepal", "interior design consultation Nepal", "home styling Nepal", "interior designer Kathmandu"],
  openGraph: { siteName: "Velora Interiors", title: "Velora Interiors | Interior Design Nepal", description: "Interior design consulting and premium interior products for beautiful, functional homes in Nepal.", images: ["/images/hero-living-room.png"], type: "website" },
  twitter: { card: "summary_large_image", title: "Velora Interiors | Interior Design Nepal", description: "Personalized design guidance for completed homes in Nepal.", images: ["/images/hero-living-room.png"] },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }], shortcut: "/favicon.svg" },
};

const schema = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Velora Interiors", description: "Interior design consultation, styling, space planning and interior product guidance for homeowners in Nepal.", areaServed: "Nepal", address: { "@type": "PostalAddress", addressLocality: "[CITY]", addressCountry: "NP" }, telephone: "[PHONE NUMBER]", email: "ayuswork01@gmail.com" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteShell>{children}</SiteShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
