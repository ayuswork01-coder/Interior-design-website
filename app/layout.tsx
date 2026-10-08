import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://nepal-interior-design-studio.sites.openai.com"),
  title: { default: "Interior Design Consultation Nepal | Studio Name", template: "%s | Studio Name" },
  description: "Premium interior design consultation, space planning, furniture placement, color guidance and curated interior products for completed homes in Nepal.",
  keywords: ["interior design Nepal", "interior design consultation Nepal", "home styling Nepal", "interior designer Kathmandu"],
  openGraph: { title: "Interior Design Consultation Nepal", description: "Turn your newly built house into a home you love.", images: ["/images/hero-living-room.png"], type: "website" },
  twitter: { card: "summary_large_image", title: "Interior Design Consultation Nepal", description: "Personalized design guidance for completed homes in Nepal.", images: ["/images/hero-living-room.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const schema = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "[BUSINESS NAME]", description: "Interior design consultation, styling, space planning and interior product guidance for homeowners in Nepal.", areaServed: "Nepal", address: { "@type": "PostalAddress", addressLocality: "[CITY]", addressCountry: "NP" }, telephone: "[PHONE NUMBER]", email: "[EMAIL ADDRESS]" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteShell>{children}</SiteShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
