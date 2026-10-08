"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";

type FormState = "idle" | "sending" | "success";

function SubmitButton({ state, children }: { state: FormState; children: React.ReactNode }) {
  return <button className="button button-gold form-submit" disabled={state !== "idle"} type="submit">
    {state === "sending" && <LoaderCircle size={17} className="spin" />}{state === "success" ? "Request received" : children}
  </button>;
}

export function AppointmentForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, setState] = useState<FormState>("idle");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) return;
    setState("sending");
    window.setTimeout(() => { setState("success"); form.reset(); onSuccess?.(); }, 700);
  }
  if (state === "success") return <div className="form-success" role="status"><CheckCircle2 /><div><strong>Thank you.</strong><p>We have received your appointment request and will contact you to confirm the schedule.</p></div></div>;
  return <form className="form-grid" onSubmit={submit}>
    <label>Full name<input name="name" required autoComplete="name" /></label>
    <label>Phone number<input name="phone" required autoComplete="tel" inputMode="tel" /></label>
    <label>Email address<input name="email" required type="email" autoComplete="email" /></label>
    <label>Home location<input name="location" required autoComplete="street-address" /></label>
    <label>Preferred date<input name="date" required type="date" min={new Date().toISOString().split("T")[0]} /></label>
    <label>Preferred time<select name="time" required defaultValue=""><option value="" disabled>Select a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
    <label>Property type<select name="property" required defaultValue=""><option value="" disabled>Select property type</option><option>House</option><option>Apartment</option><option>Other residential property</option></select></label>
    <label>Rooms / approximate size<input name="size" placeholder="e.g. 4 rooms / 2,000 sq ft" /></label>
    <label>Service interested in<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Whole-home consultation</option><option>Single-room consultation</option><option>Space planning</option><option>Color & material guidance</option><option>Furniture & product selection</option><option>Décor & styling</option></select></label>
    <fieldset><legend>Is construction completed?</legend><label className="radio"><input name="complete" type="radio" value="yes" required /> Yes</label><label className="radio"><input name="complete" type="radio" value="no" /> No</label></fieldset>
    <label className="full">How can we help?<textarea name="message" required rows={4} placeholder="Tell us about your home, priorities and the decisions you are considering." /></label>
    <div className="full"><SubmitButton state={state}>Send appointment request</SubmitButton><p className="form-note">This sends a request only. Our team will contact you to confirm the appointment.</p></div>
  </form>;
}

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) return;
    setState("sending");
    window.setTimeout(() => { setState("success"); form.reset(); }, 700);
  }
  if (state === "success") return <div className="form-success" role="status"><CheckCircle2 /><div><strong>Message received.</strong><p>Thank you for contacting us. We will respond using the details you provided.</p></div></div>;
  return <form className="form-grid contact-form" onSubmit={submit}>
    <label>Full name<input required name="name" autoComplete="name" /></label>
    <label>Phone number<input required name="phone" autoComplete="tel" inputMode="tel" /></label>
    <label>Email address<input required name="email" type="email" autoComplete="email" /></label>
    <label>Location<input required name="location" /></label>
    <label className="full">Type of service<select required name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Interior design consultation</option><option>Space planning</option><option>Color & material guidance</option><option>Furniture placement</option><option>Décor & styling</option><option>Product inquiry</option></select></label>
    <label className="full">Message<textarea required name="message" rows={5} /></label>
    <div className="full"><SubmitButton state={state}>Send message</SubmitButton><p className="form-note">Frontend demo: connect the submit handler in <code>components/forms.tsx</code> to your email, CRM or API when credentials are available.</p></div>
  </form>;
}
