-- Snapshots of projects, opened by ?s=<code> and later by /mcgui import <code>.
CREATE TABLE IF NOT EXISTS shares (
  code text PRIMARY KEY,
  pages jsonb NOT NULL,
  -- A hash, never the address itself; it only limits how fast one visitor can share.
  sender_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS shares_sender_recent ON shares (sender_hash, created_at);
