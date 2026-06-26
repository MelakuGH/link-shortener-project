import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { links } from "@/db/schema";

export interface LinkRecord {
  id: number;
  shortCode: string;
  originalUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function createLink(input: {
  shortCode: string;
  originalUrl: string;
  userId: string;
}): Promise<LinkRecord> {
  const [createdLink] = await db
    .insert(links)
    .values({
      userId: input.userId,
      shortCode: input.shortCode,
      originalUrl: input.originalUrl,
    })
    .returning();

  return {
    id: createdLink.id,
    shortCode: createdLink.shortCode,
    originalUrl: createdLink.originalUrl,
    createdAt: createdLink.createdAt,
    updatedAt: createdLink.updatedAt,
  };
}

export async function getUserLinks(userId: string): Promise<LinkRecord[]> {
  const results = await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));

  return results.map((link) => ({
    id: link.id,
    shortCode: link.shortCode,
    originalUrl: link.originalUrl,
    createdAt: link.createdAt,
    updatedAt: link.updatedAt,
  }));
}

export async function resolveLink(shortCode: string): Promise<LinkRecord | null> {
  const [link] = await db.select().from(links).where(eq(links.shortCode, shortCode)).limit(1);

  if (!link) {
    return null;
  }

  return {
    id: link.id,
    shortCode: link.shortCode,
    originalUrl: link.originalUrl,
    createdAt: link.createdAt,
    updatedAt: link.updatedAt,
  };
}
