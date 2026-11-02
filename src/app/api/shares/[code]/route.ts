import { isShareCode, readShare, SharingUnavailable } from "@/lib/server/shares";

const fail = (error: string, status: number) => Response.json({ error }, { status });

// Open to anyone with the code: the site uses it for ?s= links and the plugin for /mcgui import.
export async function GET(_request: Request, ctx: RouteContext<"/api/shares/[code]">) {
  const { code } = await ctx.params;
  if (!isShareCode(code)) return fail("There is no project with that code.", 404);
  try {
    const pages = await readShare(code);
    return pages ? Response.json({ pages }) : fail("There is no project with that code.", 404);
  } catch (error) {
    if (error instanceof SharingUnavailable) return fail("Sharing is not set up on this site yet.", 503);
    console.error("Could not read a share", error);
    return fail("Could not open that project right now.", 500);
  }
}
