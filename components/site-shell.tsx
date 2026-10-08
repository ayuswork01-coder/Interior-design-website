"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, Camera, Menu, X } from "lucide-react";
import { AppointmentForm } from "./forms";

const nav = [["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Products", "/products"], ["Contact", "/contact"]];

export function Header() {
  const [menu, setMenu] = useState(false);
  const [booking, setBooking] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const open = () => setBooking(true);
    window.addEventListener("open-booking", open);
    return () => window.removeEventListener("open-booking", open);
  }, []);
  useEffect(() => {
    document.body.style.overflow = booking || menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [booking, menu]);
  return <>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-wrap">
        <Link href="/" className="brand" aria-label="Studio Name home"><span className="brand-mark">S</span><span><strong>STUDIO NAME</strong><small>INTERIORS • NEPAL</small></span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <button className="button button-gold desktop-book" onClick={() => setBooking(true)}>Book an appointment</button>
        <button className="menu-button" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}><Menu /></button>
      </div>
    </header>
    <div className={`mobile-menu ${menu ? "open" : ""}`} aria-hidden={!menu}>
      <button className="menu-close" aria-label="Close menu" onClick={() => setMenu(false)}><X /></button>
      <span className="eyebrow">Explore</span>
      <nav>{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenu(false)}>{label}<span>↗</span></Link>)}</nav>
      <button className="button button-gold" onClick={() => { setMenu(false); setBooking(true); }}>Book an appointment</button>
      <p>Interior guidance for completed homes in Nepal.</p>
    </div>
    {booking && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setBooking(false); }}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="modal-close" aria-label="Close appointment form" onClick={() => setBooking(false)}><X /></button>
        <div className="modal-intro"><span className="eyebrow">Begin your project</span><h2 id="booking-title">Request a home consultation</h2><p>Share a few details. We’ll contact you to confirm the schedule and next steps.</p></div>
        <AppointmentForm />
      </section>
    </div>}
    <button className="mobile-floating-cta" onClick={() => setBooking(true)}>Book consultation</button>
  </>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><div className="brand light"><span className="brand-mark">S</span><span><strong>STUDIO NAME</strong><small>INTERIORS • NEPAL</small></span></div><p>A placeholder brand for a Nepal-based interior design consultation and product studio. Replace with your business name.</p><a className="social" href="#" aria-label="Instagram placeholder"><Camera size={18} /> Instagram placeholder</a></div>
      <div><h3>Navigate</h3>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      <div><h3>Services</h3><Link href="/services">Interior consultation</Link><Link href="/services#space-planning">Space planning</Link><Link href="/services#color-consultation">Color consultation</Link><Link href="/services#furniture-placement">Furniture placement</Link></div>
      <div><h3>Contact</h3><p>[PHONE NUMBER]</p><p>[TELEPHONE NUMBER]</p><p>[WHATSAPP NUMBER]</p><p>[EMAIL ADDRESS]</p><p>[CITY, NEPAL]</p></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} [BUSINESS NAME]. All rights reserved.</span><div><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms & conditions</Link></div></div>
  </footer>;
}

export function SiteShell({ children }: { children: React.ReactNode }) { return <><Header />{children}<Footer /><ScrollTop /></>; }

function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const fn = () => setShow(window.scrollY > 700); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return <button className={`scroll-top ${show ? "show" : ""}`} aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp size={18} /></button>;
}

export function BookingButton({ children = "Book an appointment", className = "" }: { children?: React.ReactNode; className?: string }) {
  return <button className={`button button-gold ${className}`} onClick={() => window.dispatchEvent(new Event("open-booking"))}>{children}</button>;
}
