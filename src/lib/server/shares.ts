import "server-only";
import { createHash, randomInt } from "node:crypto";
import { Pool } from "pg";

export interface SharedPage {
  title: string;
  file: string;
  html: string;
}

export const MAX_BODY_CHARS = 2_000_000;
const MAX_PAGES = 50;
const SHARES_PER_HOUR = 30;

// No letters that read alike, since people type these codes into Minecraft.
const CODE_LETTERS = "abcdefghjkmnpqrstuvwxyz";
const CODE_LENGTH = 8;
export const isShareCode = (code: string) => /^[a-z]{8}$/.test(code);

// One pool per server instance; survives dev hot reloads.
const globalForDb = globalThis as unknown as { sharePool?: Pool };

function pool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new SharingUnavailable();
  globalForDb.sharePool ??= new Pool({ connectionString, max: 5 });
  return globalForDb.sharePool;
}

export class SharingUnavailable extends Error {}
export class TooManyShares extends Error {}

export function parsePages(value: unknown): SharedPage[] | null {
  const pages = (value as { pages?: unknown } | null)?.pages;
  if (!Array.isArray(pages) || pages.length === 0 || pages.length > MAX_PAGES) return null;
  const clean: SharedPage[] = [];
  for (const page of pages as Partial<SharedPage>[]) {
    if (typeof page?.title !== "string" || page.title.length > 200) return null;
    if (typeof page.file !== "string" || !/^[a-z0-9-]+\.html$/.test(page.file)) return null;
    if (typeof page.html !== "string") return null;
    clean.push({ title: page.title, file: page.file, html: page.html });
  }
  return clean;
}

function randomCode() {
  return Array.from({ length: CODE_LENGTH }, () => CODE_LETTERS[randomInt(CODE_LETTERS.length)]).join("");
}

export async function createShare(pages: SharedPage[], sender: string) {
  const db = pool();
  const senderHash = createHash("sha256").update(sender).digest("hex");
  const recent = await db.query<{ count: string }>("SELECT count(*) FROM shares WHERE sender_hash = $1 AND created_at > now() - interval '1 hour'", [senderHash]);
  if (Number(recent.rows[0].count) >= SHARES_PER_HOUR) throw new TooManyShares();

  // A clash is very unlikely with this many codes, but a new code costs nothing.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = randomCode();
    const inserted = await db.query("INSERT INTO shares (code, pages, sender_hash) VALUES ($1, $2, $3) ON CONFLICT (code) DO NOTHING", [code, JSON.stringify(pages), senderHash]);
    if (inserted.rowCount === 1) return code;
  }
  throw new Error("Could not find a free share code.");
}

export async function readShare(code: string) {
  const result = await pool().query<{ pages: SharedPage[] }>("SELECT pages FROM shares WHERE code = $1", [code]);
  return result.rows[0]?.pages ?? null;
}
