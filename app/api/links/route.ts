import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createLink, getUserLinks } from "@/lib/links";

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function generateShortCode(): string {
  return Math.random().toString(36).slice(2, 8);
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const links = await getUserLinks(userId);
    return NextResponse.json({ links });
  } catch (error) {
    console.error("Failed to fetch links", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const originalUrl = typeof body?.originalUrl === "string" ? body.originalUrl.trim() : "";

    if (!originalUrl || !isValidUrl(originalUrl)) {
      return NextResponse.json({ error: "Please provide a valid original URL." }, { status: 400 });
    }

    const shortCode = generateShortCode();
    const link = await createLink({ shortCode, originalUrl, userId });

    return NextResponse.json({ link }, { status: 201 });
  } catch (error) {
    console.error("Failed to create link", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
