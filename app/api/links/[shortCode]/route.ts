import { NextResponse } from "next/server";
import { resolveLink } from "@/lib/links";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortCode: string }> },
) {
  try {
    const { shortCode } = await params;
    const link = await resolveLink(shortCode);

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.redirect(link.originalUrl);
  } catch (error) {
    console.error("Failed to resolve link", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
