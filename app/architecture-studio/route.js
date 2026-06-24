import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  const htmlPath = path.join(process.cwd(), "outputs", "architecture-studio.html");
  const html = await fs.readFile(htmlPath, "utf8");

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
