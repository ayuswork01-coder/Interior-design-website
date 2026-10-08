import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BookingButton } from "./site-shell";

export function SectionHeading({ eyebrow, title, intro, light = false }: { eyebrow: string; title: string; intro?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? "light" : ""}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{intro && <p>{intro}</p>}</div>;
}

export function PageHero({ eyebrow, title, text, image = "/images/hero-living-room.png" }: { eyebrow: string; title: string; text: string; image?: string }) {
  return <section className="page-hero"><Image src={image} alt="Elegantly furnished completed home interior" fill sizes="100vw" /><div className="page-hero-overlay" /><div className="page-hero-content"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>;
}

export function CTASection() {
  return <section className="cta-section"><div><span className="eyebrow">A thoughtful next chapter</span><h2>Your house is built.<br />Now let’s make it feel like home.</h2><p>Book a consultation and let us create an interior direction that reflects your taste, lifestyle and space.</p></div><BookingButton>Book an appointment <ArrowRight size={17} /></BookingButton></section>;
}

export function Breadcrumbs({ current }: { current: string }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">{current}</span></nav>;
}
