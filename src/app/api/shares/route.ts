import { createShare, MAX_BODY_CHARS, parsePages, SharingUnavailable, TooManyShares } from "@/lib/server/shares";

const fail = (error: string, status: number) => Response.json({ error }, { status });

export async function POST(request: Request) {
  const body = await request.text();
  if (body.length > MAX_BODY_CHARS) return fail("This project is too big to share.", 413);

  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return fail("That is not a project.", 400);
  }
  const pages = parsePages(parsed);
  if (!pages) return fail("That is not a project.", 400);

  const sender = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  try {
    return Response.json({ code: await createShare(pages, sender) }, { status: 201 });
  } catch (error) {
    if (error instanceof TooManyShares) return fail("Too many shares this hour. Try again later.", 429);
    if (error instanceof SharingUnavailable) return fail("Sharing is not set up on this site yet.", 503);
    console.error("Could not create a share", error);
    return fail("Could not share right now. Try again.", 500);
  }
}
