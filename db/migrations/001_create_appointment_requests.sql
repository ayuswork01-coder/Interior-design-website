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
);

CREATE INDEX IF NOT EXISTS appointment_requests_created_at_idx
  ON appointment_requests (created_at DESC);
