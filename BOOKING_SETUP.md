# Appointment booking production setup

The appointment form posts to `POST /api/appointments`. The API validates the request, stores it in Postgres, then asks Resend to send the notification. A recorded appointment is not discarded if email delivery fails; its `email_status` is saved as `failed` for investigation.

## 1. Connect Postgres

In the Vercel project, open **Storage**, install the Neon Postgres integration, create a database, and connect it to Production (and Preview if preview testing is needed). Confirm the integration added `DATABASE_URL` in **Settings → Environment Variables**.

The API creates `appointment_requests` if it does not exist. The same schema is available at `db/migrations/001_create_appointment_requests.sql` for teams that prefer to apply migrations in the Neon SQL Editor.

## 2. Configure Resend

1. Create a Resend account.
2. Add a sending domain you control and publish the DNS records Resend provides.
3. Wait for the domain to show as verified.
4. Create a sending-only API key.
5. Add the following Vercel environment variables to Production and Preview as needed:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | The secret key beginning with `re_` |
| `APPOINTMENT_FROM_EMAIL` | `Velora Interiors <appointments@your-verified-domain.com>` |
| `APPOINTMENT_NOTIFICATION_EMAIL` | `ayuswork01@gmail.com` |
| `DATABASE_URL` | Injected by Neon, or a pooled Neon Postgres connection string |

Do not prefix any of these variables with `NEXT_PUBLIC_`. Redeploy after adding or changing environment variables.

## 3. Verify production

1. Submit a clearly labelled test appointment from the deployed website.
2. In Neon, run:

   ```sql
   SELECT id, created_at, name, email, preferred_date, preferred_time,
          email_status, email_id, email_error
   FROM appointment_requests
   ORDER BY created_at DESC
   LIMIT 10;
   ```

3. Confirm the row exists and `email_status` is `sent`.
4. Open **Resend → Emails** and confirm the matching `email_id` was delivered.
5. Confirm the message reached `ayuswork01@gmail.com`; also check Gmail Spam and Promotions during initial testing.

If the database row exists but `email_status` is `failed`, inspect `email_error`, the Resend email logs, and the Vercel Function logs for `/api/appointments`.
