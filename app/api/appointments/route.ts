import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(254),
  location: z.string().trim().min(2).max(180),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.enum(["Morning", "Afternoon", "Evening"]),
  property: z.enum(["House", "Apartment", "Other residential property"]),
  size: z.string().trim().max(120).optional().default(""),
  service: z.enum([
    "Whole-home consultation",
    "Single-room consultation",
    "Space planning",
    "Color & material guidance",
    "Furniture & product selection",
    "Décor & styling",
  ]),
  complete: z.preprocess(
    (value) => typeof value === "string" ? value.trim().toLowerCase() : value,
    z.enum(["yes", "no"]),
  ),
  message: z.string().trim().min(10).max(3000),
});

const fieldLabels: Record<string, string> = {
  name: "full name",
  phone: "phone number",
  email: "email address",
  location: "home location",
  date: "preferred date",
  time: "preferred time",
  property: "property type",
  size: "approximate size",
  service: "service",
  complete: "construction status",
  message: "project description",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

export async function POST(request: Request) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("Appointment submission failed: DATABASE_URL is not configured.");
    return NextResponse.json({ error: "Appointments are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues
      .map((issue) => issue.path[0])
      .filter((field): field is string => typeof field === "string")
      .map((field) => fieldLabels[field] ?? field))];
    const error = fields.length > 0
      ? `Please check the following fields: ${fields.join(", ")}.`
      : "Please check the appointment details and try again.";
    return NextResponse.json({ error }, { status: 400 });
  }

  const appointment = parsed.data;
  const id = crypto.randomUUID();
  const sql = neon(databaseUrl);

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS appointment_requests (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        location TEXT NOT NULL,
        preferred_date DATE NOT NULL,
        preferred_time TEXT NOT NULL,
        property_type TEXT NOT NULL,
        approximate_size TEXT,
        service TEXT NOT NULL,
        construction_complete BOOLEAN NOT NULL,
        message TEXT NOT NULL,
        email_status TEXT NOT NULL DEFAULT 'pending',
        email_id TEXT,
        email_error TEXT
      )
    `;

    await sql`
      INSERT INTO appointment_requests (
        id, name, phone, email, location, preferred_date, preferred_time,
        property_type, approximate_size, service, construction_complete, message
      ) VALUES (
        ${id}, ${appointment.name}, ${appointment.phone}, ${appointment.email},
        ${appointment.location}, ${appointment.date}, ${appointment.time},
        ${appointment.property}, ${appointment.size || null}, ${appointment.service},
        ${appointment.complete === "yes"}, ${appointment.message}
      )
    `;
  } catch (error) {
    console.error("Appointment persistence failed", error);
    return NextResponse.json({ error: "We could not record your request. Please try again." }, { status: 500 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.APPOINTMENT_FROM_EMAIL;
  const to = process.env.APPOINTMENT_NOTIFICATION_EMAIL;
  const updateEmailStatus = async (status: "sent" | "failed", emailId: string | null, emailError: string | null) => {
    try {
      await sql`
        UPDATE appointment_requests
        SET email_status = ${status}, email_id = ${emailId}, email_error = ${emailError}
        WHERE id = ${id}
      `;
    } catch (error) {
      console.error(`Appointment ${id} was recorded, but its email status could not be updated`, error);
    }
  };

  if (!resendApiKey || !from || !to) {
    const reason = "Email notification environment variables are incomplete.";
    await updateEmailStatus("failed", null, reason);
    console.error(`Appointment ${id} was recorded, but ${reason}`);
    return NextResponse.json({ ok: true, appointmentId: id, notificationSent: false }, { status: 201 });
  }

  try {
    const resend = new Resend(resendApiKey);
    const safe = {
      name: escapeHtml(appointment.name),
      phone: escapeHtml(appointment.phone),
      email: escapeHtml(appointment.email),
      location: escapeHtml(appointment.location),
      date: escapeHtml(appointment.date),
      time: escapeHtml(appointment.time),
      property: escapeHtml(appointment.property),
      size: escapeHtml(appointment.size),
      service: escapeHtml(appointment.service),
      message: escapeHtml(appointment.message),
    };
    const email = {
      from,
      to: [to],
      replyTo: appointment.email,
      subject: `New Velora Interiors appointment request from ${appointment.name}`,
      html: `
          <h1>New appointment request — Velora Interiors</h1>
          <p><strong>Reference:</strong> ${id}</p>
          <p><strong>Name:</strong> ${safe.name}</p>
          <p><strong>Phone:</strong> ${safe.phone}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Location:</strong> ${safe.location}</p>
          <p><strong>Preferred date:</strong> ${safe.date}</p>
          <p><strong>Preferred time:</strong> ${safe.time}</p>
          <p><strong>Property:</strong> ${safe.property}</p>
          <p><strong>Approximate size:</strong> ${safe.size || "Not provided"}</p>
          <p><strong>Service:</strong> ${safe.service}</p>
          <p><strong>Construction completed:</strong> ${appointment.complete === "yes" ? "Yes" : "No"}</p>
          <p><strong>Message:</strong><br>${safe.message.replace(/\n/g, "<br>")}</p>
        `,
      text: [
          "New appointment request — Velora Interiors",
          `Reference: ${id}`,
          `Name: ${appointment.name}`,
          `Phone: ${appointment.phone}`,
          `Email: ${appointment.email}`,
          `Location: ${appointment.location}`,
          `Preferred date: ${appointment.date}`,
          `Preferred time: ${appointment.time}`,
          `Property: ${appointment.property}`,
          `Approximate size: ${appointment.size || "Not provided"}`,
          `Service: ${appointment.service}`,
          `Construction completed: ${appointment.complete === "yes" ? "Yes" : "No"}`,
          `Message: ${appointment.message}`,
        ].join("\n"),
    };

    let emailId: string | null = null;
    let lastError = "Resend did not return an email ID.";
    for (let attempt = 0; attempt < 3 && !emailId; attempt += 1) {
      const { data, error } = await resend.emails.send(email, { idempotencyKey: `appointment/${id}` });
      emailId = data?.id ?? null;
      lastError = error?.message || lastError;
      if (!emailId && attempt < 2) await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
    }
    if (!emailId) throw new Error(lastError);
    await updateEmailStatus("sent", emailId, null);
    return NextResponse.json({ ok: true, appointmentId: id, notificationSent: true }, { status: 201 });
  } catch (error) {
    const reason = error instanceof Error ? error.message.slice(0, 500) : "Unknown email error";
    await updateEmailStatus("failed", null, reason);
    console.error(`Appointment ${id} was recorded, but notification failed`, error);
    return NextResponse.json({ ok: true, appointmentId: id, notificationSent: false }, { status: 201 });
  }
}
